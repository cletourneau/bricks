import {Game} from "../src/game";
import {Paddle} from "../src/paddle";

jest.mock('../src/paddle')


describe('creating the game', () => {
    const elementIds = {
        canvas: "gameCanvas",
        paddle: "paddle"
    }
    const someContext = {}
    const mockGetContext = jest.fn(() => someContext)
    const mockAddEventListener = jest.fn()
    const mockGetElementById = jest.fn(() => {
        return {clientWidth: 400, clientHeight: 200, getContext: mockGetContext, addEventListener: mockAddEventListener}
    })

    beforeAll(() => {
        document.getElementById = mockGetElementById
    })

    it('creates a paddle with element id and canvas size', () => {
        new Game(elementIds)

        expect(mockGetElementById.mock.calls[0][0]).toEqual(elementIds.canvas)
        expect(Paddle).toHaveBeenCalledWith(elementIds.paddle, {width: 400, height: 200})
    });

    it('keeps the 2d canvas context', () => {
        const game = new Game(elementIds)

        expect(mockGetContext.mock.calls[0][0]).toEqual('2d')
        expect(game.context).toBe(someContext)
    });

    it('registers for mouse moves', () => {
        const paddleMove = jest.fn()
        Paddle.mockImplementation(() => {
            return {move: paddleMove}
        })

        new Game(elementIds)

        expect(mockAddEventListener).toHaveBeenCalledWith('mousemove', expect.anything())
        const mouseMove = mockAddEventListener.mock.calls[0][1]

        mouseMove({offsetX: 100})

        expect(paddleMove).toHaveBeenCalledWith(100)

    });
});
