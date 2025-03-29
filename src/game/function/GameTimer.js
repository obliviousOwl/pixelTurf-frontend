export default class GameTimer {
    constructor(scene, socket) {
        this.scene = scene;
        this.socket = socket;
        this.timerText = null;

        this.setupListeners();
        this.handleResize({ width: this.scene.scale.width });
        this.scene.scale.on("resize", this.handleResize, this);
    }

    setupListeners() {
        this.socket.on("timerUpdate", ({ time }) => {
            if (!this.timerText) {
                this.timerText = this.scene.add.text(this.scene.scale.width / 2, 50, `Time: ${time}s`, {
                    fontSize: "24px",
                    fill: "#fff"
                }).setOrigin(0.5);
            } else {
                this.timerText.setText(`Time: ${time}s`);
            }
        });

        this.socket.on("gameOver", ({ room }) => {
            console.log(`🏁 Game Over`);
        });
    }

    handleResize(gameSize) {
        if (this.timerText) {
            this.timerText.setPosition(gameSize.width / 2, 50);
        }
    }
}
