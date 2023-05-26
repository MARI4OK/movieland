export const movieSingle = (obj) => {
  //   console.log('obj: ', obj);
  let {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
  } = obj;
  return `
  <div class="card-details-markup">
    <div class="card-details-img">
        <img src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}" class="card-image" />
    </div>
    <div class="card-details-info">
        <h2 class="card-details-title">${title}</h2>
        <ul class="card-details-list">
            <li class="card-details-item">
                <p class="card-details-item-about">Оцінка</p>
                <p class="card-details-item-descript">
                    <span class="card-details-item-vote">${vote_average}</span>
                </p>
            </li>
            <li class="card-details-item">
                <p class="card-details-item-about">Рейтинг</p>
                <p class="card-details-item-descript">${popularity}</p>
            </li>
            <li class="card-details-item">
                <p class="card-details-item-about">Оригінальна назва</p>

                <p class="card-details-item-descript">${original_title}</p>
            </li>
            <li class="card-details-item">
                <p class="card-details-item-about">Жанри</p>
                <p class="card-details-item-descript">
                  <span class="card-details-item-genre">${genres
                    .map((el) => el.name)
                    .join(
                      '</span>, <span class="card-details-item-genre">'
                    )}</span>
                </p>
            </li>
        </ul>
        <p class="card-details-descript-title">Опис</p>
        <p class="card-details-descript-about">${overview}</p>
        <div class="card-details-button-markup">
            <button class="modal-btn" data-action="add-to-watched" type="button">подивився</button>
            <button class="modal-btn" data-action="add-to-queue" type="button">додати в чергу</button>
        </div>
    </div>
  </div>`;
};
