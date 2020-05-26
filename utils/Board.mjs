class Board {
  constructor(size) {
    this.size = size;
    this.allCards = [];
    this.board = document.querySelector(".board");
    this.board.style.gridTemplateColumns = `repeat(${size}, 100px)`;
  }

  addCard(card) {
    this.allCards.push(card);
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  shuffle() {
    for (let i = this.allCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.allCards[i], this.allCards[j]] = [
        this.allCards[j],
        this.allCards[i],
      ];
    }

    for (let i = 0; i < this.allCards.length; i++) {
      this.board.appendChild(this.allCards[i].element);
    }
  }
}

export default Board;
