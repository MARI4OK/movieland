export const moviesAll = (arr) => {
  let output = "";
  arr.forEach((el) => {
    let { title, release_date, poster_path, vote_average, genre_names, id } =
      el;
    output += `
    <div class="home-list-card">
      <img
        class="home-list-img"
        src="https://image.tmdb.org/t/p/w400/${poster_path}"
        alt="movie picture"
        data-id="${id}"
      />
      <p class="home-card-country_and_data">${release_date}</p>
      <p class="home-card-title">${title}</p>
      <div class="card-list">
        <p class="home-card-сategory">${genre_names.join(", ")}</p>
        <p class="home-card-rating">${vote_average}</p>
      </div>
    </div>`;
  });

  return output;
};
