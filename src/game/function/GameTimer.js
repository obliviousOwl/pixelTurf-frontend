export default class GameTimer {
    constructor(scene, socket) {
        this.scene = scene;
        this.socket = socket;
        this.timerText = null;

        this.setupListers();
    }

    setupListers() {
        this.socket.on("timerUpdate", ({time}) => {
            // console.log(`⏳ Time Remaining: ${time}s`);

            if(!this.timerText) {
                this.timerText = this.scene.add.text(400, 50, `Time: ${time}s`, {
                    fontSize: "24px",
                    fill: "#fff"
                }).setOrigin(0.5);
            }
            else{
                this.timerText.setText(`Time: ${time}s`);
            }
        })

        this.socket.on("gameOver", ({ room }) => {
            console.log(`🏁 Game Over in room ${room}`);


        })
    }
}
