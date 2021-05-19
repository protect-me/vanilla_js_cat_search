import api from "./api/api.js";
import ResultSection from "./components/ResultSection.js";
import SearchSection from "./components/SearchSection.js";
import Loader from "./components/Loader.js";
import { getItem, setItem } from "./util/localStorage.js";

export default class App {
  constructor($target) {
    let keywordsHistory = getItem("keywordsHistory");
    if (keywordsHistory == null || keywordsHistory == "") {
      keywordsHistory = [];
    } else {
      keywordsHistory = keywordsHistory.split(",");
    }

    let initialData = null;
    const recent = getItem("recent");
    if (recent != null) {
      initialData = JSON.parse(recent);
    }

    const onSearch = async (keyword, isRandom) => {
      const loader = new Loader($target); // Loader On
      let response = null;
      if (isRandom) {
        response = await api.fetchRandomCats();
        console.log("random", response);
      } else {
        response = await api.fetchCats(keyword);
      }
      resultSection.setState(response);
      const recent = JSON.stringify(response);
      setItem("recent", recent);
      loader.removeLoader(); // Loader Off
    };

    const searchSection = new SearchSection({
      $target,
      onSearch,
      keywordsHistory,
    });

    const resultSection = new ResultSection($target, initialData);
  }
}
