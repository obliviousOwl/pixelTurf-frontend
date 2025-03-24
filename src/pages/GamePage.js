import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import { Container, Row, Col } from "react-bootstrap";
import GameMenuScene from "../game/scenes/GameMenuScene";
import LoadingScene from "../game/scenes/LoadingScene";
import GameScene from "../game/scenes/GameScene";
import GameOverScene from "../game/scenes/GameOverScene";

const GamePage = () => {
  const gameRef = useRef(null);

  useEffect(() => {
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
      scene: [GameMenuScene, LoadingScene, GameScene, GameOverScene],
    };

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <Container fluid className="d-flex justify-content-center align-items-center mt-5">
      <Row>
        <Col className="d-flex justify-content-center">
          <div ref={gameRef} style={{ width: "800px", height: "600px" }} />
        </Col>
      </Row>
    </Container>
  );
};

export default GamePage;
