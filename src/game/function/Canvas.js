export default class Canvas {
    constructor(scene, width, height) {
        this.scene = scene;
        this.paintedAreas = new Map(); // ✅ Ensure painted areas are tracked

        this.paintTexture = scene.add.renderTexture(0, 0, width, height)
            .setOrigin(0, 0)
            .setDepth(-1)
            .setScrollFactor(0);

        this.paintTexture.fill(0x333333, 1);
        this.paintBrush = scene.add.graphics();
    }

    paint(x, y, player) {
        const key = `${Math.floor(x)}, ${Math.floor(y)}`;


        this.paintedAreas.set(key, player.id); // ✅ Track painted pixels

        // console.log(player.color);
        // ✅ Get correct player color from the scene's players list
        if (!player || !player.color) return;

        const color = player.color ?? 0xffff00; // Default to yellow if undefined

        this.paintBrush.clear();
        this.paintBrush.fillStyle(color, 0.5);
        this.paintBrush.fillCircle(0, 0, 20);  // ✅ Adjusted positioning
        this.paintTexture.draw(this.paintBrush, x, y);

    }
}
