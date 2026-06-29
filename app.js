function submitPrediction() {
  const playerName = document.getElementById("playerName").value;
  const score1 = document.getElementById("score1").value;
  const score2 = document.getElementById("score2").value;

  if (playerName === "" || score1 === "" || score2 === "") {
    alert("Please fill in all fields!");
    return;
  }

  console.log("Name:", playerName);
  console.log("Prediction:", score1, "-", score2);

  alert(`Thanks ${playerName}! Prediction ${score1} - ${score2} submitted!`);
}