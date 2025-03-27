import { useState } from "react";

const GameMenu = ({ onStartGame }) => {
    const [playerName, setPlayerName] = useState("");

    const handleStartGame = () => {
        const name = playerName.trim() || "Player";
        onStartGame(name);
    };

    return (
        <div className="game-menu">
            <h2>Enter Your Name:</h2>
            <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter name..."
            />
            <button onClick={handleStartGame}>Play</button>
        </div>
    );
};

export default GameMenu;
