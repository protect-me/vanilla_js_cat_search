import api from "../api/api.js";
import Card from "./Card.js";
import InfoModal from "./InfoModal.js";
import Loader from "./Loader.js";

export default class ResultSection {
  constructor($target, data) {
    this.section = document.createElement("section");
    this.section.className = "result-section";
    this.data = data;
    this.lastIdx = 0;
    $target.appendChild(this.section);
    this.render();
    this.lazyLoadObserver();
  }

  setState(newData) {
    this.data = newData;
    this.render();
    this.lazyLoadObserver();
  }

  lazyLoadObserver() {
    const options = { threshold: 0 };
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          entry.target.src = entry.target.dataset.src;
        }
      });
    };
    const io = new IntersectionObserver(callback, options);
    const lazyImages = Array.from(document.getElementsByClassName("lazy"));
    lazyImages.forEach((image) => {
      io.observe(image);
    });
  }

  render() {
    this.section.innerHTML = ""; // result section 초기화

    if (this.data == null) {
      const initialResult = document.createElement("div");
      initialResult.className = "initial-result";
      initialResult.innerHTML = "<h1>검색어를 입력해주세요:)</h1>";
      this.section.appendChild(initialResult);
    } else if (this.data.length == 0) {
      const noResult = document.createElement("div");
      noResult.className = "no-result";
      noResult.innerHTML = "<h1>검색어에 해당하는 결과가 없습니다:(</h1>";
      this.section.appendChild(noResult);
    } else {
      const cardContainer = document.createElement("div");
      cardContainer.className = "card-container";
      this.data.map((cat) => {
        new Card(cardContainer, cat);
      });
      cardContainer.addEventListener("click", async (e) => {
        const clickedCard = e.path.find((item) => item.className == "card");

        if (clickedCard) {
          const loader = new Loader(document.querySelector("#App")); // Loader On
          const id = clickedCard.dataset.id;
          const info = await api.fetchMoreInfo(id);
          const infoModal = new InfoModal(info);
          loader.removeLoader(); // Loader Off
        }
      });
      this.section.appendChild(cardContainer);
    }
  }
}
