import Phaser from "phaser";


export function createPlayer(scene, playerData) {
    const { id, color, position } = playerData;

    const convertedColor = Phaser.Display.Color.HexStringToColor(color).color;

    const player = scene.add.circle(
        position.x,
        position.y,
        20,
        convertedColor
    );

    console.log(`Create Player Function | player${id} added at (${position.x}, ${position.y}) with color ${color}`);

    player.id = id;
    player.color = convertedColor; // ✅ Store the color inside the player object
    scene.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);
    return player;
}
