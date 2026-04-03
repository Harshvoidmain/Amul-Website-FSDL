const orders = [];

let nextId = 1;

function getNextId() {
  return nextId++;
}

module.exports = { orders, getNextId };
