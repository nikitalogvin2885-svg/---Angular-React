/**
 * Задача 19: Группировка списка по категориям (.reduce)
 * Агрегация данных
 */

function groupProductsByCategory(items) {
  return items.reduce((result, item) => {
    const category = item.category;

    // Если категории ещё нет в результате, создаём пустой массив
    if (!result[category]) {
      result[category] = [];
    }

    // Добавляем товар в соответствующую категорию
    result[category].push(item);

    return result;
  }, {});
}

// Примеры использования:
/*
const products = [
  { id: 1, name: 'Laptop', category: 'electronics' },
  { id: 2, name: 'T-Shirt', category: 'clothing' },
  { id: 3, name: 'Coffee', category: 'food' },
  { id: 4, name: 'Phone', category: 'electronics' },
  { id: 5, name: 'Jeans', category: 'clothing' },
];

const grouped = groupProductsByCategory(products);
// {
//   electronics: [
//     { id: 1, name: 'Laptop', category: 'electronics' },
//     { id: 4, name: 'Phone', category: 'electronics' },
//   ],
//   clothing: [
//     { id: 2, name: 'T-Shirt', category: 'clothing' },
//     { id: 5, name: 'Jeans', category: 'clothing' },
//   ],
//   food: [
//     { id: 3, name: 'Coffee', category: 'food' },
//   ],
// }

// Если нужна сортировка по алфавиту:
function groupAndSortByCategory(items) {
  return items.reduce((result, item) => {
    const category = item.category;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(item);
    return result;
  }, {});
}
*/