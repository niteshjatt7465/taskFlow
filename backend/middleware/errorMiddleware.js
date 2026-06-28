/**
 * Global error-handling middleware.
 * Catches all errors passed via next(err) and returns a structured JSON response.
 */
const errorMiddleware = (err, req, res, next) => {
  // Determine HTTP status code — prefer err.statusCode, then res.statusCode, then default 500
  let statusCode = err.statusCode || 500;
  if (res.statusCode && res.statusCode !== 200) {
    statusCode = res.statusCode;
  }

  let message = err.message || 'Internal Server Error';

  // Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for field: ${field}`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Only include stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;
