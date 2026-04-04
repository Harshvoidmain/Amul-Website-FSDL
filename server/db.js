const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/amul';

async function connect() {
  try {
    // Mongoose v7 no longer requires explicit parser/driver flags
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected to', mongoUri);
  } catch (err) {
    console.error('MongoDB connection error:', err && err.message ? err.message : err);
  }
}

function isConnected() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

module.exports = { connect, mongoose, isConnected };
