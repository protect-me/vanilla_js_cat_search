import api from "./api/api.js";
import ResultSection from "./components/ResultSection.js";
import SearchSection from "./components/SearchSection.js";
export default class App {
  constructor($target) {
    // 여기서 $target은 main.js에서 넘긴 document.querySelector("#App")
    console.log($target); // <div id="#App"></div>

    const searchSection = new SearchSection({
      $target,
      onSearch: async (keyword) => {
        const response = await api.fetchCats(keyword);
        if (response) {
          console.log(response);
          resultSection.setState(response);
        }
      },
    });

    const resultSection = new ResultSection($target, null);
  }
}
