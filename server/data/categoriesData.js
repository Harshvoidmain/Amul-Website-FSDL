const categories = [
  { id: 1, name: 'Milk', slug: 'milk', icon: '/images/cat-milk.png' },
  { id: 2, name: 'Cheese', slug: 'cheese', icon: '/images/cat-cheese.png' },
  { id: 3, name: 'Butter', slug: 'butter', icon: '/images/cat-butter.png' },
  { id: 4, name: 'Ice Cream', slug: 'ice-cream', icon: '/images/cat-icecream.png' },
  { id: 5, name: 'Chocolates', slug: 'chocolates', icon: '/images/cat-chocolate.png' }
];

let nextId = categories.length + 1;

function getNextId() {
  return nextId++;
}

module.exports = { categories, getNextId };
