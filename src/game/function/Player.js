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


    player.id = id;
    player.color = convertedColor;
    scene.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);
    return player;
}
