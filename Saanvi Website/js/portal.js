import { goTo } from "./main.js";

const portal = document.getElementById("portal");
const audio = document.getElementById("bgm");

portal.addEventListener("click", () => {
  portal.style.display = "none";
  goTo("theater");
  audio.play();
});
