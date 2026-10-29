/**
 * Задача 20: Дедупликация массива объектов по ключу
 * Уникализация коллекций
 */

function uniqueBy(array, key) {
  if (!Array.isArray(array)) {
    return [];
  }

  if (!key || typeof key !== 'string') {
    return array;
  }

  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    
    // Если ключ уже видели — пропускаем (не добавляем)
    if (seen.has(value)) {
      return false;
    }
    
    // Первый раз видим это значение — добавляем в Set и возвращаем true
    seen.add(value);
    return true;
  });
}

// Альтернативная реализация с использованием Map (сохраняет порядок первого вхождения):
function uniqueByMap(array, key) {
  if (!Array.isArray(array)) {
    return [];
  }

  const map = new Map();
  
  for (const item of array) {
    // Map сохраняет порядок первого добавления
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  }

  return Array.from(map.values());
}

// Примеры использования:
/*
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice (duplicate)' }, // дубликат
  { id: 3, name: 'Charlie' },
  { id: 2, name: 'Bob (duplicate)' }, // дубликат
];

console.log(uniqueBy(users, 'id'));
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' },
//   { id: 3, name: 'Charlie' },
// ]

// Сложные данные
const products = [
  { sku: 'A1', name: 'Product A' },
  { sku: 'B2', name: 'Product B' },
  { sku: 'A1', name: 'Product A (duplicate)' },
  { sku: 'C3', name: 'Product C' },
];

console.log(uniqueBy(products, 'sku'));
// Сохраняет первое вхождение каждого SKU
*/