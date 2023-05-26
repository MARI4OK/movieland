// МОДАЛКА
const modalBackDrop = document.querySelector(".backdrop");

function getScrollbarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

// НА КНОПКУ ESC ВЫКЛЮЧАЕТСЯ МОДАЛКА
function onKeysPress(e) {
  if (e.code === "Escape") {
    closeModalWindow();
  }
}

// НА НАЖАТИЕ ВНЕШНЕЙ ОБЛАСТЬ ВЫКЛЮЧАЕТ МОДАЛКУ
function onBackDropClick(e) {
  if (e.target === e.currentTarget) {
    closeModalWindow();
  }
}

// ЗАКРЫТИЕ МОДАЛКИ
function closeModalWindow() {
  modalBackDrop.classList.add("visually-hidden");

  document.body.removeAttribute("style");

  modalBackDrop.removeEventListener("click", onBackDropClick);
  window.removeEventListener("keydown", onKeysPress);
}

// ЭКСПОРТ ФУНКЦИИ В ФАЙЛ SKRIPT.JS
export default function openModalWindow() {
  modalBackDrop.classList.remove("visually-hidden");

  document.body.style.paddingRight = getScrollbarWidth() + "px";
  document.body.style.overflowY = "hidden";

  modalBackDrop.addEventListener("click", onBackDropClick);
  window.addEventListener("keydown", onKeysPress);
}
