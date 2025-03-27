export default class ScoreManager {
    constructor(scene) {
        this.scene = scene;
        this.score = {};
        this.scoreTexts = {}
    }

    initializeScore(playerId, x, y){
        this.score[playerId] = 0;

        this.scoreTexts[playerId] = this.scene.add.text(x, y - 30, "Score: 0", {
            fontSize: "14px",
            fill: "#fff",
        }).setOrigin(0.5);
    }

    updateScore(scores) {
        // console.log("📊 Score Update Received:", scores);

        Object.keys(scores).forEach((playerId) => {
            if (this.scoreTexts[playerId]) {
                this.scoreTexts[playerId].setText(`Score: ${scores[playerId]}`);
            }
        });
    }
}
