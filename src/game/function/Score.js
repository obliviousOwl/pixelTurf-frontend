export default class ScoreManager {
    constructor(scene) {
        this.scene = scene;
        this.score = {};
        this.scoreTexts = {};
        this.playerNames = {};
    }

    initializeScore(playerId, playerName, x, y){
        this.score[playerId] = 0;
        this.playerNames[playerId] = playerName;

        this.scoreTexts[playerId] = this.scene.add.text(
            x, y - 30, `${playerName}: Score 0`, // ✅ Include the player's name
            {
                fontSize: "14px",
                fill: "#fff",
            }
        ).setOrigin
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
