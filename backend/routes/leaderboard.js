const express = require("express");
const router = express.Router();
const Prediction = require("../models/Prediction");
const Match = require("../models/Match");

router.get("/", async (req, res) => {
  try {
    const finishedMatches = await Match.find({ finished: true });
    const allPredictions = await Prediction.find();

    const scores = {};

    allPredictions.forEach((pred) => {
      if (!scores[pred.playerName]) {
        scores[pred.playerName] = {
          playerName: pred.playerName,
          points: 0,
          gamesPlayed: 0,
          exactScores: 0,
          correctOutcomes: 0,
          correctGoalDiff: 0
        };
      }

      scores[pred.playerName].gamesPlayed += 1;

      const match = finishedMatches.find((m) => m.matchId === pred.matchId);
      if (!match) return;

      const actualHomeDiff = match.homeScore - match.awayScore;
      const predHomeDiff = pred.homeScore - pred.awayScore;

      if (pred.homeScore === match.homeScore && pred.awayScore === match.awayScore) {
        scores[pred.playerName].points += 3;
        scores[pred.playerName].exactScores += 1;
      } else if (predHomeDiff === actualHomeDiff) {
        scores[pred.playerName].points += 2;
        scores[pred.playerName].correctGoalDiff += 1;
      } else if (
        (predHomeDiff > 0 && actualHomeDiff > 0) ||
        (predHomeDiff < 0 && actualHomeDiff < 0) ||
        (predHomeDiff === 0 && actualHomeDiff === 0)
      ) {
        scores[pred.playerName].points += 1;
        scores[pred.playerName].correctOutcomes += 1;
      }
    });

    const leaderboard = Object.values(scores).sort((a, b) => b.points - a.points);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;