import {Game} from "../src/game"
import {Paddle} from "../src/paddle"

jest.mock('../src/paddle')

describe('the game', () => {
    const elementIds = {
        canvas: "gameCanvas",
        paddle: "paddle"
    }

    describe('when created', () => {
        const mockAddEventListener = jest.fn()
        const mockGetElementById = jest.fn(() => {
            return {clientWidth: 400, clientHeight: 200, getContext: jest.fn(), addEventListener: mockAddEventListener}
        })

        beforeAll(() => {
            document.getElementById = mockGetElementById
        })

        it('creates a paddle with element id and canvas size', () => {
            new Game(elementIds)

            expect(mockGetElementById.mock.calls[0][0]).toEqual(elementIds.canvas)
            expect(Paddle).toHaveBeenCalledWith(elementIds.paddle, {width: 400, height: 200})
        })

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

        })
    })

    describe('when updated', () => {
        it('updates the paddle', () => {
            const paddleUpdate = jest.fn()
            Paddle.mockImplementation(() => {
                return {update: paddleUpdate}
            })

            new Game(elementIds).update(33)
            expect(paddleUpdate).toHaveBeenCalledWith(33)
        })
    })

    describe('when redrawed', () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const paddleRedraw = jest.fn()

        beforeAll(() => {
            document.getElementById = jest.fn(() => {
                return canvas
            })

            Paddle.mockImplementation(() => {
                return {redraw: paddleRedraw}
            })
        })

        it('clears the game canvas', () => {
            const game = new Game(elementIds)
            forceCanvasSize(game, {width: 800, height: 600})
            game.redraw()

            const events = context.__getEvents()
            expect(events).toMatchSnapshot()
        });

        it('redraws the paddle with the canvas context', () => {
            new Game(elementIds).redraw()
            expect(paddleRedraw).toHaveBeenCalledWith(context)
        })

        function forceCanvasSize(game, size) {
            game.canvasSize = size
        }
    })
})

