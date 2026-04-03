const { orders, getNextId } = require('../data/ordersData');

const getAll = (req, res) => {
  res.json({ data: orders });
};

const getById = (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find((o) => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ data: order });
};

const create = (req, res) => {
  const { items, total, customer } = req.body;
  if (!Array.isArray(items) || items.length === 0 || total == null) {
    return res.status(400).json({ error: 'Missing required fields: items (non-empty array) and total' });
  }
  const newOrder = { id: getNextId(), items, total, customer: customer || null, status: 'pending', createdAt: new Date().toISOString() };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find((o) => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const { items, total, customer, status } = req.body;
  if (items !== undefined) order.items = items;
  if (total !== undefined) order.total = total;
  if (customer !== undefined) order.customer = customer;
  if (status !== undefined) order.status = status;
  res.json({ data: order });
};

const remove = (req, res) => {
  const id = Number(req.params.id);
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Order not found' });
  const removed = orders.splice(idx, 1)[0];
  res.json({ data: removed });
};

module.exports = { getAll, getById, create, update, remove };
