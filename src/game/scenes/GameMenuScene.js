import Phaser from "phaser";

class GameMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameMenuScene" });
  }

  preload() {
    // Load any assets needed for the menu
  }

  create() {
    this.add.text(300, 250, "Click to Play", { fontSize: "24px", fill: "#ffff" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("LoadingScene");
      });

  }
}

export default GameMenuScene;
