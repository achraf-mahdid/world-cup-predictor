const express = require("express");
const router = express.Router();
const Prediction = require("../models/Prediction");
const Match = require("../models/Match");

// Submit a prediction
router.post("/", async (req, res) => {
  try {
    const { playerName, matchId, homeScore, awayScore } = req.body;

    // check if match exists and hasn't kicked off yet
    const match = await Match.findOne({ matchId });
    if (!match) return res.status(404).json({ error: "Match not found" });

    const now = new Date();
    if (now >= match.kickoff) {
      return res.status(400).json({ error: "Predictions are locked for this match" });
    }

    // check if player already predicted this match
    const existing = await Prediction.findOne({ playerName, matchId });
    if (existing) {
      return res.status(400).json({ error: "You already predicted this match" });
    }

    const prediction = new Prediction({ playerName, matchId, homeScore, awayScore });
    await prediction.save();

    res.status(201).json({ message: "Prediction submitted!", prediction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all predictions for a match
router.get("/:matchId", async (req, res) => {
  try {
    const predictions = await Prediction.find({ matchId: req.params.matchId });
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;