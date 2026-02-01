gsap.registerPlugin(ScrollTrigger);

/* LOADER */
window.addEventListener("load", () => {
  gsap.to(".loader", {
    opacity: 0,
    duration: 1,
    delay: 0.6,
    onComplete: () => document.querySelector(".loader").remove()
  });
});

/* TYPING EFFECT */
const text = ["AI / ML Engineer", "Creative Technologist", "Problem Solver"];
let index = 0;
let char = 0;
const typing = document.querySelector(".typing");

function typeText() {
  if (char < text[index].length) {
    typing.textContent += text[index].charAt(char);
    char++;
    setTimeout(typeText, 80);
  } else {
    setTimeout(eraseText, 1500);
  }
}

function eraseText() {
  if (char > 0) {
    typing.textContent = text[index].substring(0, char - 1);
    char--;
    setTimeout(eraseText, 40);
  } else {
    index = (index + 1) % text.length;
    setTimeout(typeText, 400);
  }
}
typeText();

/* THEME TOGGLE */
const toggle = document.querySelector(".theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

/* THREE.JS 3D BACKGROUND */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.z = 30;

/* PARTICLES */
const geometry = new THREE.BufferGeometry();
const count = 2000;
const positions = [];

for (let i = 0; i < count * 3; i++) {
  positions.push((Math.random() - 0.5) * 200);
}

geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
  color: 0x6c7cff,
  size: 0.6
});

const points = new THREE.Points(geometry, material);
scene.add(points);

/* ANIMATE */
function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.0008;
  points.rotation.x += 0.0004;
  renderer.render(scene, camera);
}
animate();

/* RESIZE */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
