export const moviesAllLib = (arr) => {
  let output = "";
  arr.forEach((el) => {
    // console.log(el);
    let { title, release_date, poster_path, vote_average, genres, id } = el;
    output += `
    <li class="home-list-card">
      <img class="home-list-img" src="https://image.tmdb.org/t/p/w400${poster_path}" alt="movie picture"
          data-id="${id}" />
      <p class="home-card-title">${title}</p>
      <div class="card-list">
          <p class="home-card-сategory">
             ${genres.map((el) => el.name).join(", ")}
              | ${release_date}</p>
          <p class="home-card-rating">${vote_average}</p>
      </div>
  </li>`;
  });

  return output;
};
// - Images
//https://developers.themoviedb.org/3/getting-started/images
