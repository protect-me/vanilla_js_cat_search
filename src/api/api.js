const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";
// 참조 : mozilla > fetch > fetch의 성공 여부를 체크
// https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch

// 1. fetch로부터 return되는 promise 객체가 있을 경우 : try
//   1-1. promise 값이 error인 경우 : try > if (!response.ok)
//   1-2. promise 값이 ok인 경우 : try > else (response.ok)
// 2. fetch로부터 return되는 Promise 객체가 없을 경우 : catch

const request = async (url) => {
  try {
    // 1
    const response = await fetch(url);
    if (!response.ok) {
      // 1-1
      const err = await response.json();
      throw new Error("Network Error : ", err);
    } else {
      // 1-2
      const data = await response.json();
      return data;
    }
  } catch (e) {
    // 2
    throw new Error("Fetch Error : ", e.message);
  }
};

const api = {
  fetchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
};

export default api;
