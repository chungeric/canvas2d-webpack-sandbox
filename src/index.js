import "./styles.scss";
import { drawCircle, drawGrid } from "./utils/draw";

const FPS = 60;
const LOOP = true;

class Canvas {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.setup();
    this.resize();
    this.update();
    this.addListeners();
  }

  /* Set up properties */
  setup = () => {
    this.frame = 1;
    this.fpsInterval = 1000 / FPS;
    this.then = Date.now();
  };

  /* Draw to canvas here using this.ctx */
  draw = () => {
    this.ctx.clearRect(
      0,
      0,
      this.ctx.canvas.clientWidth,
      this.ctx.canvas.clientHeight
    );
    drawGrid(this.ctx, 20, 20, 0.2);
    drawCircle(
      this.ctx,
      this.frame % this.ctx.canvas.clientWidth,
      this.ctx.canvas.clientHeight / 2,
      40
    );
  };

  /* Reset */
  reset = () => {
    this.frame = 0;
    clearTimeout(this.timeout);
    cancelAnimationFrame(this.raf);
    this.update();
  };

  /* Resize */
  resize = () => {
    this.scale = Math.min(2, window.devicePixelRatio);
    // this.width = 400;
    // this.height = 400;
    this.width = Math.min(window.innerWidth - 40, window.innerHeight - 40);
    this.height = Math.min(window.innerWidth - 40, window.innerHeight - 40);
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
    this.canvas.width = Math.floor(this.width * this.scale);
    this.canvas.height = Math.floor(this.height * this.scale);
    this.ctx.scale(this.scale, this.scale);
    this.update();
  };

  /* Add event listeners */
  addListeners = () => {
    window.addEventListener("resize", this.resize);
    window.addEventListener("click", this.reset);
  };

  /* Animate */
  update = () => {
    let now = Date.now();
    let elapsed = now - this.then;
    if (elapsed > this.fpsInterval) {
      this.then = now - (elapsed % this.fpsInterval);
      this.frame++;
      this.draw();
    }
    if (LOOP) {
      requestAnimationFrame(this.update);
    } else {
      this.draw();
    }
  };
}

new Canvas();
