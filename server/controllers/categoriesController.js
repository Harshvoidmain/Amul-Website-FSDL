const Category = require('../models/Category');
const { categories: inMemoryCats, getNextId } = require('../data/categoriesData');

const getAll = async (req, res) => {
  try {
    if (Category.find) {
      const docs = await Category.find().lean();
      return res.json({ data: docs });
    }
  } catch (err) {
    console.error('DB category fetch error:', err.message);
  }
  res.json({ data: inMemoryCats });
};

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    if (Category.findById) {
      const doc = await Category.findById(id).lean();
      if (!doc) return res.status(404).json({ error: 'Category not found' });
      return res.json({ data: doc });
    }
  } catch (err) {}
  const numId = Number(id);
  const cat = inMemoryCats.find((c) => c.id === numId);
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  res.json({ data: cat });
};

const create = async (req, res) => {
  const { name, icon } = req.body;
  if (!name) return res.status(400).json({ error: 'Missing required field: name' });
  try {
    if (Category.create) {
      const doc = await Category.create({ name, icon });
      return res.status(201).json({ data: doc });
    }
  } catch (err) {
    console.error('DB category create error:', err.message);
  }
  const newCat = { id: getNextId(), name, icon: icon || '📦' };
  inMemoryCats.push(newCat);
  res.status(201).json({ data: newCat });
};

const update = async (req, res) => {
  const id = req.params.id;
  const { name, icon } = req.body;
  try {
    if (Category.findByIdAndUpdate) {
      const updated = await Category.findByIdAndUpdate(id, { name, icon }, { new: true, runValidators: true }).lean();
      if (!updated) return res.status(404).json({ error: 'Category not found' });
      return res.json({ data: updated });
    }
  } catch (err) {
    console.error('DB category update error:', err.message);
  }
  const numId = Number(id);
  const cat = inMemoryCats.find((c) => c.id === numId);
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  if (name !== undefined) cat.name = name;
  if (icon !== undefined) cat.icon = icon;
  res.json({ data: cat });
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    if (Category.findByIdAndDelete) {
      const removed = await Category.findByIdAndDelete(id).lean();
      if (!removed) return res.status(404).json({ error: 'Category not found' });
      return res.json({ data: removed });
    }
  } catch (err) {
    console.error('DB category delete error:', err.message);
  }
  const numId = Number(id);
  const idx = inMemoryCats.findIndex((c) => c.id === numId);
  if (idx === -1) return res.status(404).json({ error: 'Category not found' });
  const removed = inMemoryCats.splice(idx, 1)[0];
  res.json({ data: removed });
};

module.exports = { getAll, getById, create, update, remove };
