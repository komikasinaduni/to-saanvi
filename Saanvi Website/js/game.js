const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("scoreText");

let W, H;
function resize() {
  W = canvas.width = Math.min(window.innerWidth * 0.9, 700);
  H = canvas.height = 220;
}
window.addEventListener("resize", resize);
resize();

/* PLAYER */
const player = {
  x: 50,
  y: 150,
  r: 20,
  vy: 0,
  jump() {
    if (this.y >= 150) this.vy = -11;
  }
};

/* OBSTACLES */
let obstacles = [];
let frame = 0;
let score = 0;
let running = true;
const WIN_SCORE = 300;

/* INPUT */
document.addEventListener("keydown", e => {
  if (e.code === "Space") player.jump();
});
canvas.addEventListener("touchstart", () => player.jump());

/* GAME LOOP */
function loop() {
  if (!running) return;

  ctx.clearRect(0, 0, W, H);

  // gravity
  player.vy += 0.6;
  player.y += player.vy;
  if (player.y > 150) {
    player.y = 150;
    player.vy = 0;
  }

  // draw player (replace with her face image later)
  ctx.font = "28px system-ui";
  const img = new Image();
    img.src = "assets/images/herface.PNG";
    ctx.drawImage(img, player.x - 20, player.y - 20, 40, 40);


  // obstacles
  if (frame % 90 === 0) {
    obstacles.push({ x: W, w: 20 });
  }

  obstacles.forEach(o => {
    o.x -= 4;
    ctx.fillRect(o.x, 160, o.w, 30);

    // collision
    if (
      player.x + player.r > o.x &&
      player.x - player.r < o.x + o.w &&
      player.y + player.r > 160
    ) {
      running = false;
      scoreText.textContent = "You died 💀 refresh or skip";
    }
  });

  obstacles = obstacles.filter(o => o.x + o.w > 0);

  // score
  score++;
  scoreText.textContent = `Score: ${score}`;

  if (score >= WIN_SCORE) {
    running = false;
    scoreText.textContent = "You win ✨";
    document.querySelector("[data-next='gallery']").click();
  }

  frame++;
  requestAnimationFrame(loop);
}

loop();
