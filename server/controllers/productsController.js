const Product = require('../models/Product');
const { products: inMemoryProducts, getNextId } = require('../data/productsData');

function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const getAll = async (req, res) => {
  const { category } = req.query;
  try {
    if (Product.db && Product.find) {
      const query = {};
      if (category && category !== 'all') query.category = category;
      let docs = await Product.find(query).lean();
      // If DB returned no documents, fall back to in-memory seed data for dev
      if (!docs || docs.length === 0) {
        if (inMemoryProducts && inMemoryProducts.length) {
          const filtered = category && category !== 'all'
            ? inMemoryProducts.filter((p) => p.category === category)
            : inMemoryProducts;
          return res.json({ data: filtered });
        }
      }
      // Normalize category field to slug for each product
      docs = docs.map((p) => ({
        id: p.id || p._id,
        name: p.name,
        price: p.price,
        description: p.description || '',
        category: p.category && p.category.length ? slugify(p.category) : '',
        image: p.image || '',
        rating: p.rating || 0,
        reviews: p.reviews || 0
      }));
      return res.json({ data: docs });
    }
  } catch (err) {
    console.error('DB product fetch error:', err.message);
  }
  // fallback to in-memory
  if (category && category !== 'all') {
    const filtered = inMemoryProducts.filter((p) => p.category === category);
    return res.json({ data: filtered });
  }
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
