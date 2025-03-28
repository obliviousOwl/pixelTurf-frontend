import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import LoadingScene from "../game/scenes/LoadingScene";
import GameScene from "../game/scenes/GameScene";
import GameOverScene from "../game/scenes/GameOverScene";
import "../styles/GamePage.css"; // Import custom styles

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

    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: 800,
      height: 600,
      backgroundColor: "#1a1a1a",
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: false },
      },
      scene: [LoadingScene, GameScene, GameOverScene],
    };

    const game = new Phaser.Game(config);
    game.registry.set("playerName", playerName);

    return () => {
      game.destroy(true);
    };
  }, [gameStarted, playerName]);

  return (
    <Container fluid className="game-container d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col className="d-flex justify-content-center">
          {!gameStarted ? (
            <div className="menu-container text-center p-4 border rounded">
              <h2>Enter Your Name</h2>
              <Form.Control
                type="text"
                placeholder="Player Name"
                className="mb-3 text-center player-input"
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
