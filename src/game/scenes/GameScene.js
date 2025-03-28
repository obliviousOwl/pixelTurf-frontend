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
        this.players = {};
        this.scores = {};
    }

    create() {
        this.physics.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);
        this.socket.emit("requestPlayerData", this.room);
        this.scoreManager = new ScoreManager(this);

        this.gameTimer = new GameTimer(this, this.socket);

        this.socket.on("receivedPlayerData", ({ self, opponent }) => {

            if (!this.players[self.id]) {
                this.players[self.id] = createPlayer(this, self);
                this.scoreManager.initializeScore(self.id, self.name, 50, 50);
            }
            if (!this.players[opponent.id]) {
                this.players[opponent.id] = createPlayer(this, opponent);
                this.scoreManager.initializeScore(opponent.id, opponent.name, 650, 50);
            }



            this.controls = new PlayerControls(this, self.id);
        });

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        this.canvas = new Canvas(this, width, height);

        this.socket.on("playerMoved", ({ playerId, x, y }) => {
            if (this.players[playerId]) {
                this.players[playerId].setPosition(x, y);
            }
        });

        this.socket.on("paintUpdated", ({ playerId, x, y }) => {
            const player = this.players[playerId];
            if (!player) {

                return;
            }
            this.canvas.paint(x, y, player);
        });

        this.socket.on("scoreUpdate", ({ scores }) => {
            this.scores = scores;
            this.scoreManager.updateScore(scores);
        });

        this.socket.on("gameOver", ({ playerNames }) => {


            this.scene.start("GameOverScene", {
                socket: this.socket,
                scores: this.scores,
                playerId: this.playerId,
                playerNames: playerNames,
            });
        });
    }

    update() {
        if (!this.controls || !this.players[this.playerId]) return;

        const movement = this.controls.getMovement();
        if (movement.x !== 0 || movement.y !== 0) {
            const player = this.players[this.playerId];
            const newX = player.x + movement.x * 5;
            const newY = player.y + movement.y * 5;

            player.setPosition(newX, newY);
            this.socket.emit("playerMove", { room: this.room, playerId: this.playerId, x: newX, y: newY });

            this.canvas.paint(newX, newY, player);
            this.socket.emit("playerPaint", { room: this.room, playerId: this.playerId, x: newX, y: newY });
        }
    }
}
