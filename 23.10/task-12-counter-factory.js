/**
 * Задача 12: Фабрика счетчиков с изолированным состоянием
 * Замыкания (Closures), лексическое окружение
 */

function createCounter(initialValue = 0, step = 1) {
  // Закрытая переменная — недоступна извне
  let count = initialValue;

  // Возвращаем объект с методами
  return {
    inc() {
      count += step;
      return count;
    },
    
    dec() {
      count -= step;
      return count;
    },
    
    reset() {
      count = initialValue;
      return count;
    },
    
    get() {
      return count;
    },
  };
}

// Примеры использования:
/*
const counter1 = createCounter(10, 2);
const counter2 = createCounter(0, 1);

console.log(counter1.get()); // 10
console.log(counter2.get()); // 0

counter1.inc();
counter1.inc();
console.log(counter1.get()); // 14

counter2.dec();
console.log(counter2.get()); // -1

counter1.reset();
console.log(counter1.get()); // 10

// Попытка доступа к переменной извне — невозможно
console.log(count); // ReferenceError: count is not defined
console.log(counter1.count); // undefined
*/