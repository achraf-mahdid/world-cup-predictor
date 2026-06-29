const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  matchId: { type: String, required: true, unique: true },
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  kickoff: { type: Date, required: true },
  homeScore: { type: Number, default: null },
  awayScore: { type: Number, default: null },
  finished: { type: Boolean, default: false }
});

module.exports = mongoose.model("Match", matchSchema);