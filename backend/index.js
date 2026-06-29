const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("MongoDB connection error:", err));

// routes
app.use("/api/matches", require("./routes/matches"));
app.use("/api/predictions", require("./routes/predictions"));
app.use("/api/leaderboard", require("./routes/leaderboard"));

app.get("/", (req, res) => {
  res.send("World Cup Predictor API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});