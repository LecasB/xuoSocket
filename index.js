import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import express from "express";

const app = express();
const server = createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ✅ Handle connections
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log("📩 Message received from client:", data);
    io.emit("newMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`🟢 Socket.IO server running on http://localhost:${PORT}`);
});
