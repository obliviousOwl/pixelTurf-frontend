import React from "react";
import { Container, Card } from "react-bootstrap";


const HowToPlay = () => {
    return (
        <Container className="mt-4 pt-4">
          <Card className="p-4 shadow-lg mt-4">
            <h1 className="text-center">How to Play Color Clash</h1>
            <p>
              Welcome to <strong>Color Clash</strong>, a fast-paced multiplayer game where you compete to claim the most
              territory! Follow this guide to learn how to play and dominate the turf.
            </p>

            <h2>Objective</h2>
            <p>
              Your goal is to <strong>cover as much area as possible</strong> by painting tiles in your color before time
              runs out. The player with the most painted area at the end of the match <strong>wins</strong>!
            </p>

            <h2>Getting Started</h2>
            <ul>
              <li><strong>Enter the Game Lobby:</strong> Click "Play" to enter matchmaking. Wait for another player to join. Once two players are ready, the game begins!</li>
              <li><strong>Game Controls:</strong>
                <ul>
                  <li><strong>Move:</strong> Use <strong>Arrow Keys</strong> to navigate.</li>
                  <li><strong>Paint Tiles:</strong> Simply move over tiles to color them in your color.</li>
                  <li><strong>Reclaim Turf:</strong> You can paint over your opponent’s tiles to take control of their area!</li>
                </ul>
              </li>
            </ul>

            <h2>Scoring & Winning</h2>
            <ul>
              <li>Each tile you paint adds to your score.</li>
              <li>If an opponent paints over your tiles, your score decreases accordingly.</li>
              <li>When time runs out, the player with the most painted tiles <strong>wins</strong>!</li>
            </ul>

            <h2>Tips & Strategies</h2>
            <ul>
              <li><strong>Move quickly</strong> to cover as much ground as possible.</li>
              <li><strong>Defend your area</strong> by repainting over your opponent’s turf.</li>
              <li><strong>Strategic movement</strong> can help you trap your opponent and prevent them from reclaiming tiles.</li>
            </ul>

            <p className="text-center"><strong>Get ready to outpaint, outmaneuver, and dominate the battlefield! 🎨🏆</strong></p>
          </Card>
        </Container>
      );
};

export default HowToPlay;
