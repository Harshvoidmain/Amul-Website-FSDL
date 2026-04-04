const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, default: '' },
  slug: { type: String, default: '' }
}, { timestamps: true });

module.exports = model('Category', categorySchema);
