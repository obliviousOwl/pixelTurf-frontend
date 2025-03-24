import Phaser from "phaser";
import { io } from "socket.io-client";


class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  create() {
    this.add.text(400, 300, "Waiting for Players...", { fontSize: "20px", fill: "#fff" })
        .setOrigin(0.5);

    this.socket = io("http://localhost:5000");

    this.socket.emit("findMatch");

    this.socket.on("matchFound", ({ room, playerId, opponentId}) => {
        console.log(`Match Found! Room: ${room}, You: ${playerId}, Opponent: ${opponentId}`);

        this.scene.start("GameScene", {socket: this.socket, room, playerId, opponentId});
    })

  }
}

export default LoadingScene;
