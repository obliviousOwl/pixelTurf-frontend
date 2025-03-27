import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import GameMenuScene from "../game/scenes/GameMenuScene";
import LoadingScene from "../game/scenes/LoadingScene";
import GameScene from "../game/scenes/GameScene";
import GameOverScene from "../game/scenes/GameOverScene";

const GamePage = () => {
  const gameRef = useRef(null);
  const [playerName, setPlayerName] = useState(""); // Track name input
  const [gameStarted, setGameStarted] = useState(false); // Show menu or game

  const handleStartGame = () => {
    if (!playerName.trim()) return; // Prevent empty names
    setGameStarted(true);
  };

  useEffect(() => {
    if (!gameStarted) return; // Only run when game starts

    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: 800,
      height: 600,
      backgroundColor: "#000000",
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: false },
      },
      scene: [ LoadingScene, GameScene, GameOverScene],
    };

    const game = new Phaser.Game(config);

    game.registry.set("playerName", playerName); // Pass name to Phaser

    return () => {
      game.destroy(true);
    };
  }, [gameStarted, playerName]); // Re-run when game starts

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <Row>
        <Col className="d-flex justify-content-center">
          {!gameStarted ? (
            <div className="menu-container text-center p-4 border rounded bg-secondary">
              <h2 className="text-white">Enter Your Name</h2>
              <Form.Control
                type="text"
                placeholder="Player Name"
                className="mb-3 text-center"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <Button variant="primary" onClick={handleStartGame}>
                Start Game
              </Button>
            </div>
          ) : (
            <div ref={gameRef} style={{ width: "800px", height: "600px" }} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GamePage;
