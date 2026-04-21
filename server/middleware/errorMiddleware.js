/**
 * errorMiddleware.js
 * Centralized error handler — catches ALL errors thrown in routes/controllers.
 * Must be registered last in index.js with app.use(errorHandler)
 */

const errorHandler = (err, req, res, next) => {
  // Log full error on server for debugging
  console.error(`[ERROR] ${req.method} ${req.originalUrl} →`, err);

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Only expose stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * createError — helper to throw custom errors from controllers/routes
 * Usage: throw createError(404, 'Product not found');
 */
const createError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = { errorHandler, createError };