// server.ts
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.route';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

// 实时事件处理
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('subscribe-posts', () => {
    socket.join('posts-room');
  });
});

// MongoDB连接
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB连接失败:', err));

// 中间件
app.use(express.json());
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});