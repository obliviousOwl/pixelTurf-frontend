export default class ScoreManager {
    constructor(scene) {
        this.scene = scene;
        this.score = {};
        this.scoreTexts = {};
        this.playerNames = {};
    }

    initializeScore(playerId, playerName, x, y) {
        this.score[playerId] = 0;
        this.playerNames[playerId] = playerName;

        this.scoreTexts[playerId] = this.scene.add.text(x, y - 30, `${playerName}: 0`, {
            fontSize: "14px",
            fill: "#fff",
        }).setOrigin(0.5);
    }

    getScores() {
        return this.score;
    }

    updateScore(scores) {
        Object.keys(scores).forEach((playerId) => {
            if (this.scoreTexts[playerId]) {
                const playerName = this.playerNames[playerId] || `Player ${playerId}`;
                this.scoreTexts[playerId].setText(`${playerName}: ${scores[playerId]}`);
            } else {
                // console.warn(`⚠️ Missing score text for Player ID: ${playerId}`);
            }
        });
    }
}
