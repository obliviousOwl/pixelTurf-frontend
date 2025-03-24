class PlayerControls {
    constructor(scene, playerId) {
        this.scene = scene;
        this.playerId = playerId;
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    getMovement() {
        let movement = { x: 0, y: 0 };
        if (this.cursors.left.isDown) movement.x = -1;
        if (this.cursors.right.isDown) movement.x = 1;
        if (this.cursors.up.isDown) movement.y = -1;
        if (this.cursors.down.isDown) movement.y = 1;
        return movement;
    }
}

export default PlayerControls;
