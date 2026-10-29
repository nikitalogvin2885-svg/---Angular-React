/**
 * Задача 16: Форматирование витрины товаров (.map)
 * Иммутабельная проекция данных
 */

function formatProducts(products) {
  return products.map((product) => {
    // Форматируем цену: разделители тысяч и знак валюты
    const formattedPrice = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(product.price);

    // Определяем возможность заказа
    const isOrderable = product.inStock && product.price > 0;

    return {
      ...product,
      displayPrice: formattedPrice,
      isOrderable,
    };
  });
}

// Примеры использования:
/*
const products = [
  { id: 1, name: 'Laptop', price: 99999, inStock: true },
  { id: 2, name: 'Mouse', price: 1500, inStock: false },
  { id: 3, name: 'Keyboard', price: 5000, inStock: true },
  { id: 4, name: 'Free Item', price: 0, inStock: true },
];

const formatted = formatProducts(products);
// [
//   { id: 1, name: 'Laptop', price: 99999, inStock: true, displayPrice: '99 999 ₽', isOrderable: true },
//   { id: 2, name: 'Mouse', price: 1500, inStock: false, displayPrice: '1 500 ₽', isOrderable: false },
//   { id: 3, name: 'Keyboard', price: 5000, inStock: true, displayPrice: '5 000 ₽', isOrderable: true },
//   { id: 4, name: 'Free Item', price: 0, inStock: true, displayPrice: '0 ₽', isOrderable: false },
// ]
*/