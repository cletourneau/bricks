export class Paddle {
    constructor(startingPosition) {
        this.position = startingPosition;
        this.image = document.getElementById("paddle");
        this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight;
    }

    update(context) {
        context.drawImage(
            this.image,
            this.position.x - this.width / 2,
            this.position.y - this.height,
            this.width,
            this.height
        );
    }
}