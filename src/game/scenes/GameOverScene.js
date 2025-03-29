import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    init(data) {
        this.socket = data.socket;
        this.scores = data.scores || {};
        this.playerId = data.playerId;
        this.playerNames = data.playerNames || {};

        this.socket.emit("matchResults", {
            scores: this.scores,
            playerId: this.playerId,
            playerNames: this.playerNames,
        });
    }

    create() {
        const centerX = this.scale.width / 2; // ✅ Dynamic horizontal centering
        let yPos = 100; // Starting Y position

        // "Game Over" title
        this.add.text(centerX, yPos, "Game Over", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);
        yPos += 50;

        let winnerId = null;
        let highestScore = -1;

        // Find the player with the highest score
        Object.entries(this.scores).forEach(([id, score]) => {
            if (score > highestScore) {
                highestScore = score;
                winnerId = id;
            }
        });

        // Victory or Defeat text
        const resultText = winnerId === this.playerId ? "Victory!" : "Defeat!";
        this.add.text(centerX, yPos, resultText, { fontSize: "28px", fill: winnerId === this.playerId ? "#0f0" : "#f00" }).setOrigin(0.5);
        yPos += 50;

        // Display all scores with player names
        Object.entries(this.scores).forEach(([id, score]) => {
            const playerName = this.playerNames[id] || `Player ${id}`;
            this.add.text(centerX, yPos, `${playerName}: ${score}`, { fontSize: "24px", fill: "#fff" }).setOrigin(0.5);
            yPos += 40;
        });

        // "Play Again" button
        const playAgainText = this.add.text(centerX, yPos + 50, "Play Again", { fontSize: "24px", fill: "#ff0" })
            .setOrigin(0.5)
            .setInteractive();

        playAgainText.on("pointerdown", () => {
            window.location.reload(); // 🔥 Refresh the game
        });
    }
}
