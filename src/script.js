// БИБЛИОТЕКА ДЛЯ ПОИСКА
import debounce from "lodash.debounce";
// API
import ApiService from "./js/api-service";
// ШАБЛОНЫ
import { moviesAll } from "./templates/movies-all";
import { movieSingle } from "./templates/movie-single";
// ПАГИНАЦИЯ
import queryParams from "./js/pagination";
// МОДАЛКА
import openModalWindow from "./js/modal";

// REFS
const moviesList = document.querySelector(".home-list");
const modalWindow = document.querySelector("[data-modal]");
const queryInput = document.getElementById("query-input");
const invalidFeedback = document.querySelector(".query-warning");

// LOCALSTORAGE
let watchedArray = localStorage.getItem("WATCHED_KEY")
  ? JSON.parse(localStorage.getItem("WATCHED_KEY"))
  : [];
let queueArray = localStorage.getItem("QUEUE_KEY")
  ? JSON.parse(localStorage.getItem("QUEUE_KEY"))
  : [];

// ФУНКЦИИ
function addGenres(movies, genres) {
  return movies.map(({ genre_ids, ...otherProps }) => {
    const genre_names = genre_ids.map((genreId) => {
      return genres.find(({ id }) => genreId === id).name;
    });
    return { ...otherProps, genre_names };
  });
}

function renderMovies(arr) {
  moviesList.innerHTML = moviesAll(arr);
}

async function renderMovieInfo(movieId) {
  const result = await api.getMovieById(movieId);
  modalWindow.innerHTML = movieSingle(result);
  document
    .querySelector('[data-action="add-to-watched"]')
    .addEventListener(
      "click",
      addToStorage.bind(null, movieId, "WATCHED_KEY", watchedArray)
    );
  document
    .querySelector('[data-action="add-to-queue"]')
    .addEventListener(
      "click",
      addToStorage.bind(null, movieId, "QUEUE_KEY", queueArray)
    );
}

// ДОБАВЛЕНИЕ В КОРЗИНУ
function addToStorage(movieId, key, arr) {
  const index = arr.indexOf(movieId);
  index === -1 ? arr.push(movieId) : arr.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(arr));
}

// ВЫЗОВ МОДАЛКИ ПО КЛИКУ НА КАРТИНКУ
function onMovieClick(e) {
  if (!e.target.classList.contains("home-list-img")) return;
  console.log(e.target.dataset.id);
  openModalWindow();
  renderMovieInfo(e.target.dataset.id);
}

// ПОИСК
function onQueryInput(e) {
  if (e.target.value.length > 2) {
    invalidFeedback.classList.add("visually-hidden");
    Promise.all([api.getMoviesByKeyWords(e.target.value), api.getGenres()])
      .then(([{ results: movies }, { genres }]) => {
        if (movies.length > 0) {
          return addGenres(movies, genres);
        }
        throw new Error("Empty results");
      })
      .then((result) => renderMovies(result))
      .catch((err) => {
        console.log("render: catch error: ", err.message);
        invalidFeedback.classList.remove("visually-hidden");
      });
  }
}

// ВЫВОД ФИЛЬМОВ
const api = new ApiService();

api.page = queryParams.get("page");

Promise.all([api.getPopular(), api.getGenres()])
  .then(([{ results: movies }, { genres }]) => addGenres(movies, genres))
  .then((result) => renderMovies(result));

//  ДОБАВЛЕНИЕ КЛИКА НА КАРТИНКУ ФИЛЬМА
moviesList.addEventListener("click", onMovieClick);

// DEBOUNCE
queryInput.addEventListener("input", debounce(onQueryInput, 500));
