// ======== СОЗДАНИЕ ФУНКЦИИ ПАГИНАЦИИ И КОЛИЧЕСТВО СТРАНИЦ ========
let paginationLength = 5;
function createPagination(paginationLength) {
  let output = '<button class="pagination-buttons__item"> ◀ </button>';
  for (let i = 0; i < paginationLength; i++) {
    output += `<button class="pagination-buttons__item">${i + 1}</button>`;
  }
  output += '<button class="pagination-buttons__item"> ▶ </button>';
  paginationContainer.innerHTML = output;
}

//======== REFS ========
const paginationContainer = document.querySelector(".pagination-buttons");
createPagination(paginationLength);

//======== QUERY PARAMS ========
const queryParams = new URLSearchParams(window.location.search);
if (!queryParams.toString()) {
  history.replaceState(null, null, window.location.pathname);
}

//======== ДОБАВЛЕНИЕ КЛИКОВ КНОПКАМ ПАГИНАЦИИ  ========
const allButtons = [...document.querySelectorAll(".pagination-buttons__item")];

//======== ДОБАВЛЕНИЕ НОМЕРОВ КНОПОК СТРАНИЦ  ========
allButtons.slice(1, -1).forEach((el) => {
  el.onclick = function () {
    el.textContent === "1"
      ? queryParams.delete("page")
      : queryParams.set("page", el.textContent);
    window.location.search = queryParams.toString();
  };
});

//======== СОЗДАНИЕ КНОПОК NEXT И PREW  ========
[allButtons[0], allButtons.at(-1)].forEach((el, i) => {
  let currentPage = Number(queryParams.get("page"));
  if ((currentPage > 1 && !i) || (currentPage < paginationLength && i)) {
    el.onclick = function () {
      if (currentPage === 2 && !i) {
        queryParams.delete("page");
      } else {
        if (i) {
          queryParams.set(
            "page",
            queryParams.get("page") ? ++currentPage : currentPage + 2
          );
        } else {
          queryParams.set("page", --currentPage);
        }
      }
      window.location.search = queryParams.toString();
    };
  }
});

export default queryParams;
