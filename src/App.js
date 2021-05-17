import api from "./api/api.js";

export default class App {
  constructor() {
    // api test
    const catData = api.fetchCats();
    catData.then((res) => console.log(res));
  }
}
