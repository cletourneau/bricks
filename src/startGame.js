import {Game} from "./game";


export function start() {
    let canvas = document.getElementById("gameCanvas")
    let game = new Game(canvas)

    let latestAnimate = performance.now()

    function animate(timestamp) {
        let delta = timestamp - latestAnimate
        game.update(delta)

        latestAnimate = timestamp
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}