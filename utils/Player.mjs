class Player {
  constructor(name, dataSelector) {
    this.name = name;
    this.dataSelector = dataSelector;
    this.wins = 0;
    this.losses = 0;
    this.draws = 0;
    this.points = 0;
  }

  showScore() {
    const playerDOMWins = document.querySelector(`.${this.dataSelector}-wins`);
    playerDOMWins.innerHTML = this.wins;

    const playerDOMPoints = document.querySelector(
      `.${this.dataSelector}-points`
    );
    playerDOMPoints.innerHTML = this.points;

    const playerDOMlosses = document.querySelector(
      `.${this.dataSelector}-losses`
    );
    playerDOMlosses.innerHTML = this.losses;

    const playerDOMdraws = document.querySelector(
      `.${this.dataSelector}-draws`
    );
    playerDOMdraws.innerHTML = this.draws;
  }

  showName() {
    const playerH3 = document.querySelector(`.${this.dataSelector}-h3`);
    playerH3.innerHTML = this.name;
  }

  saveData() {
    localStorage.setItem(this.dataSelector, JSON.stringify(this));
  }
}

export default Player;
