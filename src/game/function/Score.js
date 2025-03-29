export default class ScoreManager {
    constructor(scene) {
        this.scene = scene;
        this.score = {};
        this.scoreTexts = {};
        this.playerNames = {};
    }

    getDynamicFontSize() {
        const screenWidth = this.scene.scale.width;
        return Math.max(14, Math.round(screenWidth * 0.025)); 
    }

    initializeScore(playerId, playerName, isLeft = true) {
        this.score[playerId] = 0;
        this.playerNames[playerId] = playerName;

        const { width } = this.scene.scale;
        const fontSize = this.getDynamicFontSize();

        const x = isLeft ? 20 : width - 20;
        const y = 20; // Always at the top

        this.scoreTexts[playerId] = this.scene.add.text(x, y, `${playerName}: 0`, {
            fontSize: `${fontSize}px`,
            fill: "#fff",
            align: "left",
        }).setOrigin(isLeft ? 0 : 1, 0);
    }

    updateScore(scores) {
        Object.keys(scores).forEach((playerId) => {
            if (this.scoreTexts[playerId]) {
                const playerName = this.playerNames[playerId] || `Player ${playerId}`;
                this.scoreTexts[playerId].setText(`${playerName}: ${scores[playerId]}`);
            }
        });
    }

    resizeScoreText() {
        const { width } = this.scene.scale;
        const fontSize = this.getDynamicFontSize();

        Object.keys(this.scoreTexts).forEach((playerId, index) => {
            const isLeft = index === 0; // Assume first player is left, second is right
            const x = isLeft ? 20 : width - 20;
            const y = 20;

            if (this.scoreTexts[playerId]) {
                this.scoreTexts[playerId]
                    .setFontSize(`${fontSize}px`)
                    .setPosition(x, y);
            }
        });
    }

    enableDynamicScaling() {
        this.scene.scale.on("resize", () => this.resizeScoreText());
    }
}
