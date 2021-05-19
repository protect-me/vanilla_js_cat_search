import api from "./api/api.js";
import ResultSection from "./components/ResultSection.js";
import SearchSection from "./components/SearchSection.js";
import Loader from "./components/Loader.js";
import { getItem, setItem } from "./util/localStorage.js";

export default class App {
  constructor($target) {
    let keywordsHistory = getItem("keywordsHistory");
    if (keywordsHistory == null) {
      keywordsHistory = [];
    } else {
      keywordsHistory = keywordsHistory.split(",");
    }
    const searchSection = new SearchSection({
      $target,
      onSearch: async (keyword) => {
        const loader = new Loader($target); // Loader On
        const response = await api.fetchCats(keyword);
        console.log(response);
        resultSection.setState(response);
        loader.removeLoader(); // Loader Off
      },
      keywordsHistory,
    });

    const resultSection = new ResultSection($target, null);
  }
}
