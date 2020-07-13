import { Universe, Cell, init_panic_hook } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";
import { JsUniverse } from "./js-universe";
import { Fps } from "./fps";

init_panic_hook();

const frame = new Fps();
const CELL_SIZE = 5;
const GRID_COLOR = "#cccccc";
const DEAD_COLOR = "#ffffff";
const ALIVE_COLOR = "#000000";

const universe = Universe.new(256, 256);
// const universe = new JsUniverse(64, 64);
const isWasm = universe instanceof Universe;
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById("game-of-life-canvas");
canvas.width = (CELL_SIZE + 1) * width + 1;
canvas.height = (CELL_SIZE + 1) * height + 1;

const ctx = canvas.getContext("2d");

let before = new Date().getTime();
const fps = 15;
const interval = (1000 / fps) | 0;

let altPressed = false;
let shiftPressed = false;
window.addEventListener("keydown", (event) => {
  altPressed = event.altKey;
  shiftPressed = event.shiftKey;
});

window.addEventListener("keyup", (event) => {
  altPressed = event.altKey;
  shiftPressed = event.shiftKey;
});

const randomButton = document.getElementById("random");
randomButton.addEventListener("click", (event) => {
  universe.random_cells(
    (Math.random() * 10 + 1) | 0,
    (Math.random() * 10 + 1) | 0
  );
});
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", (event) => {
  universe.reset_cells();
});

const tickPerFrameRange = document.getElementById("tick_per_frame");
const tickPerFameValue = document.getElementById("tick_per_frame_value");
tickPerFrameRange.value = tickPerFrameRange.min;
let tickPerFrame = tickPerFrameRange.valueAsNumber;
tickPerFameValue.textContent = tickPerFrame;

tickPerFrameRange.addEventListener("change", (event) => {
  tickPerFrame = tickPerFrameRange.valueAsNumber;
  tickPerFameValue.textContent = tickPerFrame;
});

const playPauseButton = document.getElementById("play-pause");

let animationId = null;
const isPause = () => {
  return animationId == null;
};

const play = () => {
  playPauseButton.textContent = "⏸";
  renderLoop();
};

const pause = () => {
  playPauseButton.textContent = "▶";
  cancelAnimationFrame(animationId);
  animationId = null;
};

playPauseButton.addEventListener("click", (event) => {
  if (isPause()) {
    play();
  } else {
    pause();
  }
});

canvas.addEventListener("click", (event) => {
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  if (altPressed) {
    universe.glider_on(row, col);
  } else if (shiftPressed) {
    universe.pulsar_on(row, col);
  } else {
    universe.toggle_cell(row, col);
  }

  drawGrid();
  drawCell();
});

const renderLoop = () => {
  frame.render();
  const current = new Date().getTime();
  const gap = current - before;

  if (gap > interval) {
    before = new Date().getTime() - (gap % interval);
    // ctx.clearRect(0, 0, width, height);
    drawGrid();
    drawCell();
    // drawFrame();

    for (let i = 0; i < tickPerFrame; i++) {
      universe.tick();
    }
  }

  animationId = requestAnimationFrame(renderLoop);
};

// const drawFrame = () => {
//     ctx.fillStyle = "black";
//     ctx.strokeStyle = "white";
//     ctx.font = (height / 5).toFixed(0) + "px Arial";
//     ctx.lineWidth = 2;
//     ctx.strokeText(f + '/' + r, 20, 40);
//     ctx.fillText(f + '/' + r, 20, 40);
//
//     ctx.stroke();
//     ctx.fill();
// }

const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  for (let i = 0; i <= height; i++) {
    ctx.moveTo(0, i * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, i * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
};

const getIndex = (row, col) => {
  return row * width + col;
};

const drawCell = () => {
  let cells;
  if (isWasm) {
    const cellPtr = universe.cells();
    cells = new Uint8Array(memory.buffer, cellPtr, width * height);
  } else {
    cells = universe.cells();
  }

  ctx.beginPath();

  ctx.fillStyle = DEAD_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);
      if (cells[idx] === Cell.Alive) {
        continue;
      }

      ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
      );
    }
  }

  ctx.fillStyle = ALIVE_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);
      if (cells[idx] === Cell.Dead) {
        continue;
      }

      ctx.fillStyle = cells[idx] === 0 ? DEAD_COLOR : ALIVE_COLOR;
      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }
};

play();
