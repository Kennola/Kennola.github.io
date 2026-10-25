// =============================================
// TYPEWRITER — Efeito de digitação no Hero
// =============================================
const words = [
  "Dev Backend Java",
  "Desenvolvedor de Software",
  "Construtor de APIs REST",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const el = document.getElementById("typewriter");

function type() {
  const current = words[wordIndex];

  if (isDeleting) {
    el.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    el.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000; // pausa antes de apagar
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

type();

// =============================================
// HAMBURGER MENU — Menu mobile
// =============================================
const hamburger = document.getElementById("hamburger");
const navLinks  = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Fecha o menu ao clicar em um link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// =============================================
// NAVBAR — Destaca link ativo no scroll
// =============================================
const sections = document.querySelectorAll("section[id]");
const navItems  = document.querySelectorAll(".nav-links a");

function highlightNav() {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.style.color = "";
    if (link.getAttribute("href") === `#${current}`) {
      link.style.color = "var(--accent)";
    }
  });
}

window.addEventListener("scroll", highlightNav);

// =============================================
// ANIMAÇÃO DE ENTRADA — Fade in ao scrollar
// =============================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(
  ".skill-category, .learning-card, .stat-card, .contact-card"
).forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});
