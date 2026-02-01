/* TYPING EFFECT */
const words = [
  "AI & Machine Learning",
  "Creative Problem Solving",
  "Clean Digital Experiences"
];

let wordIndex = 0;
let charIndex = 0;
const typing = document.querySelector(".typing");

function type() {
  if (charIndex < words[wordIndex].length) {
    typing.textContent += words[wordIndex][charIndex];
    charIndex++;
    setTimeout(type, 70);
  } else {
    setTimeout(erase, 1400);
  }
}

function erase() {
  if (charIndex > 0) {
    typing.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 40);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 300);
  }
}
type();

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
const count = 600;
const positions = [];

for (let i = 0; i < count * 3; i++) {
  positions.push((Math.random() - 0.5) * 200);
}

geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0x6c7cff,
  size: 0.45
});

const points = new THREE.Points(geometry, material);
scene.add(points);

function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.0002;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
