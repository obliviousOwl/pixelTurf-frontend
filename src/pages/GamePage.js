import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import LoadingScene from "../game/scenes/LoadingScene";
import GameScene from "../game/scenes/GameScene";
import GameOverScene from "../game/scenes/GameOverScene";
import "../styles/GamePage.css";

const GamePage = () => {
  const gameRef = useRef(null);
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    if (!playerName.trim()) return;
    setGameStarted(true);
  };

  useEffect(() => {
    if (!gameStarted) return;

    const baseWidth = 600;
    const baseHeight = 800;
    const aspectRatio = baseWidth / baseHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;

    const determineSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      let newWidth = Math.min(screenWidth, baseWidth);
      let newHeight = newWidth / aspectRatio;

      if (newHeight > screenHeight) {
        newHeight = screenHeight;
        newWidth = newHeight * aspectRatio;
      }

      return { width: Math.round(newWidth), height: Math.round(newHeight) };
    };

    const { width, height } = determineSize();

    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width,
      height,
      backgroundColor: "#000",
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: false },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      resolution: devicePixelRatio,
      scene: [LoadingScene, GameScene, GameOverScene],
    };

    const game = new Phaser.Game(config);
    game.registry.set("playerName", playerName);

    const resizeGame = () => {
      const { width, height } = determineSize();
      game.scale.resize(width, height);
    };

    window.addEventListener("resize", resizeGame);

    return () => {
      window.removeEventListener("resize", resizeGame);
      game.destroy(true);
    };
  }, [gameStarted, playerName]);

  return (
    <Container fluid className="game-container d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4} className="text-center">
          {!gameStarted ? (
            <div className="menu-container p-4">
              <h2 className="menu-title">Enter Your Name</h2>
              <Form.Control
                type="text"
                placeholder="Player Name"
                className="mb-3 player-input"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <Button variant="primary" className="start-button" onClick={handleStartGame}>
                Start Game
              </Button>
            </div>
          ) : (
            <div ref={gameRef} className="game-screen" />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GamePage;
