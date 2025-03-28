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

        this.add.text(400, 100, "Game Over", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);

        let winnerId = null;
        let highestScore = -1;

        //  Find the player with the highest score
        Object.entries(this.scores).forEach(([id, score]) => {
            if (score > highestScore) {
                highestScore = score;
                winnerId = id;
            }
        });

        //  Determine if the local player won or lost
        const resultText = winnerId === this.playerId ? "Victory!" : "Defeat!";
        this.add.text(400, 150, resultText, { fontSize: "28px", fill: winnerId === this.playerId ? "#0f0" : "#f00" }).setOrigin(0.5);

        //  Display all scores with player names
        let yPos = 200;
        Object.entries(this.scores).forEach(([id, score]) => {
            const playerName = this.playerNames[id] || `Player ${id}`; // ✅ Get name
            this.add.text(400, yPos, `${playerName}: ${score}`, { fontSize: "24px", fill: "#fff" }).setOrigin(0.5);
            yPos += 40;
        });

        //  Add "Play Again" button (refreshes the page)
        const playAgainText = this.add.text(400, yPos + 50, "Play Again", { fontSize: "24px", fill: "#ff0" })
            .setOrigin(0.5)
            .setInteractive();

        playAgainText.on("pointerdown", () => {
            window.location.reload(); // 🔥 Refresh the entire page
        });
    }
}
