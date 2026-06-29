const API_URL = "http://localhost:5000/api";
const ADMIN_PASSWORD = "worldcup2026";

async function loadAdminMatches() {
  const password = document.getElementById("adminPassword").value;
  
  if (password !== ADMIN_PASSWORD) {
    alert("Wrong password!");
    return;
  }

  const response = await fetch(`${API_URL}/matches`);
  const matches = await response.json();

  const container = document.getElementById("admin-matches");
  container.innerHTML = "<h2>All Matches</h2>";

  matches.forEach((match) => {
    const kickoff = new Date(match.kickoff);
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
          <input type="number" id="home-${match.matchId}" min="0" max="20" 
            placeholder="${match.homeScore !== null ? match.homeScore : '0'}" 
            value="${match.homeScore !== null ? match.homeScore : ''}" />
        </div>
        <span class="vs">VS</span>
        <div class="team">
          <input type="number" id="away-${match.matchId}" min="0" max="20" 
            placeholder="${match.awayScore !== null ? match.awayScore : '0'}"
            value="${match.awayScore !== null ? match.awayScore : ''}" />
          <span>${match.awayTeam}</span>
        </div>
      </div>
      <p class="status">${match.finished ? "✅ Finished" : "⏳ Not finished yet"}</p>
      <button onclick="submitResult('${match.matchId}')">Save Result</button>
    `;
    container.appendChild(card);
  });
}

async function submitResult(matchId) {
  const homeScore = document.getElementById(`home-${matchId}`).value;
  const awayScore = document.getElementById(`away-${matchId}`).value;

  if (homeScore === "" || awayScore === "") {
    alert("Please enter both scores!");
    return;
  }

  const response = await fetch(`${API_URL}/matches/${matchId}/result`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      homeScore: Number(homeScore), 
      awayScore: Number(awayScore),
      finished: true
    })
  });

  const data = await response.json();

  if (response.ok) {
    alert(`Result saved! ${data.match.homeTeam} ${homeScore} - ${awayScore} ${data.match.awayTeam}`);
    loadAdminMatches();
  } else {
    alert(`Error: ${data.error}`);
  }
}