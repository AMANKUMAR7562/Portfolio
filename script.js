/* TYPING EFFECT */
const words = [
  "AI & Machine Learning",
  "Creative Problem Solving",
  "Clean Digital Experiences"
];

let wi = 0, ci = 0;
const typing = document.querySelector(".typing");

function type() {
  if (ci < words[wi].length) {
    typing.textContent += words[wi][ci++];
    setTimeout(type, 70);
  } else {
    setTimeout(erase, 1400);
  }
}

function erase() {
  if (ci > 0) {
    typing.textContent = words[wi].substring(0, --ci);
    setTimeout(erase, 40);
  } else {
    wi = (wi + 1) % words.length;
    setTimeout(type, 300);
  }
}
type();

/* MODAL DATA */
const data = {
  ai: {
    title: "Artificial Intelligence",
    text: "Projects involving intelligent decision-making systems.",
    projects: ["AI Nurse Assistant"]
  },
  ml: {
    title: "Machine Learning",
    text: "Predictive and data-driven machine learning models.",
    projects: ["House Price Prediction"]
  },
  python: {
    title: "Python",
    text: "Backend logic, data processing, and ML pipelines.",
    projects: ["AI Nurse Assistant", "House Price Prediction"]
  },
  data: {
    title: "Data Science",
    text: "Analyzing and extracting insights from structured data.",
    projects: ["House Price Prediction"]
  },
  ui: {
    title: "UI / UX Design",
    text: "Design-focused problem solving and usability improvements.",
    projects: ["UX Case Study"]
  }
};

/* MODAL LOGIC */
const modal = document.getElementById("modal");
const title = document.getElementById("modal-title");
const text = document.getElementById("modal-text");
const projectsBox = document.getElementById("modal-projects");

document.querySelectorAll(".skill").forEach(btn => {
  btn.addEventListener("click", () => {
    const skill = data[btn.dataset.skill];

    title.textContent = skill.title;
    text.textContent = skill.text;
    projectsBox.innerHTML = "";

    skill.projects.forEach(p => {
      const div = document.createElement("div");
      div.textContent = p;
      projectsBox.appendChild(div);
    });

    modal.classList.add("show");
  });
});

document.querySelector(".close").onclick = () => modal.classList.remove("show");
modal.onclick = e => {
  if (e.target === modal) modal.classList.remove("show");
};

/* SUBTLE 3D BACKGROUND */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 55;

const geometry = new THREE.BufferGeometry();
const positions = [];
for (let i = 0; i < 600 * 3; i++) {
  positions.push((Math.random() - 0.5) * 200);
}
geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ color: 0x6c7cff, size: 0.45 });
const points = new THREE.Points(geometry, material);
scene.add(points);

function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.0002;
  renderer.render(scene, camera);
}
animate();
