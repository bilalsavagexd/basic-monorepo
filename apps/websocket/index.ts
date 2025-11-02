import { WebSocketServer } from "ws";
import { prismaClient } from "db/client";

// Create a WebSocket server on port 8081
const wss = new WebSocketServer({ port: 8081 });

console.log("✅ WebSocket server running on ws://localhost:8081");

wss.on("connection", (ws) => {
  console.log("🔗 Client connected");

  ws.on("message", async (message) => {
    try {
      // Example: insert a random user into the DB
      await prismaClient.user.create({
        data: {
          username: Math.random().toString(),
          password: Math.random().toString(),
        },
      });

      // Echo the received message back
      ws.send(message.toString());
    } catch (error) {
      console.error("❌ Error:", error);
      ws.send("Database error occurred");
    }
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});
