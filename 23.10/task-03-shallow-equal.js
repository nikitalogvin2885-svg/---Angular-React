/**
 * Задача 03: Алгоритм поверхностного сравнения (Shallow Equal)
 * Оптимизация рендера, мемоизация
 */

function shallowEqual(objA, objB) {
  // Проверка на одинаковые ссылки
  if (Object.is(objA, objB)) {
    return true;
  }

  // Проверка, что оба объекта являются объектами (не null)
  if (objA === null || objB === null) {
    return false;
  }

  // Проверка, что оба являются "плоскими" объектами (не массивы, не функции)
  const isObjectA = typeof objA === 'object' && objA !== null && !Array.isArray(objA);
  const isObjectB = typeof objB === 'object' && objB !== null && !Array.isArray(objB);

  if (!isObjectA || !isObjectB) {
    // Для примитивов (числа, строки, булеаны) уже вернём false на этапе Object.is
    return false;
  }

  // Сравниваем количество собственных ключей
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Сравниваем каждое поле через Object.is
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    
    // Проверяем, что ключ есть в objB
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }

    // Сравниваем значения через Object.is (строгое сравнение с учётом NaN)
    if (!Object.is(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

// Примеры использования:
/*
const a = { x: 1, y: 'hello' };
const b = { x: 1, y: 'hello' };
const c = { x: 1, y: 'world' };

console.log(shallowEqual(a, b)); // true
console.log(shallowEqual(a, c)); // false

// Сравнение с одинаковой ссылкой
console.log(shallowEqual(a, a)); // true

// Сравнение с null/undefined
console.log(shallowEqual(null, null)); // true
console.log(shallowEqual(a, null)); // false
console.log(shallowEqual({}, null)); // false

// Глубокое сравнение не работает (только поверхностное)
const deepA = { nested: { value: 1 } };
const deepB = { nested: { value: 1 } };
console.log(shallowEqual(deepA, deepB)); // false — разные вложенные объекты

// NaN корректно обрабатывается
console.log(shallowEqual({ x: NaN }, { x: NaN })); // true
*/