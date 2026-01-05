const cloudContainer = document.getElementById("cloudContainer");

// DATA: polaroid images and memories
const polaroids = [
  { src: "assets/images/photo1.jpg", text: "First memory together" },
  { src: "assets/images/photo2.jpg", text: "Inside joke!" },
  { src: "assets/images/photo3.jpg", text: "Crazy adventure" },
  // Add more images
];

// CREATE MODAL
const modal = document.createElement("div");
modal.id = "memoryModal";
modal.innerHTML = `<span id="closeModal">&times;</span><img src="" alt="Memory"/>`;
document.body.appendChild(modal);

const modalImg = modal.querySelector("img");
const closeModal = modal.querySelector("#closeModal");
closeModal.addEventListener("click", () => modal.style.display = "none");

// CREATE CLOUDS WITH POLAROIDS
polaroids.forEach((p, i) => {
  const cloud = document.createElement("div");
  cloud.className = "cloud";
  cloud.style.top = Math.random() * 60 + "%";
  cloud.style.animationDuration = 30 + Math.random() * 20 + "s";
  cloud.style.left = -Math.random() * 300 + "px";

  const img = document.createElement("img");
  img.src = p.src;
  img.alt = p.text;

  // center image on cloud
  img.style.top = "-20px";
  img.style.left = "15px";

  // click to open modal
  img.addEventListener("click", () => {
    modalImg.src = p.src;
    modal.style.display = "flex";
  });

  cloud.appendChild(img);
  cloudContainer.appendChild(cloud);
});
