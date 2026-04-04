const Order = require('../models/Order');
const { orders: inMemoryOrders, getNextId } = require('../data/ordersData');

const getAll = async (req, res) => {
  try {
    if (Order.find) {
      const docs = await Order.find().lean();
      return res.json({ data: docs });
    }
  } catch (err) {
    console.error('DB order fetch error:', err.message);
  }
  res.json({ data: inMemoryOrders });
};

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    if (Order.findById) {
      const doc = await Order.findById(id).lean();
      if (!doc) return res.status(404).json({ error: 'Order not found' });
      return res.json({ data: doc });
    }
  } catch (err) {}
  const numId = Number(id);
  const order = inMemoryOrders.find((o) => o.id === numId);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ data: order });
};

const create = async (req, res) => {
  const { items, total, customer } = req.body;
  if (!Array.isArray(items) || items.length === 0 || total == null) {
    return res.status(400).json({ error: 'Missing required fields: items (non-empty array) and total' });
  }
  try {
    if (Order.create) {
      const doc = await Order.create({ items, total, customer });
      return res.status(201).json({ data: doc });
    }
  } catch (err) {
    console.error('DB order create error:', err.message);
  }
  const newOrder = { id: getNextId(), items, total, customer: customer || null, status: 'pending', createdAt: new Date().toISOString() };
  inMemoryOrders.push(newOrder);
  res.status(201).json({ data: newOrder });
};

const update = async (req, res) => {
  const id = req.params.id;
  const { items, total, customer, status } = req.body;
  try {
    if (Order.findByIdAndUpdate) {
      const updated = await Order.findByIdAndUpdate(id, { items, total, customer, status }, { new: true, runValidators: true }).lean();
      if (!updated) return res.status(404).json({ error: 'Order not found' });
      return res.json({ data: updated });
    }
  } catch (err) {
    console.error('DB order update error:', err.message);
  }
  const numId = Number(id);
  const order = inMemoryOrders.find((o) => o.id === numId);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  if (items !== undefined) order.items = items;
  if (total !== undefined) order.total = total;
  if (customer !== undefined) order.customer = customer;
  if (status !== undefined) order.status = status;
  res.json({ data: order });
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    if (Order.findByIdAndDelete) {
      const removed = await Order.findByIdAndDelete(id).lean();
      if (!removed) return res.status(404).json({ error: 'Order not found' });
      return res.json({ data: removed });
    }
  } catch (err) {
    console.error('DB order delete error:', err.message);
  }
  const numId = Number(id);
  const idx = inMemoryOrders.findIndex((o) => o.id === numId);
  if (idx === -1) return res.status(404).json({ error: 'Order not found' });
  const removed = inMemoryOrders.splice(idx, 1)[0];
  res.json({ data: removed });
};

module.exports = { getAll, getById, create, update, remove };
