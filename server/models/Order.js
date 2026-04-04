const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  items: [{ productId: Schema.Types.ObjectId, qty: Number }],
  total: { type: Number, required: true },
  customer: { type: Object, default: null },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = model('Order', orderSchema);
