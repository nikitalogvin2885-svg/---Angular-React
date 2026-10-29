/**
 * Задача 13: Универсальный мемоизатор (Memoize Function)
 * Чистые функции, кэширование вычислений
 */

function memoize(fn) {
  // Хранилище кэша: Map<key, result>
  const cache = new Map();

  return function (...args) {
    // Создаём ключ из аргументов
    // Используем JSON.stringify для сериализации (простое решение)
    // Для сложных объектов можно использовать WeakMap или кастомный хеш
    const key = JSON.stringify(args);

    // Проверяем кэш
    if (cache.has(key)) {
      console.log(`[memoize] Cache hit for ${key}`);
      return cache.get(key);
    }

    // Вычисляем результат
    console.log(`[memoize] Computing for ${key}`);
    const result = fn.apply(this, args);

    // Сохраняем в кэш
    cache.set(key, result);

    return result;
  };
}

// Примеры использования:
/*
// Мемоизация чистой функции
const expensiveFn = memoize((a, b) => {
  console.log('Computing...');
  return a + b;
});

console.log(expensiveFn(2, 3)); // Computing... → 5
console.log(expensiveFn(2, 3)); // Cache hit → 5 (без лога "Computing...")
console.log(expensiveFn(4, 5)); // Computing... → 9

// Фибоначчи с мемоизацией
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // 55
console.log(fibonacci(10)); // Cache hit → 55

// Мемоизация с объектами
const getKey = memoize((config) => {
  console.log('Processing config...');
  return config.name.toUpperCase();
});

console.log(getKey({ name: 'test' })); // Processing config... → "TEST"
console.log(getKey({ name: 'test' })); // Cache hit → "TEST"
*/