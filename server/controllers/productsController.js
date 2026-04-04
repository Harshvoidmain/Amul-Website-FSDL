const Product = require('../models/Product');
const { products: inMemoryProducts, getNextId } = require('../data/productsData');

const getAll = async (req, res) => {
  try {
    if (Product.db && Product.find) {
      const docs = await Product.find().lean();
      return res.json({ data: docs });
    }
  } catch (err) {
    console.error('DB product fetch error:', err.message);
  }
  // fallback
  res.json({ data: inMemoryProducts });
};

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    if (Product.findById) {
      const doc = await Product.findById(id).lean();
      if (!doc) return res.status(404).json({ error: 'Product not found' });
      return res.json({ data: doc });
    }
  } catch (err) {
    // ignore and fallback to in-memory by numeric id
  }
  const numId = Number(id);
  const prod = inMemoryProducts.find((p) => p.id === numId);
  if (!prod) return res.status(404).json({ error: 'Product not found' });
  res.json({ data: prod });
};

const create = async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || price == null) return res.status(400).json({ error: 'Missing required fields: name and price' });
  try {
    if (Product.create) {
      const doc = await Product.create({ name, price, description });
      return res.status(201).json({ data: doc });
    }
  } catch (err) {
    console.error('DB product create error:', err.message);
  }
  const newProd = { id: getNextId(), name, price, description: description || '' };
  inMemoryProducts.push(newProd);
  res.status(201).json({ data: newProd });
};

const update = async (req, res) => {
  const id = req.params.id;
  const { name, price, description } = req.body;
  try {
    if (Product.findByIdAndUpdate) {
      const updated = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true, runValidators: true }).lean();
      if (!updated) return res.status(404).json({ error: 'Product not found' });
      return res.json({ data: updated });
    }
  } catch (err) {
    console.error('DB product update error:', err.message);
  }
  const numId = Number(id);
  const prod = inMemoryProducts.find((p) => p.id === numId);
  if (!prod) return res.status(404).json({ error: 'Product not found' });
  if (name !== undefined) prod.name = name;
  if (price !== undefined) prod.price = price;
  if (description !== undefined) prod.description = description;
  res.json({ data: prod });
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    if (Product.findByIdAndDelete) {
      const removed = await Product.findByIdAndDelete(id).lean();
      if (!removed) return res.status(404).json({ error: 'Product not found' });
      return res.json({ data: removed });
    }
  } catch (err) {
    console.error('DB product delete error:', err.message);
  }
  const numId = Number(id);
  const idx = inMemoryProducts.findIndex((p) => p.id === numId);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const removed = inMemoryProducts.splice(idx, 1)[0];
  res.json({ data: removed });
};

module.exports = { getAll, getById, create, update, remove };
