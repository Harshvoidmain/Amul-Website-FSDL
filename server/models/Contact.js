const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true }
}, { timestamps: true });

module.exports = model('Contact', contactSchema);
