require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./db');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const contactRouter = require('./routes/contact');
const ordersRouter = require('./routes/orders');

const app = express();

// Attempt MongoDB connection (non-blocking)
connect();

app.use(cors());
app.use(express.json());

app.use('/images', express.static('public/images'));
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/contact', contactRouter);





app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected 🔥');
});


const port = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}

module.exports = app;
