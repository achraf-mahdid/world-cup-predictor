const express = require("express");
const router = express.Router();
const Prediction = require("../models/Prediction");
const Match = require("../models/Match");

router.get("/", async (req, res) => {
  try {
    // get all finished matches
    const finishedMatches = await Match.find({ finished: true });

    // get all predictions
    const predictions = await Prediction.find();

    // calculate points for each player
    const scores = {};

    predictions.forEach((pred) => {
      const match = finishedMatches.find((m) => m.matchId === pred.matchId);
      if (!match) return;

      if (!scores[pred.playerName]) {
        scores[pred.playerName] = { playerName: pred.playerName, points: 0 };
      }

      const actualHomeDiff = match.homeScore - match.awayScore;
      const predHomeDiff = pred.homeScore - pred.awayScore;

      if (pred.homeScore === match.homeScore && pred.awayScore === match.awayScore) {
        // exact score
        scores[pred.playerName].points += 3;
      } else if (predHomeDiff === actualHomeDiff) {
        // correct goal difference
        scores[pred.playerName].points += 2;
      } else if (
        (predHomeDiff > 0 && actualHomeDiff > 0) ||
        (predHomeDiff < 0 && actualHomeDiff < 0) ||
        (predHomeDiff === 0 && actualHomeDiff === 0)
      ) {
        // correct outcome only
        scores[pred.playerName].points += 1;
      }
    });

    // sort by points
    const leaderboard = Object.values(scores).sort((a, b) => b.points - a.points);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;