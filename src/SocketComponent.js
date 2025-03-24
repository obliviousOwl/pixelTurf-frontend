import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  reconnectionAttempts: 5, // Try to reconnect up to 5 times
  timeout: 5000, // Wait 5 seconds before timing out
});

function SocketComponent() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // ✅ Successfully connected
    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket server:", socket.id);
    });

    // ❌ If the connection is lost
    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected from WebSocket:", reason);
    });

    // ⚠️ Connection errors
    socket.on("connect_error", (err) => {
      console.error("⚠️ Connection error:", err.message);
    });

    // 📨 Listening for messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      console.log("ℹ️ Cleaning up socket connection...");
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      console.log("📨 Sending message:", message);
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <div>
        <h1>Pixel Turf Multiplayer Game</h1>
      <h2>🎮 WebSocket Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default SocketComponent;
