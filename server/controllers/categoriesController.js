const { categories, getNextId } = require('../data/categoriesData');

const getAll = (req, res) => {
  res.json({ data: categories });
};

const getById = (req, res) => {
  const id = Number(req.params.id);
  const cat = categories.find((c) => c.id === id);
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  res.json({ data: cat });
};

const create = (req, res) => {
  const { name, icon } = req.body;
  if (!name) return res.status(400).json({ error: 'Missing required field: name' });
  const newCat = { id: getNextId(), name, icon: icon || '📦' };
  categories.push(newCat);
  res.status(201).json({ data: newCat });
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const cat = categories.find((c) => c.id === id);
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  const { name, icon } = req.body;
  if (name !== undefined) cat.name = name;
  if (icon !== undefined) cat.icon = icon;
  res.json({ data: cat });
};

const remove = (req, res) => {
  const id = Number(req.params.id);
  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Category not found' });
  const removed = categories.splice(idx, 1)[0];
  res.json({ data: removed });
};

module.exports = { getAll, getById, create, update, remove };
