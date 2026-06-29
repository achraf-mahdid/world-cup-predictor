const API_URL = "http://localhost:5000/api";

async function loadMatches() {
  const playerName = document.getElementById("playerName").value.trim();
  
  if (playerName === "") {
    alert("Please enter your name first!");
    return;
  }

  const response = await fetch(`${API_URL}/matches`);
  const matches = await response.json();

  const container = document.getElementById("matches-container");
  container.innerHTML = "<h2>Upcoming Matches</h2>";

  matches.forEach((match) => {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    const locked = now >= kickoff;

    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <div class="match-header">
        <span class="round">${match.round}</span>
        <span class="kickoff">${kickoff.toLocaleDateString()} ${kickoff.toLocaleTimeString()}</span>
      </div>
      <div class="score-inputs">
        <div class="team">
          <span>${match.homeTeam}</span>
          <input type="number" id="home-${match.matchId}" min="0" max="20" placeholder="0" ${locked ? "disabled" : ""} />
        </div>
        <span class="vs">VS</span>
        <div class="team">
          <input type="number" id="away-${match.matchId}" min="0" max="20" placeholder="0" ${locked ? "disabled" : ""} />
          <span>${match.awayTeam}</span>
        </div>
      </div>
      ${locked 
        ? '<p class="locked">🔒 Predictions locked</p>' 
        : `<button onclick="submitPrediction('${match.matchId}', '${playerName}')">Submit Prediction</button>`
      }
    `;
    container.appendChild(card);
  });

  loadLeaderboard();
}

async function submitPrediction(matchId, playerName) {
  const homeScore = document.getElementById(`home-${matchId}`).value;
  const awayScore = document.getElementById(`away-${matchId}`).value;

  if (homeScore === "" || awayScore === "") {
    alert("Please enter both scores!");
    return;
  }

  const response = await fetch(`${API_URL}/predictions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerName, matchId, homeScore: Number(homeScore), awayScore: Number(awayScore) })
  });

  const data = await response.json();

  if (response.ok) {
    alert(`Prediction submitted for ${matchId}!`);
  } else {
    alert(`Error: ${data.error}`);
  }
}

async function loadLeaderboard() {
  const response = await fetch(`${API_URL}/leaderboard`);
  const leaderboard = await response.json();

  const container = document.getElementById("leaderboard-container");
  container.innerHTML = "<h2>Leaderboard</h2>";

  if (leaderboard.length === 0) {
    container.innerHTML += "<p>No points yet. Predictions will be scored after matches finish!</p>";
    return;
  }

  leaderboard.forEach((entry, index) => {
    const row = document.createElement("div");
    row.className = "leaderboard-row";
    row.innerHTML = `
      <span class="rank">#${index + 1}</span>
      <span class="name">${entry.playerName}</span>
      <span class="points">${entry.points} pts</span>
    `;
    container.appendChild(row);
  });
}