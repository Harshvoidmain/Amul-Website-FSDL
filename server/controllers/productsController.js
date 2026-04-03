const { products, getNextId } = require('../data/productsData');

const getAll = (req, res) => {
  res.json({ data: products });
};

const getById = (req, res) => {
  const id = Number(req.params.id);
  const prod = products.find((p) => p.id === id);
  if (!prod) return res.status(404).json({ error: 'Product not found' });
  res.json({ data: prod });
};

const create = (req, res) => {
  const { name, price, description } = req.body;
  if (!name || price == null) return res.status(400).json({ error: 'Missing required fields: name and price' });
  const newProd = { id: getNextId(), name, price, description: description || '' };
  products.push(newProd);
  res.status(201).json({ data: newProd });
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const prod = products.find((p) => p.id === id);
  if (!prod) return res.status(404).json({ error: 'Product not found' });
  const { name, price, description } = req.body;
  if (name !== undefined) prod.name = name;
  if (price !== undefined) prod.price = price;
  if (description !== undefined) prod.description = description;
  res.json({ data: prod });
};

const remove = (req, res) => {
  const id = Number(req.params.id);
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const removed = products.splice(idx, 1)[0];
  res.json({ data: removed });
};

module.exports = { getAll, getById, create, update, remove };
