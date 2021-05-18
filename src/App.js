import api from "./api/api.js";
import ResultSection from "./components/ResultSection.js";
import SearchSection from "./components/SearchSection.js";
import Loader from "./components/Loader.js";
export default class App {
  constructor($target) {
    const searchSection = new SearchSection({
      $target,
      onSearch: async (keyword) => {
        const loader = new Loader($target); // Loader On
        const response = await api.fetchCats(keyword);
        console.log(response);
        resultSection.setState(response);
        loader.removeLoader(); // Loader Off
      },
    });

    const resultSection = new ResultSection($target, null);
  }
}
