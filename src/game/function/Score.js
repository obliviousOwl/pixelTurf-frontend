export default class ScoreManager {
    constructor(scene) {
        this.scene = scene;
        this.score = {};
        this.scoreTexts = {};
        this.playerNames = {}; // ✅ Store player names
    }

    initializeScore(playerId, playerName, x, y) {
        this.score[playerId] = 0;
        this.playerNames[playerId] = playerName; // ✅ Store the player's name

        this.scoreTexts[playerId] = this.scene.add.text(x, y - 30, `${playerName}: 0`, {
            fontSize: "14px",
            fill: "#fff",
        }).setOrigin(0.5);
    }

    getScores() {
        return this.score; // ✅ Returns the latest scores
    }

    updateScore(scores) {
        Object.keys(scores).forEach((playerId) => {
            if (this.scoreTexts[playerId]) {
                const playerName = this.playerNames[playerId] || `Player ${playerId}`; // ✅ Fallback if name is missing
                this.scoreTexts[playerId].setText(`${playerName}: ${scores[playerId]}`);
            } else {
                console.warn(`⚠️ Missing score text for Player ID: ${playerId}`);
            }
        });
    }
}
