import {Game} from "./game";


export function start() {
    let game = new Game("gameCanvas")

    let latestAnimate = performance.now()

    function animate(timestamp) {
        let delta = timestamp - latestAnimate
        game.update(delta)

        latestAnimate = timestamp
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}