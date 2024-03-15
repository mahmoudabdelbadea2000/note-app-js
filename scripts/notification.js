import Toastify from "toastify-js";

export const toast = (type, msg) => {
  let bg;
  if (type === "success") {
    bg = "#22bb33";
  } else if (type === "warn") {
    bg = "#EC7160";
  } else if (type === "error") {
    bg = "#f02c2c";
  }
  Toastify({
    text: msg,
    duration: 2000,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: { background: bg },
  }).showToast();
};
