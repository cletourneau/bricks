import {Paddle} from "./paddle";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
        this.paddle = new Paddle({x: this.width / 2, y: this.height - 10});
        this.listenForMouseMovement();
    }

    update(delta) {
        this.context.clearRect(0, 0, this.width, this.height);
        this.paddle.update(this.context);
    }

    listenForMouseMovement() {
        this.canvas.addEventListener('mousemove', e => {
            this.paddle.position.x = e.offsetX;
        })
    }
}