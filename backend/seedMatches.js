const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Match = require("./models/Match");

dotenv.config();

const matches = [
  { matchId: "M74", homeTeam: "Brazil", awayTeam: "Japan", kickoff: new Date("2026-06-29T17:00:00Z"), round: "Round of 32" },
  { matchId: "M75", homeTeam: "Germany", awayTeam: "Paraguay", kickoff: new Date("2026-06-29T20:30:00Z"), round: "Round of 32" },
  { matchId: "M76", homeTeam: "Netherlands", awayTeam: "Morocco", kickoff: new Date("2026-06-30T01:00:00Z"), round: "Round of 32" },
  { matchId: "M77", homeTeam: "Ivory Coast", awayTeam: "Norway", kickoff: new Date("2026-06-30T17:00:00Z"), round: "Round of 32" },
  { matchId: "M78", homeTeam: "France", awayTeam: "Sweden", kickoff: new Date("2026-06-30T21:00:00Z"), round: "Round of 32" },
  { matchId: "M79", homeTeam: "Mexico", awayTeam: "Ecuador", kickoff: new Date("2026-07-01T01:00:00Z"), round: "Round of 32" },
  { matchId: "M80", homeTeam: "England", awayTeam: "DR Congo", kickoff: new Date("2026-07-01T16:00:00Z"), round: "Round of 32" },
  { matchId: "M81", homeTeam: "Belgium", awayTeam: "Senegal", kickoff: new Date("2026-07-01T20:00:00Z"), round: "Round of 32" },
  { matchId: "M82", homeTeam: "USA", awayTeam: "Bosnia & Herzegovina", kickoff: new Date("2026-07-02T00:00:00Z"), round: "Round of 32" },
  { matchId: "M83", homeTeam: "Spain", awayTeam: "Austria", kickoff: new Date("2026-07-02T19:00:00Z"), round: "Round of 32" },
  { matchId: "M85", homeTeam: "Portugal", awayTeam: "Croatia", kickoff: new Date("2026-07-02T23:00:00Z"), round: "Round of 32" },
  { matchId: "M84", homeTeam: "Switzerland", awayTeam: "Algeria", kickoff: new Date("2026-07-03T03:00:00Z"), round: "Round of 32" },
  { matchId: "M86", homeTeam: "Australia", awayTeam: "Egypt", kickoff: new Date("2026-07-03T18:00:00Z"), round: "Round of 32" },
  { matchId: "M87", homeTeam: "Argentina", awayTeam: "Cape Verde", kickoff: new Date("2026-07-03T22:00:00Z"), round: "Round of 32" },
  { matchId: "M88", homeTeam: "Colombia", awayTeam: "Ghana", kickoff: new Date("2026-07-04T01:30:00Z"), round: "Round of 32" },
  { matchId: "R16-1", homeTeam: "Canada", awayTeam: "Morocco", kickoff: new Date("2026-07-04T17:00:00Z"), round: "Round of 16" },
 { matchId: "R16-2", homeTeam: "Paraguay", awayTeam: "France", kickoff: new Date("2026-07-04T21:00:00Z"), round: "Round of 16" },
 { matchId: "R16-3", homeTeam: "Brazil", awayTeam: "Norway", kickoff: new Date("2026-07-05T20:00:00Z"), round: "Round of 16" },
 { matchId: "R16-4", homeTeam: "Mexico", awayTeam: "England", kickoff: new Date("2026-07-06T00:00:00Z"), round: "Round of 16" },
 { matchId: "R16-5", homeTeam: "Portugal", awayTeam: "Spain", kickoff: new Date("2026-07-06T19:00:00Z"), round: "Round of 16" },
 { matchId: "R16-6", homeTeam: "USA", awayTeam: "Belgium", kickoff: new Date("2026-07-07T00:00:00Z"), round: "Round of 16" },
 { matchId: "R16-7", homeTeam: "Argentina", awayTeam: "Egypt", kickoff: new Date("2026-07-07T16:00:00Z"), round: "Round of 16" },
 { matchId: "R16-8", homeTeam: "Switzerland", awayTeam: "Colombia", kickoff: new Date("2026-07-07T20:00:00Z"), round: "Round of 16" },
 { matchId: "QF1", homeTeam: "France", awayTeam: "Morocco", kickoff: new Date("2026-07-09T20:00:00Z"), round: "Quarter Final" },
 { matchId: "QF2", homeTeam: "Spain", awayTeam: "Belgium", kickoff: new Date("2026-07-10T20:00:00Z"), round: "Quarter Final" },
 { matchId: "QF3", homeTeam: "Norway", awayTeam: "England", kickoff: new Date("2026-07-12T00:00:00Z"), round: "Quarter Final" },
 { matchId: "QF4", homeTeam: "Argentina", awayTeam: "Switzerland", kickoff: new Date("2026-07-12T01:00:00Z"), round: "Quarter Final" },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB!");

    for (const match of matches) {
      await Match.findOneAndUpdate(
        { matchId: match.matchId },
        match,
        { upsert: true, new: true }
      );
      console.log(`Saved: ${match.homeTeam} vs ${match.awayTeam}`);
    }

    console.log("All matches seeded!");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

seed();