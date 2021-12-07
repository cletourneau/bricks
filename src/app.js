import {Game} from "./game";

let canvas = document.getElementById("gameCanvas");
let game = new Game(canvas);

let latestAnimate = 0;
function animate(timestamp) {
    let delta = timestamp - latestAnimate;
    game.update(delta);

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate)