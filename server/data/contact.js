// server/data/contactdata.js

let contacts = [];

const getAllContacts = () => contacts;

const addContact = (contact) => {
  contacts.push(contact);
  return contact;
};

module.exports = {
  getAllContacts,
  addContact
};