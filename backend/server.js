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

// ─── Allowed Origins ──────────────────────────
// Strip trailing slashes so 'https://example.com/' === 'https://example.com'
const normalizeOrigin = (url) => (url ? url.replace(/\/+$/, '') : null);

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  normalizeOrigin(process.env.CLIENT_URL), // from Render env var
  'https://task-flow-self-beta.vercel.app', // hardcoded as safety fallback
].filter(Boolean);

console.log('✅ Allowed CORS origins:', allowedOrigins);

// ─── CORS Middleware ──────────────────────────
const corsOptions = {
  origin: (origin, callback) => {
    // Allow no-origin requests (Postman, mobile apps, curl)
    if (!origin) return callback(null, true);
    // Normalize incoming origin too (strip trailing slash)
    const normalizedIncoming = normalizeOrigin(origin);
    if (allowedOrigins.includes(normalizedIncoming)) {
      return callback(null, true);
    }
    console.warn(`⛔ CORS blocked: ${origin}`);
    return callback(new Error(`CORS policy: origin ${origin} not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200, // for legacy browser support
};

app.use(cors(corsOptions));

// Handle ALL preflight OPTIONS requests globally
app.options('*', cors(corsOptions));

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
