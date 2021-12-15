import {Paddle} from "./paddle";

export class Game {
    constructor(elementIds) {
        const canvas = document.getElementById(elementIds.canvas)
        this.context = canvas.getContext('2d')
        this.canvasSize = {width: canvas.clientWidth, height: canvas.clientHeight}
        this.paddle = new Paddle(elementIds.paddle, this.canvasSize);
        this.listenForMouseMovement(canvas);
    }

    listenForMouseMovement(canvas) {
        canvas.addEventListener('mousemove', e => {
            this.paddle.move(e.offsetX)
        })
    }

    update(delta) {
        this.paddle.update(delta)
    }

    redraw() {
        this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        this.paddle.redraw(this.context)
    }
}