const products = [
  { id: 1, name: 'Milk', price: 2.5, description: 'Fresh whole milk' },
  { id: 2, name: 'Cheese', price: 4.0, description: 'Cheddar cheese' }
];

let nextId = products.length + 1;

function getNextId() {
  return nextId++;
}

module.exports = { products, getNextId };
