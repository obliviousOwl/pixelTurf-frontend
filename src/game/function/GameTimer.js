export default class GameTimer {
    constructor(scene, duration = 60){
        this.scene = scene;
        this.duration = duration;
        this.timeLeft = duration;
        this.timerText = null;
    }

    start() {
        this.timerText = this.scene.add.text(20,20,`Time: ${this.timeLeft}`,{
            fontSize: "24px",
            fill: "#fff",
        });

        this.scene.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    updateTimer() {
        this.timeLeft--;

        this.timerText.setText(`Time: ${this.timeLeft}`);

        if(this.timeLeft <= 0) {
            this.scene.scene.start("GameOverScene");
        }
    }
}
