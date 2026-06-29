const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Match = require("./models/Match");

dotenv.config();

const fetchMatches = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB!");

    const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
      headers: {
        "x-apisports-key": process.env.FOOTBALL_API_KEY
      },
      params: {
        league: 1,
        season: 2026,
        round: "Round of 16"
      }
    });

    const fixtures = response.data.response;
    console.log(`Found ${fixtures.length} fixtures`);

    for (const fixture of fixtures) {
      const match = {
        matchId: fixture.fixture.id.toString(),
        homeTeam: fixture.teams.home.name,
        awayTeam: fixture.teams.away.name,
        kickoff: new Date(fixture.fixture.date),
        finished: fixture.fixture.status.short === "FT"
      };

      await Match.findOneAndUpdate(
        { matchId: match.matchId },
        match,
        { upsert: true, new: true }
      );

      console.log(`Saved: ${match.homeTeam} vs ${match.awayTeam}`);
    }

    console.log("Done!");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

fetchMatches();