
// Menú responsive
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Formulario
document.getElementById("formContacto").addEventListener("submit", function(e){
  e.preventDefault();
  alert("¡Gracias por tu mensaje! Nos pondremos en contacto pronto.");
  this.reset();
});
// Animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));


// FAQ con acordeón
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + "px";
  });
});

// Botón volver arriba
const btnArriba = document.getElementById("btnArriba");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btnArriba.style.display = "block";
  } else {
    btnArriba.style.display = "none";
  }
});
btnArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animaciones en cascada para autos
const cars = document.querySelectorAll(".car");
cars.forEach(car => observer.observe(car));


// Contadores animados
const counters = document.querySelectorAll(".counter");
let statsPlayed = false;

function animateCounters() {
  counters.forEach(counter => {
    counter.innerText = "0";
    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText;
      const increment = Math.ceil(target / 100); // velocidad

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCounter, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
}

// Usamos el observer ya existente para disparar la animación
const statsSection = document.querySelector(".stats");
observer.observe(statsSection);

observer.observe(statsSection);
statsSection.addEventListener("transitionend", () => {
  if (!statsPlayed && statsSection.classList.contains("show")) {
    animateCounters();
    statsPlayed = true;
  }
});

