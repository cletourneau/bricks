export const BOTTOM_MARGIN = 10

export class Paddle {
    constructor(elementId, canvasSize) {
        this.image = document.getElementById(elementId);
        // this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight;
        this.centerPosition = this.startingPosition(canvasSize);
    }

    // update(context) {
    //     context.drawImage(
    //         this.image,
    //         this.centerPosition.x - this.width / 2,
    //         this.centerPosition.y - this.height / 2,
    //         this.width,
    //         this.height
    //     );
    // }

    startingPosition(canvasSize) {
        return {x: canvasSize.width / 2, y: canvasSize.height - BOTTOM_MARGIN - (this.height / 2)};
    }

    // move(newXPosition) {
    //     this.centerPosition.x = newXPosition
    // }
}