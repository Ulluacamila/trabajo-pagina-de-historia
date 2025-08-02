
const observador = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".img-historia").forEach(el => {
  observador.observe(el);
});

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const showTime = document.getElementById("showTime");

playBtn.addEventListener("click", () => {
  video.play();
});

pauseBtn.addEventListener("click", () => {
  video.pause();
});

video.addEventListener("timeupdate", () => {
  let minutes = Math.floor(video.currentTime / 60);
  let seconds = Math.floor(video.currentTime % 60);
  showTime.textContent = `Tiempo actual: ${minutes}:${seconds.toString().padStart(2, "0")}`;
});

let contador = 0;
let imagenArrastrada = null;

function iniciar() {
  const piezas = document.querySelectorAll(".imagenes");
  const zonas = [
    document.getElementById("cajasoltar"),
    document.getElementById("cajasoltar2"),
    document.getElementById("cajasoltar3"),
  ];

  piezas.forEach((pieza) => {
    pieza.addEventListener("dragstart", (e) => {
      imagenArrastrada = e.target;
      e.dataTransfer.setData("text/plain", e.target.id);
    });
  });

  zonas.forEach((zona) => {
    zona.addEventListener("dragover", (e) => e.preventDefault());
    zona.addEventListener("drop", soltarPieza);
  });
}

function soltarPieza(e) {
  e.preventDefault();
  if (!imagenArrastrada) return;

 
  if (e.target.tagName === "IMG" || e.target.querySelector("img")) return;

  const destino =
    e.target.classList.contains("caja") ? e.target : e.target.closest(".caja");

  const nuevaImagen = document.createElement("img");
  nuevaImagen.src = imagenArrastrada.src;
  nuevaImagen.style.width = "100%";
  nuevaImagen.style.height = "100%";
  nuevaImagen.draggable = false;

  destino.innerHTML = ""; 
  destino.appendChild(nuevaImagen);
  imagenArrastrada.style.display = "none";
  contador++;

  if (contador === 3) {
    verificarPuzzle();
  }
}

function verificarPuzzle() {
  const caja1 = document.querySelector("#cajasoltar img");
  const caja2 = document.querySelector("#cajasoltar2 img");
  const caja3 = document.querySelector("#cajasoltar3 img");

  const correcto =
    caja1?.src.includes("Rompe1.png") &&
    caja2?.src.includes("rompe2.png") &&
    caja3?.src.includes("Rompe3.png");

  const mensaje = document.querySelector(".espacio-titulo");
  const cajas = document.querySelectorAll(".caja");

  document.querySelector(".cajas").style.transform = "scale(1.5)";
  cajas.forEach((caja) => (caja.style.border = "0"));

  if (correcto) {
    setTimeout(() => {
      document.querySelector(".cajas").style.opacity = "0";
      mensaje.innerHTML = "¡Felicitaciones!<br>Rompecabezas resuelto 🎉";
      mensaje.style.animation = "feliz 2s forwards";
    }, 2000);
  } else {
    setTimeout(() => {
      mensaje.innerHTML =
        "Lo sentimos 😢<br>Prueba otra vez <img width=50px src='./assets/icons/icons8-double-down-80.png'>";
      mensaje.style =
        "animation:feliz 2s forwards; z-index:3;position:relative;color:white; text-shadow: 2px 2px #808080, 6px 6px black";
      document.querySelector(".cajas").style.backgroundColor = "#000";
    }, 2000);
  }
}

function reinicio() {
  window.location.reload();
}

window.addEventListener("load", iniciar);
