import Phaser from "phaser";
import { io } from "socket.io-client";

class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  create() {
    // ✅ Correctly retrieve player name from registry
    const playerName = this.registry.get("playerName") || "Player";


    this.add.text(400, 300, "Waiting for Players...", { fontSize: "20px", fill: "#fff" })
        .setOrigin(0.5);

    // ✅ Initialize socket connection
    this.socket = io("http://localhost:5000");

    this.socket.on("connect", () => {
        console.log("Connected to server!");

        // ✅ Send player name to the server when requesting a match
        this.socket.emit("findMatch", { playerName: playerName });
    });

    this.socket.on("matchFound", ({ room, players }) => {
        if (players.length < 2) {
            return;
        }

        const playerId = this.socket.id; // Get your own ID
        const opponent = players.find(p => p.id !== playerId);



        this.scene.start("GameScene", {
            socket: this.socket,
            room,
            playerId,
            playerName,
            opponentId: opponent.id,
            opponentName: opponent.name
        });
    });

    this.socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
    });
  }
}

export default LoadingScene;
