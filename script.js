document.addEventListener("DOMContentLoaded", function () {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]',
  );

  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl),
  );

  const instagram = document.querySelector(
    '[data-bs-custom-class="tooltip-instagram"]',
  );
  const tooltipInstagram = new bootstrap.Tooltip(instagram);

  const twitter = document.querySelector(
    '[data-bs-custom-class="tooltip-twitter"]',
  );
  const tooltipTwitter = new bootstrap.Tooltip(twitter);

  const tiktok = document.querySelector(
    '[data-bs-custom-class="tooltip-tiktok"]',
  );
  const tooltipTiktok = new bootstrap.Tooltip(tiktok);
});

const codigoEscrito = [];

document.addEventListener("keydown", function (e) {
  const codigoKonami = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  console.log(e.key);
  codigoEscrito.push(e.key);

  console.log(codigoEscrito);

  if (codigoEscrito.length > 10) {
    codigoEscrito.shift();
  }

  if (JSON.stringify(codigoKonami) === JSON.stringify(codigoEscrito)) {
    const enSubcarpeta =
      window.location.pathname.includes("Webs Secundarias") ||
      window.location.pathname.includes("Webs%20Secundarias");
    const ruta = enSubcarpeta
      ? "secreto.html"
      : "Webs Secundarias/secreto.html";
    window.location.href = ruta;
  }
});

const cursor = document.getElementById("custom-cursor");
const targets = document.querySelectorAll("button, a, .interactable");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

targets.forEach((t) => {
  t.addEventListener("mouseenter", () =>
    document.body.classList.add("hovering"),
  );
  t.addEventListener("mouseleave", () =>
    document.body.classList.remove("hovering"),
  );
});

function toggleOffcanvas() {
  const offcanvas = document.getElementById("mainOffcanvas");
  const backdrop = document.getElementById("offcanvasBackdrop");

  offcanvas.classList.toggle("show");
  backdrop.classList.toggle("show");

  document.body.style.overflow = offcanvas.classList.contains("show")
    ? "hidden"
    : "";
}
