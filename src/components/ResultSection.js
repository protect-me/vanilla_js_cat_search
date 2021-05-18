import Card from "./Card.js";

export default class ResultSection {
  constructor($target, data) {
    this.section = document.createElement("section");
    this.section.className = "result-section";
    this.data = data;
    $target.appendChild(this.section);
    this.render();
  }
  setState(newData) {
    this.data = newData;
    this.render();
  }
  render() {
    this.section.innerHTML = ""; // result section 초기화
    if (this.data) {
      const cardContainer = document.createElement("div");
      cardContainer.className = "card-container";
      this.data.map((cat) => {
        new Card(cardContainer, cat);
      });
      this.section.appendChild(cardContainer);
    } else {
      return;
    }
  }
}
