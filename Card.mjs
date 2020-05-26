class Card {
  constructor(src, id) {
    this.id = id;
    this.element = document.createElement("div");
    this.element.id = id;
    this.element.className = "card";
    const front = document.createElement("img");
    front.src = src;
    front.className = "card-front";
    const back = document.createElement("img");
    back.src = "./data/back.png";
    back.className = "card-back";
    this.element.appendChild(front);
    this.element.appendChild(back);
  }
}

export default Card;
