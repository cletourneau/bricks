import {Game} from "./game";


export function start() {
    let game = new Game({canvas: "gameCanvas", paddle: "paddle"})

    let latestAnimate = performance.now()

    function animate(timestamp) {
        let delta = timestamp - latestAnimate
        game.update(delta)
        game.redraw()

        latestAnimate = timestamp
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}