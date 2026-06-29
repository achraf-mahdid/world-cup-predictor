const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const test = async () => {
  const response = await axios.get("https://v3.football.api-sports.io/leagues", {
    headers: {
      "x-apisports-key": process.env.FOOTBALL_API_KEY
    },
    params: {
      name: "FIFA World Cup",
      season: 2026
    }
  });

  console.log(JSON.stringify(response.data, null, 2));
};

test();