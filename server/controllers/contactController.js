// server/controllers/contactController.js

const Contact = require('../models/Contact');
const { getAllContacts, addContact } = require('../data/contact');

// GET all contacts
const getContacts = async (req, res) => {
  try {
    // try DB
    try {
      if (Contact.find) {
        const docs = await Contact.find().lean();
        return res.status(200).json({ success: true, data: docs });
      }
    } catch (err) {
      console.error('DB contact fetch error:', err.message);
    }

    const contacts = getAllContacts();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contacts' });
  }
};

// POST new contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // Basic validation
    if (!firstName || !email || !message) {
      return res.status(400).json({ success: false, message: 'Required fields: firstName, email, message' });
    }

    const newContact = {
      firstName,
      lastName: lastName || '',
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString()
    };

    // try DB first (ensure we don't pass a numeric `id` which would be interpreted as _id)
    try {
      if (Contact.create) {
        const dbPayload = { ...newContact };
        // create without any custom id so MongoDB will assign an ObjectId
        if (dbPayload.id) delete dbPayload.id;
        const doc = await Contact.create(dbPayload);
        return res.status(201).json({ success: true, data: doc, message: 'Contact submitted successfully' });
      }
    } catch (err) {
      console.error('DB contact create error:', err && err.message ? err.message : err);
    }

    // fallback to in-memory store (keep legacy numeric id here)
    const memContact = { id: Date.now(), ...newContact };
    addContact(memContact);

    res.status(201).json({ success: true, data: memContact, message: 'Contact submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating contact' });
  }
};

module.exports = { getContacts, createContact };