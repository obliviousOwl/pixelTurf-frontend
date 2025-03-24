import Phaser from "phaser";
import PlayerControls from "../function/PlayerControls";
import GameTimer from "../function/GameTimer";
import GameScore from "../function/GameScore";
import Player from "../function/Player";
import Canvas from "../function/Canvas";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.timer = new GameTimer(this);
    this.timer.start();

    this.add.text(400, 300, "We are now in the game", { fontSize: "20px", fill: "#ffff" }).setOrigin(0.5);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.canvas = new Canvas(this, width, height);

    this.player = new Player(this, 500, 321, "1");
    this.controls = new PlayerControls(this, "player1");

    this.score = new GameScore(this);
    this.score.create([{ id: this.player.id }]);
  }

  update() {
    const movement = this.controls.getMovement();
    const speed = 200;
    this.player.setVelocity(movement.x * speed, movement.y * speed);

    this.canvas.paint(this.player.position.x + 15, this.player.position.y +15);
    this.score.paintPixel(this.player.position.x, this.player.position.y, this.player.id);
  }
}
