import cardsData from "./data/cards.mjs";
import Card from "./Card.mjs";
import Board from "./Board.mjs";
import Player from "./Player.mjs";

const Player1 = Object.assign(
  new Player(),
  JSON.parse(localStorage.getItem("player1"))
);
const Player2 = Object.assign(
  new Player(),
  JSON.parse(localStorage.getItem("player2"))
);

const size = Number(JSON.parse(localStorage.getItem("size")));
const board = new Board(size);

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let turn = Player1;
let cardsUp = 0;

function showScore(Player, selector) {
  const playerDOMWins = document.querySelector(`.${selector}-wins`);
  playerDOMWins.innerHTML = Player.wins;

  const playerDOMPoints = document.querySelector(`.${selector}-points`);
  playerDOMPoints.innerHTML = Player.points;

  const playerDOMlosses = document.querySelector(`.${selector}-losses`);
  playerDOMlosses.innerHTML = Player.losses;

  const playerDOMdraws = document.querySelector(`.${selector}-draws`);
  playerDOMdraws.innerHTML = Player.draws;
}

function updateTurn(player) {
  const turnHtml = document.querySelector(".turn");
  turnHtml.innerHTML = `${player.name}'s turn`;
}

function startGame(size) {
  let k = 0;
  for (let i = 0; i < Math.floor((size * size) / 2); i++) {
    const card1 = new Card(`./data/${cardsData[k].img}`, cardsData[k].id);
    board.addCard(card1);
    const card2 = new Card(`./data/${cardsData[k].img}`, cardsData[k++].id);
    board.addCard(card2);
  }
  // adding one card without a pair
  if (size % 2 != 0) {
    const card1 = new Card(`./data/${cardsData[k].img}`, cardsData[k++].id);
    board.addCard(card1);
  }

  board.shuffle();
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlippedCard = false;

  let isMatch = firstCard.id === secondCard.id;
  isMatch ? foundMatch() : unflipCards();
}

function toggleTurn() {
  if (turn == Player1) {
    turn = Player2;
  } else {
    turn = Player1;
  }
}

function foundMatch() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  updateScore();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    toggleTurn();
    updateTurn(turn);
    lockBoard = false;
    firstCard = null;
    secondCard = null;
  }, 900);
}

function updateScore() {
  turn.points += 1;
  cardsUp += 2;
  console.log(Player1);
  console.log(Player2);
  console.log(size * size);
  if (cardsUp == size * size || (cardsUp + 1 == size * size && size % 2 != 0)) {
    gameOver();
    lockBoard = true;
    if (Player1.points == Player2.points) {
      Player1.draws += 1;
      Player2.draws += 1;
      declare();
    } else if (Player1.points > Player2.points) {
      Player1.wins += 1;
      Player2.losses += 1;
      declare(Player1, "WIN");
    } else {
      Player2.wins += 1;
      Player1.losses += 1;
      declare(Player2, "WIN");
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      toggleTurn();
      updateTurn(turn);
      lockBoard = false;
      firstCard = null;
      secondCard = null;
    }, 900);
  }
  Player2.saveData();
  Player1.saveData();
  showScore(Player1, Player1.dataSelector);
  showScore(Player2, Player2.dataSelector);
}

function declare(player = null, result = null) {
  console.log(player);
  const place = document.querySelector(".turn");
  if (!player && !result) {
    place.innerHTML = "DRAW";
  } else if (result == "WIN") {
    place.innerHTML = `${player.name} Wins!`;
  }
}

function gameOver() {
  cards.forEach((card) => card.removeEventListener("click", flipCard));
}

function resetGame() {
  Player1.points = 0;
  Player2.points = 0;
  cardsUp = 0;
  lockBoard = false;

  board.allCards.forEach(({ element }) => {
    setTimeout(() => {
      element.classList.remove("flip");
    });
  });
  showScore(Player1, Player1.dataSelector);
  showScore(Player2, Player2.dataSelector);
  turn = Player1;
  board.allCards.forEach(({ element }) => element.remove());
  board.allCards = [];
  updateTurn(turn);
  startGame(size);
  cards = document.querySelectorAll(".card");
  makeClickable();
}

const player1H3 = document.querySelector(".player1-h3");
player1H3.innerHTML = Player1.name;

const player2H3 = document.querySelector(".player2-h3");
player2H3.innerHTML = Player2.name;

document.querySelector(".reset").addEventListener("click", resetGame);

updateTurn(turn);
showScore(Player1, Player1.dataSelector);
showScore(Player2, Player2.dataSelector);
startGame(size);
let cards = document.querySelectorAll(".card");

function makeClickable() {
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

makeClickable();
