export default class SearchSection {
  constructor({ $target, onSearch }) {
    this.section = document.createElement("section");
    this.section.className = "search-section";
    this.onSearch = onSearch;
    $target.appendChild(this.section);
    this.render(); // 초기화 후 render 실행
  }

  searchByKeyword(keyword) {
    if (keyword) {
      this.onSearch(keyword); // 넘겨받은 keyword를 넣어 onSearch를 실행
    }
  }
  render() {
    this.section.innerHTML = ""; // search section 내 기존 내용 초기화
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";

    const searchBox = document.createElement("input");
    searchBox.className = "search-box";
    searchBox.placeholder = "고양이를 검색해주세요";

    // input 태그 내에서 Enter 키를 입력할 경우
    // searchByKeyword 함수에 keyword를 넣어 실행

    // keypress가 아니라 keyup 혹은 keydown을 사용 시, 이벤트가 두 번 일어나는 현상
    searchBox.addEventListener("keypress", (e) => {
      // if (e.keycode == 13)
      if (e.key == "Enter") {
        const keyword = searchBox.value;
        this.searchByKeyword(keyword);
      }
    });

    wrapper.appendChild(searchBox);
    this.section.appendChild(wrapper);
  }
}
