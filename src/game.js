import {Paddle} from "./paddle";

export class Game {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId)
        this.context = canvas.getContext('2d')
        this.canvasSize = {width: canvas.clientWidth, height: canvas.clientHeight}
        this.paddle = new Paddle(this.canvasSize);
        this.listenForMouseMovement(canvas);
    }

    listenForMouseMovement(canvas) {
        canvas.addEventListener('mousemove', e => {
            this.paddle.move(e.offsetX)
        })
    }

    update(delta) {
        // this.context.clearRect(0, 0, this.width, this.height);
        // this.paddle.update(this.context);
    }
}