// server/controllers/contactController.js

const { getAllContacts, addContact } = require('../data/contact');

// GET all contacts
const getContacts = (req, res) => {
  try {
    const contacts = getAllContacts();

    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contacts' });
  }
};

// POST new contact
const createContact = (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // Basic validation
    if (!firstName || !email || !message) {
      return res.status(400).json({ success: false, message: 'Required fields: firstName, email, message' });
    }

    const newContact = {
      id: Date.now(),
      firstName,
      lastName: lastName || '',
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString()
    };

    addContact(newContact);

    res.status(201).json({ success: true, data: newContact, message: 'Contact submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating contact' });
  }
};

module.exports = { getContacts, createContact };