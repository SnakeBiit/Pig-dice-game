var scores,
  roundScore,
  activePlayer,
  gameIsPlaying,
  n = 0,
  swit;
var tracking = [];

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gameIsPlaying) {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    n += 2;
    tracking.push(dice1);
    tracking.push(dice2);
    findSix(n);

    console.log(tracking, swit);

    var diceDOM1 = document.getElementById("dice-1");
    diceDOM1.style.display = "block";
    diceDOM1.src = "dice-" + dice1 + ".png";
    var diceDOM2 = document.getElementById("dice-2");
    diceDOM2.style.display = "block";
    diceDOM2.src = "dice-" + dice2 + ".png";
    document.querySelector(".sixsix").style.display = "none";

    if (swit === true) {
      roundScore += dice1 + dice2 + 12;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      document.querySelector(".sixsix").style.display = "block";
      swit = false;
    } else if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gameIsPlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    var val = document.querySelector(".final-score").value;
    if (val) {
      var winningScore = val;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gameIsPlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".sixsix").style.display = "none";
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  tracking = [];
  n = 0;
  swit = false;
}
function findSix(n) {
  if (n === 0) {
    return 0;
  } else {
    findSix(n - 1);
    if (tracking[n] === 6 && tracking[n - 1] === 6 && (n - 1) % 2 === 0) {
      swit = true;
      tracking.pop();
      tracking.pop();
    }
  }
}

document.querySelector(".btn-new").addEventListener("click", function () {
  init();
});

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gameIsPlaying = true;
  swit = false;

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
  document.querySelector(".sixsix").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
