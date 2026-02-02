const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10,
  paddleHeight = 80;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 8;

let ballX = canvas.width / 2,
  ballY = canvas.height / 2;
let ballSize = 13;

const VELOCIDAD_INICIAL = 3;
const VELOCIDAD_MAXIMA = 4.5;
const INCREMENTO_VELOCIDAD = 0.15;

let ballSpeedX = VELOCIDAD_INICIAL,
  ballSpeedY = VELOCIDAD_INICIAL;

let scoreLeft = 0,
  scoreRight = 0;

let juegoIniciado = false;
let cuentaAtras = 0;

const keys = {};
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  const direccion = ballSpeedX > 0 ? -1 : 1;
  ballSpeedX = VELOCIDAD_INICIAL * direccion;
  ballSpeedY = VELOCIDAD_INICIAL * (ballSpeedY > 0 ? 1 : -1);
}

function aumentarVelocidad() {
  const velocidadActual = Math.abs(ballSpeedX);
  if (velocidadActual < VELOCIDAD_MAXIMA) {
    const signoX = ballSpeedX > 0 ? 1 : -1;
    const signoY = ballSpeedY > 0 ? 1 : -1;
    const nuevaVelocidad = Math.min(velocidadActual + INCREMENTO_VELOCIDAD, VELOCIDAD_MAXIMA);
    ballSpeedX = nuevaVelocidad * signoX;
    ballSpeedY = nuevaVelocidad * signoY;
  }
}

function update() {
  if (!juegoIniciado) return;

  if (keys["w"] && leftPaddleY > 0) leftPaddleY -= paddleSpeed;
  if (keys["s"] && leftPaddleY < canvas.height - paddleHeight)
    leftPaddleY += paddleSpeed;

  if (keys["ArrowUp"] && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
  if (keys["ArrowDown"] && rightPaddleY < canvas.height - paddleHeight)
    rightPaddleY += paddleSpeed;

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (
    ballX <= paddleWidth &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    aumentarVelocidad();
  }

  if (
    ballX >= canvas.width - paddleWidth - ballSize &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    aumentarVelocidad();
  }

  if (ballX < 0) {
    scoreRight++;
    resetBall();
  } else if (ballX > canvas.width) {
    scoreLeft++;
    resetBall();
  }
}

function drawStartScreen() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 40px Inter Tight, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("PONG", canvas.width / 2, canvas.height / 2 - 40);

  ctx.font = "18px Inter Tight, sans-serif";
  ctx.fillText("Jugador 1: W / S", canvas.width / 2, canvas.height / 2 + 20);
  ctx.fillText("Jugador 2: ↑ / ↓", canvas.width / 2, canvas.height / 2 + 50);
}

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#fff";
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillRect(
    canvas.width - paddleWidth,
    rightPaddleY,
    paddleWidth,
    paddleHeight,
  );

  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  ctx.font = "30px Courier New";
  ctx.textAlign = "center";
  ctx.fillText(scoreLeft, canvas.width / 4, 50);
  ctx.fillText(scoreRight, (canvas.width / 4) * 3, 50);
}

function drawCountdown() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 80px Inter Tight, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(cuentaAtras, canvas.width / 2, canvas.height / 2 + 20);

  ctx.font = "18px Inter Tight, sans-serif";
  ctx.fillText("¡Prepárate!", canvas.width / 2, canvas.height / 2 + 70);
}

function gameLoop() {
  if (juegoIniciado) {
    update();
    draw();
  } else if (cuentaAtras > 0) {
    drawCountdown();
  } else {
    drawStartScreen();
  }
  requestAnimationFrame(gameLoop);
}

function iniciarJuego() {
  const btnIniciar = document.getElementById("btnIniciarJuego");
  if (btnIniciar) {
    btnIniciar.style.display = "none";
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

gameLoop();


