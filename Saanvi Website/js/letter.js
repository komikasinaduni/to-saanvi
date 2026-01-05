const canvas = document.getElementById("meteorCanvas");
const ctx = canvas.getContext("2d");
const storybook = document.getElementById("storybook");
const pages = document.querySelectorAll(".page");
const playlist = document.getElementById("playlist");

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

// METEORS
const meteors = [];
for (let i = 0; i < 50; i++) {
  meteors.push({
    x: Math.random()*W,
    y: Math.random()*-H,
    length: 10 + Math.random()*20,
    speed: 4 + Math.random()*4,
    angle: Math.random()*0.5 + 0.2
  });
}

function drawMeteors() {
  ctx.clearRect(0,0,W,H);
  meteors.forEach(m => {
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.length*m.angle, m.y + m.length);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    m.x += m.speed*m.angle;
    m.y += m.speed;
    if(m.y > H) {
      m.x = Math.random()*W;
      m.y = Math.random()*-100;
    }
  });
}

let meteorFrames = 0;
function meteorLoop() {
  drawMeteors();
  meteorFrames++;
  if(meteorFrames < 180) {
    requestAnimationFrame(meteorLoop);
  } else {
    // end meteor shower → reveal storybook
    storybook.style.opacity = 1;
    storybook.style.transform = "scale(1)";
    flipPages();
  }
}

meteorLoop();

// PAGE FLIP
let currentPage = 0;
function flipPages() {
  if(currentPage < pages.length){
    pages[currentPage].classList.add("active");
    currentPage++;
    setTimeout(flipPages, 1000);
  } else {
    playlist.style.opacity = 1;
  }
}
