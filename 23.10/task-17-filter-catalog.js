/**
 * Задача 17: Комбинированный фильтр каталога (.filter)
 * Предикатные функции
 */

function filterCatalog(items, criteria) {
  return items.filter((item) => {
    // Фильтр по категории
    if (criteria.category !== undefined && item.category !== criteria.category) {
      return false;
    }

    // Фильтр по максимальной цене
    if (criteria.maxPrice !== undefined && item.price > criteria.maxPrice) {
      return false;
    }

    // Фильтр по наличию
    if (criteria.onlyInStock !== undefined) {
      if (criteria.onlyInStock && !item.inStock) {
        return false;
      }
    }

    return true;
  });
}

// Примеры использования:
/*
const products = [
  { id: 1, name: 'Laptop', category: 'electronics', price: 99999, inStock: true },
  { id: 2, name: 'T-Shirt', category: 'clothing', price: 2500, inStock: true },
  { id: 3, name: 'Coffee', category: 'food', price: 500, inStock: false },
  { id: 4, name: 'Phone', category: 'electronics', price: 59999, inStock: true },
  { id: 5, name: 'Jeans', category: 'clothing', price: 4500, inStock: false },
];

console.log(filterCatalog(products, { category: 'electronics' }));
// [{ id: 1, ... }, { id: 4, ... }]

console.log(filterCatalog(products, { maxPrice: 5000, onlyInStock: true }));
// [{ id: 2, ... }]

console.log(filterCatalog(products, { category: 'clothing', maxPrice: 5000 }));
// [{ id: 2, ... }] (jeans costs 4500 and is in stock)

console.log(filterCatalog(products, { onlyInStock: true }));
// [{ id: 1, ... }, { id: 2, ... }, { id: 4, ... }]
*/