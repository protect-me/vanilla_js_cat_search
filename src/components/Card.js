export default class Card {
  constructor($target, data) {
    this.data = data;
    this.card = document.createElement("article");
    this.card.className = "card";
    this.card.dataset.id = data.id;

    $target.appendChild(this.card);
    this.render();
  }
  render() {
    const { name, url } = this.data;
    const cardImage = document.createElement("img");
    cardImage.className = "card-image";
    // cardImage.src = url;
    cardImage.classList.add("lazy");
    cardImage.dataset.src = url;

    this.card.appendChild(cardImage);
  }
}
