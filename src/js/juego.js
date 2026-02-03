const lienzo = document.getElementById("pongCanvas");
const contexto = lienzo.getContext("2d");

const ANCHO_PALETA = 10;
const ALTO_PALETA = 80;
let paletaIzquierdaY = (lienzo.height - ALTO_PALETA) / 2;
let paletaDerechaY = (lienzo.height - ALTO_PALETA) / 2;
const VELOCIDAD_PALETA = 8;

let pelotaX = lienzo.width / 2;
let pelotaY = lienzo.height / 2;
let tamanoPelota = 13;

const VELOCIDAD_INICIAL = 3;
const VELOCIDAD_MAXIMA = 4.5;
const INCREMENTO_VELOCIDAD = 0.15;

let velocidadPelotaX = VELOCIDAD_INICIAL;
let velocidadPelotaY = VELOCIDAD_INICIAL;

let puntuacionIzquierda = 0;
let puntuacionDerecha = 0;

const PUNTOS_PARA_GANAR = 10;
let juegoTerminado = false;
let ganador = null;

let juegoIniciado = false;
let cuentaAtras = 0;

const teclas = {};
window.addEventListener("keydown", (e) => (teclas[e.key] = true));
window.addEventListener("keyup", (e) => (teclas[e.key] = false));

function reiniciarPelota() {
  pelotaX = lienzo.width / 2;
  pelotaY = lienzo.height / 2;
  const direccion = velocidadPelotaX > 0 ? -1 : 1;
  velocidadPelotaX = VELOCIDAD_INICIAL * direccion;
  velocidadPelotaY = VELOCIDAD_INICIAL * (velocidadPelotaY > 0 ? 1 : -1);
}

function aumentarVelocidad() {
  const velocidadActual = Math.abs(velocidadPelotaX);
  if (velocidadActual < VELOCIDAD_MAXIMA) {
    const signoX = velocidadPelotaX > 0 ? 1 : -1;
    const signoY = velocidadPelotaY > 0 ? 1 : -1;
    const nuevaVelocidad = Math.min(velocidadActual + INCREMENTO_VELOCIDAD, VELOCIDAD_MAXIMA);
    velocidadPelotaX = nuevaVelocidad * signoX;
    velocidadPelotaY = nuevaVelocidad * signoY;
  }
}

function actualizar() {
  if (!juegoIniciado) return;

  if (teclas["w"] && paletaIzquierdaY > 0) paletaIzquierdaY -= VELOCIDAD_PALETA;
  if (teclas["s"] && paletaIzquierdaY < lienzo.height - ALTO_PALETA)
    paletaIzquierdaY += VELOCIDAD_PALETA;

  if (teclas["ArrowUp"] && paletaDerechaY > 0) paletaDerechaY -= VELOCIDAD_PALETA;
  if (teclas["ArrowDown"] && paletaDerechaY < lienzo.height - ALTO_PALETA)
    paletaDerechaY += VELOCIDAD_PALETA;

  pelotaX += velocidadPelotaX;
  pelotaY += velocidadPelotaY;

  if (pelotaY <= 0 || pelotaY + tamanoPelota >= lienzo.height) {
    velocidadPelotaY = -velocidadPelotaY;
  }

  if (
    pelotaX <= ANCHO_PALETA &&
    pelotaY > paletaIzquierdaY &&
    pelotaY < paletaIzquierdaY + ALTO_PALETA
  ) {
    velocidadPelotaX = -velocidadPelotaX;
    aumentarVelocidad();
  }

  if (
    pelotaX >= lienzo.width - ANCHO_PALETA - tamanoPelota &&
    pelotaY > paletaDerechaY &&
    pelotaY < paletaDerechaY + ALTO_PALETA
  ) {
    velocidadPelotaX = -velocidadPelotaX;
    aumentarVelocidad();
  }

  if (pelotaX < 0) {
    puntuacionDerecha++;
    if (puntuacionDerecha >= PUNTOS_PARA_GANAR) {
      juegoTerminado = true;
      juegoIniciado = false;
      ganador = "Jugador 2";
    } else {
      reiniciarPelota();
    }
  } else if (pelotaX > lienzo.width) {
    puntuacionIzquierda++;
    if (puntuacionIzquierda >= PUNTOS_PARA_GANAR) {
      juegoTerminado = true;
      juegoIniciado = false;
      ganador = "Jugador 1";
    } else {
      reiniciarPelota();
    }
  }
}

function dibujarPantallaInicio() {
  contexto.fillStyle = "#000";
  contexto.fillRect(0, 0, lienzo.width, lienzo.height);

  contexto.fillStyle = "#fff";
  contexto.font = "bold 40px Inter Tight, sans-serif";
  contexto.textAlign = "center";
  contexto.fillText("PONG", lienzo.width / 2, lienzo.height / 2 - 40);

  contexto.font = "18px Inter Tight, sans-serif";
  contexto.fillText("Jugador 1: W / S", lienzo.width / 2, lienzo.height / 2 + 20);
  contexto.fillText("Jugador 2: ↑ / ↓", lienzo.width / 2, lienzo.height / 2 + 50);
}

function dibujar() {
  contexto.fillStyle = "#000";
  contexto.fillRect(0, 0, lienzo.width, lienzo.height);

  contexto.strokeStyle = "#fff";
  contexto.setLineDash([10, 10]);
  contexto.beginPath();
  contexto.moveTo(lienzo.width / 2, 0);
  contexto.lineTo(lienzo.width / 2, lienzo.height);
  contexto.stroke();

  contexto.fillStyle = "#fff";
  contexto.fillRect(0, paletaIzquierdaY, ANCHO_PALETA, ALTO_PALETA);
  contexto.fillRect(
    lienzo.width - ANCHO_PALETA,
    paletaDerechaY,
    ANCHO_PALETA,
    ALTO_PALETA,
  );

  contexto.fillRect(pelotaX, pelotaY, tamanoPelota, tamanoPelota);

  contexto.font = "30px Courier New";
  contexto.textAlign = "center";
  contexto.fillText(puntuacionIzquierda, lienzo.width / 4, 50);
  contexto.fillText(puntuacionDerecha, (lienzo.width / 4) * 3, 50);
}

function dibujarCuentaAtras() {
  contexto.fillStyle = "#000";
  contexto.fillRect(0, 0, lienzo.width, lienzo.height);

  contexto.fillStyle = "#fff";
  contexto.font = "bold 80px Inter Tight, sans-serif";
  contexto.textAlign = "center";
  contexto.fillText(cuentaAtras, lienzo.width / 2, lienzo.height / 2 + 20);

  contexto.font = "18px Inter Tight, sans-serif";
  contexto.fillText("¡Prepárate!", lienzo.width / 2, lienzo.height / 2 + 70);
}

function dibujarPantallaVictoria() {
  contexto.fillStyle = "#000";
  contexto.fillRect(0, 0, lienzo.width, lienzo.height);

  contexto.fillStyle = "#fff";
  contexto.font = "bold 40px Inter Tight, sans-serif";
  contexto.textAlign = "center";
  contexto.fillText("¡" + ganador + " gana!", lienzo.width / 2, lienzo.height / 2 - 30);

  contexto.font = "30px Courier New";
  contexto.fillText(puntuacionIzquierda + " - " + puntuacionDerecha, lienzo.width / 2, lienzo.height / 2 + 20);

  contexto.font = "18px Inter Tight, sans-serif";
  contexto.fillText("Pulsa el botón para volver a jugar", lienzo.width / 2, lienzo.height / 2 + 70);
}

function buclePrincipal() {
  if (juegoTerminado) {
    dibujarPantallaVictoria();
  } else if (juegoIniciado) {
    actualizar();
    dibujar();
  } else if (cuentaAtras > 0) {
    dibujarCuentaAtras();
  } else {
    dibujarPantallaInicio();
  }
  requestAnimationFrame(buclePrincipal);
}

function iniciarJuego() {
  const btnIniciar = document.getElementById("btnIniciarJuego");
  if (btnIniciar) {
    btnIniciar.style.display = "none";
  }

  if (juegoTerminado) {
    puntuacionIzquierda = 0;
    puntuacionDerecha = 0;
    juegoTerminado = false;
    ganador = null;
    reiniciarPelota();
    paletaIzquierdaY = (lienzo.height - ALTO_PALETA) / 2;
    paletaDerechaY = (lienzo.height - ALTO_PALETA) / 2;
  }

  cuentaAtras = 3;
  const intervalo = setInterval(() => {
    cuentaAtras--;
    if (cuentaAtras <= 0) {
      clearInterval(intervalo);
      juegoIniciado = true;
    }
  }, 1000);
}

buclePrincipal();
