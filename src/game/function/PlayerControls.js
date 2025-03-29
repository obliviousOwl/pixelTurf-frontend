class PlayerControls {
    constructor(scene, playerId, joystickKeys = null) {
        this.scene = scene;
        this.playerId = playerId;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.joystickKeys = joystickKeys; // ✅ Add joystick keys
    }

    getMovement() {
        let movement = { x: 0, y: 0 };

        // ✅ Keyboard controls
        if (this.cursors.left.isDown) movement.x = -1;
        if (this.cursors.right.isDown) movement.x = 1;
        if (this.cursors.up.isDown) movement.y = -1;
        if (this.cursors.down.isDown) movement.y = 1;

        // ✅ Joystick controls
        if (this.joystickKeys) {
            if (this.joystickKeys.left.isDown) movement.x = -1;
            if (this.joystickKeys.right.isDown) movement.x = 1;
            if (this.joystickKeys.up.isDown) movement.y = -1;
            if (this.joystickKeys.down.isDown) movement.y = 1;
        }

        return movement;
    }
}

export default PlayerControls;
