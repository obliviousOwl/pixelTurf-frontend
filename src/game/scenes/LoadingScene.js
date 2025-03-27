import Phaser from "phaser";
import { io } from "socket.io-client";

class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  create() {
    const playerName = this.registry.get("playerName");
    this.registry.set("playerName", this.playerName);

    console.log(playerName);
    this.add.text(400, 300, "Waiting for Players...", { fontSize: "20px", fill: "#fff" })
        .setOrigin(0.5);

    // ✅ Ensure the socket is initialized correctly
    this.socket = io("http://localhost:5000");

    this.socket.on("connect", () => {
        console.log("Connected to server!");

        // ✅ Only emit after connection is established
        this.socket.emit("findMatch");
    });

    this.socket.on("matchFound", ({ room, players }) => {
        if(players.length < 2){
            console.log("Not enough players in the room");
            return;
        }

        const playerId = this.socket.id; // Get your own ID
        const opponent = players.find(p => p.id !== playerId);
        console.log(playerId);
        console.log(opponent);
        console.log(`Opponent id is ${opponent.id}`);

        console.log(`Match Found! Room: ${room}, You: ${playerId}, Opponent: ${opponent.id}`);


        this.scene.start("GameScene", {
            socket: this.socket,
            room,
            playerId,
            opponentId: opponent.id
        });
    });

    this.socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
    });
  }
}

export default LoadingScene;
