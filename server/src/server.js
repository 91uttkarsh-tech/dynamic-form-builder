// server.js
import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';
import connectDB from './config/db.js';
import routes from './app.js'; // main combined routes

const PORT = process.env.PORT || 4000;

const app = express();

const startServer = async () => {
  try {
    await connectDB();

    // Root API group
    app.use('/api/v1', routes);

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server startup error:", error);
    process.exit(1);
  }
};

startServer();
