export default class InfoModal {
  constructor(data) {
    this.data = data;
    this.modalWrapper = document.createElement("div");
    this.modalWrapper.className = "modal-wrapper";

    document.querySelector("#App").appendChild(this.modalWrapper);
    this.render();
  }
  closeModal() {
    this.modalWrapper.remove();
  }
  render() {
    const { name, origin, temperament, url } = this.data;
    const engName = name.split(" / ")[0];
    const korName = name.split(" / ")[1];

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const modalContents = document.createElement("div");
    modalContents.className = "modal-contents";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";

    const modalTitle = document.createElement("p");
    modalTitle.className = "modal-title";
    modalTitle.innerText = korName;

    const modalCloseBtn = document.createElement("span");
    modalCloseBtn.className = "modal-close-btn";
    modalCloseBtn.innerText = "X";

    const modalImage = document.createElement("img");
    modalImage.className = "modal-image";
    modalImage.src = url;

    const modalInfo = document.createElement("article");
    modalInfo.className = "modal-info";

    const catEngName = document.createElement("p");
    catEngName.className = "cat-eng-name";
    catEngName.innerText = engName;

    const catOrigin = document.createElement("p");
    catOrigin.className = "cat-origin";
    catOrigin.innerText = origin;

    const catTemperament = document.createElement("p");
    catTemperament.className = "cat-temperament";
    catTemperament.innerText = temperament;

    modalCloseBtn.addEventListener("click", () => {
      this.closeModal();
    });

    overlay.addEventListener("click", () => {
      this.closeModal();
    });

    document.addEventListener("keydown", () => {
      this.closeModal();
    });

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalCloseBtn);

    modalInfo.appendChild(catEngName);
    modalInfo.appendChild(catOrigin);
    modalInfo.appendChild(catTemperament);

    modalContents.appendChild(modalHeader);
    modalContents.appendChild(modalImage);
    modalContents.appendChild(modalInfo);

    this.modalWrapper.appendChild(overlay);
    this.modalWrapper.appendChild(modalContents);
  }
}
