const express = require("express");
const router = express.Router();
const Match = require("../models/Match");

// Get all matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find().sort({ kickoff: 1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single match
router.get("/:matchId", async (req, res) => {
  try {
    const match = await Match.findOne({ matchId: req.params.matchId });
    if (!match) return res.status(404).json({ error: "Match not found" });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new match (you'll use this to add knockout fixtures)
router.post("/", async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json({ message: "Match added!", match });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;