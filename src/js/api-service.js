// ======== API ========
export default class ApiService {
  constructor() {
    this.baseUrl = "https://api.themoviedb.org/3";
    this.key = "e71aab1d4f911c7a2878b439a07513e9";
    this.searchQuery = "";
    this.page = 1;
    this.lang = "uk-UA";
  }

  //======== ЗАБИРАЕМ ИЗ API ========
  getPopular() {
    return this.sendRequest(
      `${this.baseUrl}/movie/popular?api_key=${this.key}&language=${this.lang}&page=${this.page}`
    );
  }
  getGenres() {
    return this.sendRequest(
      `${this.baseUrl}/genre/movie/list?api_key=${this.key}&language=${this.lang}`
    );
  }
  getMovieById(movieId) {
    return this.sendRequest(
      `${this.baseUrl}/movie/${movieId}?api_key=${this.key}&language=${this.lang}`
    );
  }
  getMoviesByKeyWords(keyString) {
    this.searchQuery = encodeURIComponent(keyString);
    return this.sendRequest(
      `${this.baseUrl}/search/movie?api_key=${this.key}&query=${
        this.searchQuery
      }&language=${this.lang}&page=${this.page || "1"}`
    );
  }

  // - НАПОЛНЕНИЕ
  sendRequest(url) {
    return fetch(url)
      .then((res) => this.checkResponse(res))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("--------");
        console.log("fetch: catch error: ", err.message);
      });
  }
  checkResponse(res) {
    if (res.status >= 400) {
      throw new Error("Something went wrong! ❌");
    } else {
      return res.json();
    }
  }
  // ПОИСКОВЫЙ ЗАПРОС
  setSearchQuery(keyString) {
    this.searchQuery = keyString.toLowerCase().replaceAll(" ", "+");
  }
}
