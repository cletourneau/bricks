import {Paddle} from "../src/paddle";

const canvasSize = {width: 1000, height: 500}
const paddleImage = {naturalWidth: 50, naturalHeight: 20}

describe('the paddle', function () {
    const mockGetElementById = jest.fn(() => {
        return paddleImage
    })

    beforeAll(function () {
        document.getElementById = mockGetElementById
    })

    it('is positioned at the bottom center of the canvas', function () {
        const paddle = new Paddle('paddle', canvasSize)

        expect(paddle.centerPosition).toEqual({x: 500, y: 480})
    });
});