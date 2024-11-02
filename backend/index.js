import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/connectDB.js";
import userRouter from './routes/userRoute.js';
import messageRouter from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from 'http';
import { Server } from 'socket.io';

dotenv.config({});

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

export const getReciverSocketId = (reciverId)=>{
    return userSocketMap[reciverId];
  }
const userSocketMap = {};

// Socket.io connection
io.on('connection', (socket) => {
  console.log('user connected ' , socket.id);
  const userId = socket.handshake.query.userId
  if(userId !== undefined){
      userSocketMap[userId] = socket.id
  }

  io.emit('getOnlineUsers' , Object.keys(userSocketMap));

  socket.on('disconnect' , ()=>{
      console.log('user disconnected' , socket.id) 
      delete userSocketMap[userId];
      io.emit('getOnlineUsers' , Object.keys(userSocketMap))
  })
});

// Set up routes
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);

// Start the server
server.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port ${PORT}`);
});

export{io}
