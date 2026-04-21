require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const { connect } = require('./db');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const contactRouter = require('./routes/contact');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/authRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// ── 1. Security Middleware (MUST be first, before routes) ─────────────────────

// Helmet — sets secure HTTP headers, removes X-Powered-By
app.use(helmet());

// CORS — only allow requests from your frontend origin
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Rate Limiter — max 100 requests per 15 min per IP on /api routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,   // returns rate limit info in RateLimit-* headers
  legacyHeaders: false,
});
app.use('/api', limiter);

// Parse JSON bodies
app.use(express.json());

// MongoSanitize — strips $ and . from req.body/params to prevent NoSQL injection
app.use(mongoSanitize());

// ─────────────────────────────────────────────────────────────────────────────

// ── 2. Database Connection ────────────────────────────────────────────────────
connect();

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected 🔥');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// ── 3. Static Files ───────────────────────────────────────────────────────────
app.use('/images', express.static('public/images'));

// ── 4. Routes ─────────────────────────────────────────────────────────────────
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);

// ── 5. Health Check Route (useful for testing) ────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// ── 6. Centralized Error Handler (MUST be last) ───────────────────────────────
// ── 6. 404 Handler — catches any route that doesn't exist ─────────────────────
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found — ${req.method} ${req.originalUrl}`,
  });
});

// ── 7. Centralized Error Handler (MUST be last) ───────────────────────────────
app.use(errorHandler);
// ── 7. Start Server ───────────────────────────────────────────────────────────
const port = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}

module.exports = app;