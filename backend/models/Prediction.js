const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  matchId: { type: String, required: true },
  homeScore: { type: Number, required: true },
  awayScore: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Prediction", predictionSchema);