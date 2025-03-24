import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameOverScene"});
    }

    create() {

        const width = this.cameras.main.width / 2;
        const height = this.cameras.main.height / 2;
        this.add.text(width, height, "Game Over", { fontSize: "24px", fill: '#ffff'})
            .setOrigin(0.5);
        this.add.text(width, height+20,"Play Again", { fontSize: "24px", fill: '#ffff'})
            .setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("GameMenuScene");
            })
    }


}
