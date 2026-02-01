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

/* HERO STAGGER */
gsap.from(".hero-content > *", {
  opacity: 0,
  y: 60,
  duration: 1,
  stagger: 0.2,
  delay: 1.2,
  ease: "power3.out"
});

/* SCROLL ANIMATIONS */
gsap.utils.toArray(".section").forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 120,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    }
  });
});

/* PARALLAX BACKGROUND */
gsap.to(".hero-bg", {
  y: 200,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

/* MOUSE PARALLAX */
document.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero-content");
  const x = (window.innerWidth / 2 - e.pageX) / 40;
  const y = (window.innerHeight / 2 - e.pageY) / 40;
  hero.style.transform = `translate(${x}px, ${y}px)`;
});

/* 3D TILT CARDS */
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 15;
    const rotateY = ((x / rect.width) - 0.5) * -15;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
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

/* MOBILE SAFETY */
if (window.innerWidth < 768) {
  ScrollTrigger.killAll();
}
