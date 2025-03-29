import Phaser from "phaser";
import { io } from "socket.io-client";

class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  create() {
    const playerName = this.registry.get("playerName") || "Player";

    this.waitingText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      "Waiting for Players...",
      { fontSize: "20px", fill: "#fff" }
    ).setOrigin(0.5);

    this.scale.on("resize", this.centerText, this);

    this.socket = io(`${process.env.REACT_APP_BACKEND_STRING}`);

    this.socket.on("connect", () => {
      console.log("Connected to server!");
      this.socket.emit("findMatch", { playerName });
    });

    this.socket.on("matchFound", ({ room, players }) => {
      if (players.length < 2) return;

      const playerId = this.socket.id;
      const opponent = players.find(p => p.id !== playerId);

      this.scene.start("GameScene", {
        socket: this.socket,
        room,
        playerId,
        playerName,
        opponentId: opponent.id,
        opponentName: opponent.name,
      });
    });

    this.socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
  }

  centerText() {
    this.waitingText.setPosition(this.scale.width / 2, this.scale.height / 2);
  }
}

export default LoadingScene;
