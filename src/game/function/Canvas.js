export default class Canvas {
    constructor(scene, width, height) {
        this.scene = scene;

        this.paintTexture = scene.add.renderTexture(0, 0, width, height)
            .setOrigin(0,0)
            .setDepth(-1)
            .setScrollFactor(0);

        this.paintTexture.fill(0x333333, 1);

        this.paintBrush = scene.add.graphics();
    }

    paint(x,y) {
        this.paintBrush.clear();
        this.paintBrush.fillStyle(0xffff00, 0.5);
        this.paintBrush.fillCircle(-5, -5, 20);
        this.paintTexture.draw(this.paintBrush, x, y);
    }
}
