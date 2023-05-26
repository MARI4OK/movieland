// - script-library.js

//api
import ApiService from './js/api-service';
const api = new ApiService();

//templates
import { moviesAllLib } from './templates/movies-all-lib';
import { movieSingle } from './templates/movie-single';
//modal
import openModalWindow from './js/modal';

// - refs
const moviesList = document.querySelector('.home-list');
const modalWindow = document.querySelector('[data-modal]');
const btnWatched = document.querySelector('[data-action="watched"]');
const btnQueue = document.querySelector('[data-action="queue"]');

// - localStorage
let watchedArray = localStorage.getItem('WATCHED_KEY')
  ? JSON.parse(localStorage.getItem('WATCHED_KEY'))
  : [];
let queueArray = localStorage.getItem('QUEUE_KEY')
  ? JSON.parse(localStorage.getItem('QUEUE_KEY'))
  : [];

/* ========== LIBRARY ========== */
// - functions
async function showLibrary(key) {
  const idsArr = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];

  //clear
  moviesList.innerHTML = '';

  const moviesArr = [];
  for (let i = 0; i < idsArr.length; i++) {
    await api.getMovieById(idsArr[i]).then((result) => moviesArr.push(result));
  }
  //render
  moviesList.innerHTML = moviesAllLib(moviesArr);
}

// - init
btnWatched.addEventListener('click', showLibrary.bind(null, 'WATCHED_KEY'));
btnQueue.addEventListener('click', showLibrary.bind(null, 'QUEUE_KEY'));
showLibrary('WATCHED_KEY');
