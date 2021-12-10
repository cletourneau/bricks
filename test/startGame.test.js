import {start} from '../src/startGame'
import {Game} from "../src/game";

jest.mock('../src/game')
window.requestAnimationFrame = jest.fn()

const startTime = 10
performance.now = jest.fn(() => {
    return startTime
})

beforeEach(() => {
    document.body.innerHTML = "<canvas id='gameCanvas'>"
})

test('creates the game with the canvas element', () => {
    start();
    expect(Game).toHaveBeenCalledTimes(1);

  expect(Game.mock.calls[0][0]).not.toBeNull()
    // expect(canvas) to have some attributes that we can relate
});

test('requests the animation frame', () => {
    start();
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)
})


test('each animation frame updates the game with a delta time from the start', () => {
    let gameUpdate = jest.fn()
    Game.mockImplementation(() => {
        return {update: gameUpdate}
    })


    start();
    const animate = window.requestAnimationFrame.mock.calls[0][0]

    function expectAnimateUpdatesGame(frameTiming) {
        animate(frameTiming.timestamp)
        expect(gameUpdate).toHaveBeenLastCalledWith(frameTiming.delta)
    }

    let frames = [
        {timestamp: 17, delta: 17 - startTime},
        {timestamp: 26, delta: 26 - 17},
        {timestamp: 37, delta: 37 - 26},
        {timestamp: 56, delta: 56 - 37},
        {timestamp: 88, delta: 88 - 56}
    ]
    frames.forEach(expectAnimateUpdatesGame)
    expect(gameUpdate).toHaveBeenCalledTimes(5)
})
