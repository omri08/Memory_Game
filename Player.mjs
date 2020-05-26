class Player {
  constructor(name, dataSelector) {
    this.name = name;
    this.dataSelector = dataSelector;
    this.wins = 0;
    this.losses = 0;
    this.draws = 0;
    this.points = 0;
  }

  saveData() {
    localStorage.setItem(this.dataSelector, JSON.stringify(this));
  }
}

export default Player;
