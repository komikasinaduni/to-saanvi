const sections = document.querySelectorAll(".section");

export function goTo(id) {
  sections.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => {
    goTo(btn.dataset.next);
  });
});
