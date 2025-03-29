import Phaser from "phaser";
import PlayerControls from "../function/PlayerControls";
import { createPlayer } from "../function/Player.js";
import Canvas from "../function/Canvas";
import GameTimer from "../function/GameTimer.js";
import ScoreManager from "../function/Score";
// import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';

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

    preload() {
        // ✅ Use correct key for loading
        this.load.plugin(
            'rexvirtualjoystickplugin',
            'https://cdn.jsdelivr.net/npm/phaser3-rex-plugins@latest/dist/rexvirtualjoystickplugin.min.js',
            true
        );
    }

    create() {
        const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isPhone = window.innerWidth < 768;
        console.log(isMobile);

        if (isMobile) {
            // ✅ Use correct plugin retrieval
            const RexVirtualJoystick = this.plugins.get('rexvirtualjoystickplugin');
            console.log(RexVirtualJoystick);
            if (RexVirtualJoystick) {
                this.joystick = RexVirtualJoystick.add(this, {
                    x: isPhone ? this.cameras.main.width / 2 : this.cameras.main.width * 0.85,
                    y: this.cameras.main.height * 0.9,
                    radius: 50,
                    base: this.add.circle(0, 0, 50, 0x888888),
                    thumb: this.add.circle(0, 0, 25, 0xffffff),
                    dir: '8dir',
                    forceMin: 10,
                    enable: true
                });

                // ✅ Store joystick keys
                this.joystickKeys = this.joystick.createCursorKeys();
                console.log(`x: ${this.joystick.x}, y: ${this.joystick.y}`);
            } else {
                console.error("RexVirtualJoystick plugin not found!");
            }
        }

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

            // ✅ Pass joystick to PlayerControls
            this.controls = new PlayerControls(this, self.id, this.joystickKeys);
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
            if (!player) return;
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
