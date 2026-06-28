require('dotenv').config();
require('express-async-errors'); // must be required before express routes

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

// Connect to MongoDB Atlas
connectDB();

const app = express();

// ─── Allowed Origins (dev + production) ───────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL, // Vercel production URL
].filter(Boolean); // remove undefined/null

// ─── Middleware ───────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked: origin ${origin} not allowed`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Handle preflight OPTIONS requests for all routes
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Task Tracker API is running 🚀' });
});

// ─── API Routes ───────────────────────────────
app.use('/api/tasks', taskRoutes);

// ─── 404 Handler (unmatched routes) ──────────
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// ─── Global Error Middleware ──────────────────
app.use(errorMiddleware);

// ─── Start Server ─────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});

module.exports = app;
