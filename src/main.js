// anync & await 사용을 위한 import
import "regenerator-runtime/runtime";

import App from "./App.js";

const app = new App(document.querySelector("#App"));
// new App에 첫번째 인자로 document.querySelector("#App")을 넘기고,
// new App의 내부에서는 받은 매개 변수를 $target으로 사용.
