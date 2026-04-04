const products = [
  { id: 1, name: 'Milk', price: 2.5, description: 'Fresh whole milk', category: 'milk', image: '/images/milk.png' },
  { id: 2, name: 'Cheese', price: 4.0, description: 'Cheddar cheese', category: 'cheese', image: '/images/cheese.png' }
];

let nextId = products.length + 1;

function getNextId() {
  return nextId++;
}

module.exports = { products, getNextId };
