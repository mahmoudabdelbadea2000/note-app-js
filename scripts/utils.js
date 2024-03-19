import {
  navHeaderElement,
  titleElement,
  authorElement,
  noteElement,
  pinnedNoteElement,
  pinnedNoteContainerElement,
  notesElement,
  noteContainerElement,
  notesBodyElement,
  oneNoteElement,
  noteContentElement,
  liElements,
  articles,
  titleEditElement,
  noteEditElement,
  authorEditElement,
  notesAsideSection,
} from "./elements";
import { toast } from "./notification";

const trancatString = (string) => {
  return string.length > 100 ? `${string.slice(0, 100)}...` : string;
};

export const toggleNavManu = (type) => {
  type.addEventListener("click", () => {
    navHeaderElement.classList.toggle("left-0");
  });
};

export const saveOnLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const fetchNotes = (item) => {
  const notes = localStorage.getItem(item);
  return notes ? JSON.parse(notes) : false;
};

const getFormatDate = () => {
  const date = new Date();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const finalDate =
    monthNames[date.getMonth()] +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear();

  return finalDate;
};

export const notes = fetchNotes("notes") || [];

export const renderNoteOnSrceen = (notes) => {
  let noteContent = ``;
  let pinnedNote = ``;
  if (notes.length < 1) {
    notesBodyElement.innerHTML = `<section class="img__empty-container">
    <img src="/assets/img__empty.jpg" alt="notes empty" />
      </section>`;
  } else {
    notes.forEach((note, idx) => {
      if (note.isPinned) {
        pinnedNoteElement.classList.add("display-element");
        pinnedNote += `<div
                  class=" note"
                  data-idx="${idx}"
                >
                  <h5 class="text-heading-color leading-7">
                    ${note?.title}
                  </h5>
                  <p class="text-sec-color text-main-size leading-5">
                    ${trancatString(note?.note)}
                  </p>
                  <div
                    class="flex justify-between items-center leading-5 text-main-size"
                  >
                    <span class="text-sec-color">Feb 8, 2021</span>
                    <button type="submit" class="text-main-color capitalize delete-icon">
                      delete
                    </button>
                  </div>
                </div>`;
      } else {
        notesElement.classList.add("display-element");
        noteContent += `<div
                  class="note"
                  data-idx="${idx}"
                >
                  <h5 class="text-heading-color leading-7">
                    ${note?.title}
                  </h5>
                  <p class="text-sec-color text-main-size leading-5">
                    ${trancatString(note?.note)}
                  </p>
                  <div
                    class="flex justify-between items-center leading-5 text-main-size"
                  >
                    <span class="text-sec-color">Feb 8, 2021</span>
                    <button type="submit" class="text-main-color capitalize delete-icon">
                      delete
                    </button>
                  </div>
                </div>`;
      }
    });
    pinnedNoteContainerElement.innerHTML = pinnedNote;
    noteContainerElement.innerHTML = noteContent;
  }
};

export const addNote = (e) => {
  e.preventDefault();
  if (!titleElement.value || !authorElement.value || !noteElement.value) {
    toast("warn", "one or more filed is empty please full all fileds");
    return;
  }

  const note = {
    title: titleElement.value,
    author: authorElement.value,
    note: noteElement.value,
    date: getFormatDate(),
    isPinned: e.target.dataset.btn === "add note" ? false : true,
  };

  notes.push(note);
  saveOnLocalStorage("notes", notes);
  toast("success", "note add success");
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

export const navigateToEditPage = () => {
  liElements.forEach((li) => {
    li.classList.remove("li-active");

    articles.forEach((article) => {
      article.classList.add("hidden-element");
    });
    articles[articles.length - 1].classList.remove("hidden-element");
  });
};

const refetchValues = () => {
  const noteIDX = fetchNotes("noteIDX");
  const noteContent = notes[noteIDX];

  titleEditElement.value = noteContent.title;
  noteEditElement.value = noteContent.note;
  authorEditElement.value = noteContent.author;
};

export const openNote = (idx) => {
  const noteInfo = notes[idx];

  noteContentElement.innerHTML = `<div class="relative">
            <h2 class="text-2xl text-heading-color">
              ${noteInfo?.title}
            </h2>
            <span
              class="inline-block mt-2 mb-8 text-sec-color text-main-size leading-5"
              >${noteInfo?.date}</span
            >
            <p class="leading-7 text-heading-color">
              ${noteInfo?.note}
            </p>
            <div class="mt-4 flex justify-between items-center">
              <div class="add__note-icon"> 
                <i class="fa-solid fa-plus text-white text-2xl cursor-pointer edit-icon"></i>
              </div>
              <div class="back-icon-content"> 
                <i class="fa-solid fa-angles-left text-2xl cursor-pointer back-icon"></i>
              </div>
            </div>
          </div>`;

  const editIcon = noteContentElement.querySelector(".edit-icon");
  editIcon.addEventListener("click", () => {
    saveOnLocalStorage("noteIDX", idx);
    navigateToEditPage();
    refetchValues();
  });
};

export const editNote = (e) => {
  e.preventDefault();
  const noteIDX = fetchNotes("noteIDX");

  if (
    !titleEditElement.value ||
    !authorEditElement.value ||
    !noteEditElement.value
  ) {
    toast("warn", "one or more filed is empty please full all fileds");
    return;
  }

  notes[noteIDX] = {
    title: titleEditElement.value,
    author: authorEditElement.value,
    note: noteEditElement.value,
    date: getFormatDate(),
    isPinned: e.target.dataset.btn === "edit note" ? false : true,
  };

  saveOnLocalStorage("notes", notes);
  toast("success", "note edit success");
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

export const deleteNote = (elementIDX) => {
  const newNotes = notes.filter((_, index) => index !== parseInt(elementIDX));
  saveOnLocalStorage("notes", newNotes);
  renderNoteOnSrceen(newNotes);
  toast("success", "note is deleted");
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

export const searching = (value) => {
  if (value.trim() !== "") {
    let searchNote = notes.filter((note) =>
      note.title.toLowerCase().includes(value.toLowerCase())
    );

    saveOnLocalStorage("notes", searchNote);
    renderNoteOnSrceen(searchNote);
  }
};

export const startResize = (e) => {
  const currentWidth = notesAsideSection.offsetWidth;
  const currentHeight = notesAsideSection.offsetHeight;
  const startX = e.clientX;
  const startY = e.clientY;

  const resize = ({ clientX, clientY }) => {
    notesAsideSection.style.width = `${currentWidth + clientX - startX}px`;
    notesAsideSection.style.height = `${currentHeight + clientY - startY}px`;
  };

  const stopResize = () => {
    document.removeEventListener("mousemove", resize);
  };

  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize, { once: true });
};

export const checkWindowWidth = () => {
  const windowWidth = window.innerWidth;
  const notesSections = document.querySelectorAll(".notes__body section");

  if (windowWidth < 1024) {
    oneNoteElement().forEach((note) => {
      note.addEventListener("click", () => {
        notesSections.forEach((section) => {
          section.classList.toggle("hidden-element");
        });
      });
    });
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("back-icon")) {
        notesSections.forEach((section) => {
          section.classList.toggle("hidden-element");
        });
      }
    });
  }
};

export const initproject = (notes) => {
  renderNoteOnSrceen(notes);
  const note = oneNoteElement()[0];
  note?.classList.add("select__note");
  openNote(note?.dataset.idx);
  checkWindowWidth();
};
