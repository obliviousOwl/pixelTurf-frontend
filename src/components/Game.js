import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const Game = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current, // Attach Phaser to this div
      width: 800,
      height: 600,
      backgroundColor: "#000000", // Set canvas background to white
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: false },
      },
      scene: {
        preload,
        create,
        update,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      // No need to load an image, we will draw the circle
    }

    function create() {
      const randomColor = Phaser.Display.Color.RandomRGB().color; // Get random color
      const radius = 20;
      const textureSize = radius * 2 + 8; // Extra space for the stroke
      const circleGraphics = this.make.graphics({ x: 0, y: 0, add: false });

      // Draw the black outline
      circleGraphics.lineStyle(4, 0x000000); // Black outline, 4px thick

      // Draw the filled circle
      circleGraphics.fillStyle(randomColor, 1); // Fill with random color
      circleGraphics.fillCircle(textureSize / 2, textureSize / 2, radius);
      circleGraphics.strokeCircle(textureSize / 2, textureSize / 2, radius);

      // Generate a texture from the drawn circle
      circleGraphics.generateTexture("playerCircle", textureSize, textureSize);
      circleGraphics.destroy(); // Free memory

      // Add player sprite using the generated texture
      this.player = this.physics.add.sprite(400, 300, "playerCircle");
      this.player.setCollideWorldBounds(true);

      // Enable keyboard input
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
      if (this.cursors.left.isDown) {
        this.player.x -= 5;
      }
      if (this.cursors.right.isDown) {
        this.player.x += 5;
      }
      if (this.cursors.up.isDown) {
        this.player.y -= 5;
      }
      if (this.cursors.down.isDown) {
        this.player.y += 5;
      }
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameRef} style={{ width: "800px", height: "600px" }} />;
};

export default Game;
