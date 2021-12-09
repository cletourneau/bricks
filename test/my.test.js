console.log('mocking')
// delete window.requestAnimationFrame
window.requestAnimationFrame = jest.fn()

console.log('importing')
require('../src/app')

// import {Game} from "../src/game";
//
// jest.mock('../src/game')

test('Starting the application', () => {

    console.log('expecting')
    expect(window.requestAnimationFrame).toHaveBeenCalled()
    // const game = new Game({})
    // expect(Game).toHaveBeenCalledTimes(1);
});
