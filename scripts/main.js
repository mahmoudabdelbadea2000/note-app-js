import {
  checkWindowWidth,
  deleteNote,
  editNote,
  initproject,
  notes,
  openNote,
  searching,
  startResize,
} from "./utils";
import {
  addBtns,
  articles,
  asideElement,
  closeNavIcon,
  inputContainerElement,
  liElements,
  navHeaderElement,
  searchIcon,
  toggleManuElement,
  oneNoteElement,
  editBtns,
  deleteIcon,
  modalElement,
  confirmDeleteBtn,
  cancelDeleteBtn,
  inputSearchElement,
  resizeIcon,
} from "./elements";
import { addNote, toggleNavManu } from "./utils";

initproject(notes);

toggleNavManu(toggleManuElement);
toggleNavManu(closeNavIcon);

// toggle search input
searchIcon.addEventListener("click", (e) => {
  e.target.classList.toggle("fa-xmark");
  asideElement.classList.toggle("bg-section-color");
  inputContainerElement.classList.toggle("search-toggle");
});

// toggle nav elements
liElements.forEach((li) => {
  li.addEventListener("click", () => {
    liElements.forEach((li) => {
      li.classList.remove("li-active");
    });
    li.classList.add("li-active");

    articles.forEach((article) => {
      article.classList.add("hidden-element");
    });

    const activeIndex = Array.from(liElements).indexOf(li);
    if (activeIndex !== -1 && activeIndex < articles.length) {
      articles[activeIndex].classList.remove("hidden-element");
    }

    navHeaderElement.classList.toggle("left-0");
  });
});

// handle add note
addBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    addNote(e);
  });
});

// handle edit note
editBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    editNote(e);
  });
});

// handle appear note on screen
oneNoteElement().forEach((note) => {
  const noteIDX = note.dataset.idx;
  note.addEventListener("click", () => {
    oneNoteElement().forEach((note) => {
      note.classList.remove("select__note");
    });
    note.classList.add("select__note");
    openNote(noteIDX);
  });
});

// handle delete note
let elementIDX;
deleteIcon().forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    elementIDX = e.target.parentElement.parentElement.dataset.idx;
    modalElement.classList.remove("hidden-element");
  });
});

confirmDeleteBtn.addEventListener("click", () => {
  deleteNote(elementIDX);
  modalElement.classList.add("hidden-element");
});

cancelDeleteBtn.addEventListener("click", () =>
  modalElement.classList.add("hidden-element")
);

// handle search
inputSearchElement.addEventListener("keyup", () => {
  searching(inputSearchElement.value);
});

resizeIcon.addEventListener("mousedown", startResize);

window.addEventListener("resize", checkWindowWidth);
