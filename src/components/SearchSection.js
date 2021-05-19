import { setItem } from "../util/localStorage.js";

export default class SearchSection {
  constructor({ $target, onSearch, keywordsHistory }) {
    this.section = document.createElement("section");
    this.section.className = "search-section";
    this.onSearch = onSearch;
    this.keywordsHistory = keywordsHistory;
    console.log("keywordsHistory", this.keywordsHistory);
    $target.appendChild(this.section);
    this.render(); // 초기화 후 render 실행
  }

  addKeywordsHistory(keyword) {
    // keywordsHistory 내에 keyword를 찾아서, 중복되는 요소가 없을 경우
    if (this.keywordsHistory.indexOf(keyword) == -1) {
      // keywordsHistory의 길이가 5 이상이면 맨 앞의 요소를 삭제
      if (this.keywordsHistory.length >= 5) this.keywordsHistory.shift();
      this.keywordsHistory = this.keywordsHistory.concat([keyword]);
      setItem("keywordsHistory", this.keywordsHistory);
      this.render();
    }
  }

  render() {
    this.section.innerHTML = ""; // search section 내 기존 내용 초기화
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";

    const searchBox = document.createElement("input");
    searchBox.className = "search-box";
    searchBox.placeholder = "고양이를 검색해주세요";
    searchBox.autofocus = true;

    // LocalStorage로부터 getItem으로 받아온 keywordsHistory를 searchHistory에 배치
    const searchHistory = document.createElement("div");
    searchHistory.className = "search-history";
    if (this.keywordsHistory) {
      this.keywordsHistory.map((keyword) => {
        const keywordEl = document.createElement("div");
        keywordEl.className = "keyword";
        keywordEl.innerText = keyword;
        keywordEl.addEventListener("click", () => {
          this.onSearch(keyword);
        });
        searchHistory.appendChild(keywordEl);
      });
    }

    if (this.keywordsHistory)
      // keypress가 아니라 keyup 혹은 keydown을 사용 시, 이벤트가 두 번 일어나는 현상
      searchBox.addEventListener("keypress", (e) => {
        // if (e.keycode == 13)
        if (e.key == "Enter") {
          const keyword = searchBox.value;
          this.onSearch(keyword);
          this.addKeywordsHistory(keyword);
        }
      });
    searchBox.addEventListener("click", () => {
      searchBox.value = "";
    });

    wrapper.appendChild(searchBox);
    wrapper.appendChild(searchHistory);
    this.section.appendChild(wrapper);
  }
}
