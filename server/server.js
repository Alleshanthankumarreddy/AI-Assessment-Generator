import dotenv from "dotenv";
dotenv.config();
import dns from "dns";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongo.js";
import { initSocket } from "./socket.js";

import "./workers/questionPaperWorker.js";

import authRoutes from "./routes/auth.js";
import assignmentRoutes from "./routes/assignment.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const app = express();
// =======================
// Middlewares
// =======================
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

initSocket(io);


// =======================
// Database Connection
// =======================
connectDB();



app.use("/api/auth", authRoutes);
app.use("/api/assignment", assignmentRoutes);

// =======================
// Socket.IO
// =======================
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});


// =======================
// Server Listen
// =======================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});