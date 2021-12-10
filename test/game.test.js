import {Game} from "../src/game";
import {Paddle} from "../src/paddle";

jest.mock('../src/paddle')


describe('creating the game', () => {
    const canvasId = 'gameCanvas'
    const someContext = {}
    const mockGetContext = jest.fn(() => someContext)
    const mockAddEventListener = jest.fn()
    const mockGetElementById = jest.fn(() => {
        return {clientWidth: 400, clientHeight: 200, getContext: mockGetContext, addEventListener: mockAddEventListener}
    })

    beforeAll(() => {
        document.getElementById = mockGetElementById
    })

    it('creates a paddle with canvas width and height', () => {
        new Game(canvasId)

        expect(mockGetElementById.mock.calls[0][0]).toEqual(canvasId)
        expect(Paddle).toHaveBeenCalledWith({width: 400, height: 200})
    });

    it('keeps the 2d canvas context', () => {
        const game = new Game(canvasId)

        expect(mockGetContext.mock.calls[0][0]).toEqual('2d')
        expect(game.context).toBe(someContext)
    });

    it('registers for mouse moves', () => {
        const paddleMove = jest.fn()
        Paddle.mockImplementation(() => {
            return {move: paddleMove}
        })

        new Game(canvasId)

        expect(mockAddEventListener).toHaveBeenCalledWith('mousemove', expect.anything())
        const mouseMove = mockAddEventListener.mock.calls[0][1]

        mouseMove({offsetX: 100})

        expect(paddleMove).toHaveBeenCalledWith(100)

    });
});
