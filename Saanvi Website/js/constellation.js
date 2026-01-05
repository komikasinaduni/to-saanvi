const svg = document.getElementById("starMap");
const tooltip = document.getElementById("tooltip");
const container = document.getElementById("constellation");

/*
  HYDRANGEA CONSTELLATION DATA
  Clustered, rounded, branching.
*/
const stars = [
  { x: 400, y: 250, r: 6, text: "You, at the center 🌸" },

  { x: 340, y: 220, r: 4, text: "Porco Rosso forever ✈️" },
  { x: 460, y: 220, r: 4, text: "Blue whales obsession 🐋" },

  { x: 300, y: 260, r: 4, text: "Hydrangeas are your flower 💙" },
  { x: 500, y: 260, r: 4, text: "Violet Evergarden pain" },

  { x: 340, y: 310, r: 4, text: "Coffee flavored everything ☕" },
  { x: 460, y: 310, r: 4, text: "Croissants > everything 🥐" },

  { x: 400, y: 340, r: 4, text: "Whisper of the Heart energy" }
];

/*
  CONNECTIONS (branching, not linear)
*/
const connections = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]
];

function drawConstellation() {
  svg.innerHTML = "";

  // Lines
  connections.forEach(([a,b], i) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", stars[a].x);
    line.setAttribute("y1", stars[a].y);
    line.setAttribute("x2", stars[b].x);
    line.setAttribute("y2", stars[b].y);
    line.classList.add("line");
    line.style.animationDelay = `${i * 0.2}s`;
    svg.appendChild(line);
  });

  // Stars
  stars.forEach(starData => {
    const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    star.setAttribute("cx", starData.x);
    star.setAttribute("cy", starData.y);
    star.setAttribute("r", starData.r);
    star.classList.add("star");

    // Hover
    star.addEventListener("mousemove", e => {
      tooltip.style.left = e.pageX + 12 + "px";
      tooltip.style.top = e.pageY + 12 + "px";
      tooltip.textContent = starData.text;
      tooltip.style.opacity = 1;
    });

    star.addEventListener("mouseleave", () => {
      tooltip.style.opacity = 0;
    });

    // Tap (mobile)
    star.addEventListener("click", e => {
      tooltip.style.left = e.pageX + 12 + "px";
      tooltip.style.top = e.pageY + 12 + "px";
      tooltip.textContent = starData.text;
      tooltip.style.opacity = 1;

      setTimeout(() => {
        tooltip.style.opacity = 0;
      }, 2500);
    });

    svg.appendChild(star);
  });
}

/*
  BACKGROUND PARTICLES
*/
function createParticles(count = 25) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDelay = Math.random() * 10 + "s";
    container.appendChild(p);
  }
}

drawConstellation();
createParticles();
