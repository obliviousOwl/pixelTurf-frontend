import Phaser from "phaser";
import PlayerControls from "../function/PlayerControls";
import { createPlayer } from "../function/Player.js";
import Canvas from "../function/Canvas";
import GameTimer from "../function/GameTimer.js";
import ScoreManager from "../function/Score";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    init(data) {
        this.socket = data.socket;
        this.room = data.room;
        this.playerId = data.playerId;
        this.opponentId = data.opponentId;
        this.players = {}; // ✅ Reset players object

    }

    create() {

        this.add.text(400, 300, "We are now in the game", { fontSize: "20px", fill: "#ffff" }).setOrigin(0.5);
        this.physics.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);
        this.socket.emit("requestPlayerData", this.room);
        this.scoreManager = new ScoreManager(this);

        this.gameTimer = new GameTimer(this, this.socket);

        this.socket.on("receivedPlayerData", ({self, opponent}) => {
            console.log(`Self: ${JSON.stringify(self)}`);
            console.log(`Opponent ${JSON.stringify(opponent)}`);
            console.log(`You are ${self.role}. your opponent is ${opponent.id}`);

            if (!this.players[self.id]) {
                this.players[self.id] = createPlayer(this, self);
                this.scoreManager.initializeScore(self.id, self.name, 50, 50);
            }
            if (!this.players[opponent.id]) {
                this.players[opponent.id] = createPlayer(this, opponent);
                this.scoreManager.initializeScore(opponent.id, opponent.name, 650, 50);
            }

            console.log(`Rendering Player: ${JSON.stringify(self)}`);
            console.log(`Rendering Opponent: ${JSON.stringify(opponent)}`);

            this.controls = new PlayerControls(this, self.id);
        });



        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        this.canvas = new Canvas(this, width, height);

        this.socket.on("playerMoved", ({ playerId, x, y }) => {
            if (this.players[playerId]) {
                // console.log(`✅ Player ${playerId} moved to X: ${x}, Y: ${y}`);
                this.players[playerId].setPosition(x, y);
            }
            else{
                // console.warn(`PlayerMoved Event received for unknown player: ${playerId}`);
            }
        });

        this.socket.on("paintUpdated", ({ playerId, x, y }) => {
            // console.log(`✅ RECEIVED paint update for Player ${playerId} at (${x}, ${y})`);

            const player = this.players[playerId]; // Retrieve player object

            if (!player) {
                console.warn(`⚠️ Paint event received for unknown player: ${playerId}`);
                return;
            }

            this.canvas.paint(x, y, player); // Pass the whole player object
        });

        this.socket.on("scoreUpdate", ({ scores }) => {
            this.scoreManager.updateScore(scores); // ✅ Update score UI
        });

        this.socket.on("gameOver", () => {
            console.log("🚨 Game Over! Switching to GameOverScene...");
            this.scene.start("GameOverScene");
        })
    }

    update() {

        if(!this.controls || !this.players[this.playerId]) return;

        const movement = this.controls.getMovement();
        if(movement.x !== 0 || movement.y !== 0){
            const player = this.players[this.playerId];
            const newX = player.x + movement.x * 5;
            const newY = player.y + movement.y * 5;

            player.setPosition(newX,newY);
            this.socket.emit("playerMove", {room: this.room, playerId: this.playerId, x: newX, y: newY});

            this.canvas.paint(newX, newY, player);
            // console.log(`🎨 Emitting paint event: Player ${this.playerId} at (${newX}, ${newY})`);
            this.socket.emit("playerPaint", { room: this.room, playerId: this.playerId, x: newX, y: newY });
        }

    }

}
