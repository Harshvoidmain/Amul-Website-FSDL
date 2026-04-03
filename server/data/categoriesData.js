const categories = [
  { id: 1, name: 'Milk', icon: '🥛' },
  { id: 2, name: 'Cheese', icon: '🧀' },
  { id: 3, name: 'Butter', icon: '🧈' },
  { id: 4, name: 'Ice Cream', icon: '🍦' },
  { id: 5, name: 'Chocolates', icon: '🍫' }
];

let nextId = categories.length + 1;

function getNextId() {
  return nextId++;
}

module.exports = { categories, getNextId };
