/**
 * Задача 26: Промисификация функции задержки (delay)
 * Promise API
 */

function wait(milliseconds) {
  return new Promise((resolve) => {
    // Проверяем, что значение положительное
    if (typeof milliseconds !== 'number' || milliseconds < 0) {
      console.warn('wait: milliseconds should be a non-negative number');
      milliseconds = 0;
    }

    // setTimeout разрешает Promise через указанное время
    setTimeout(() => {
      resolve(milliseconds);
    }, milliseconds);
  });
}

// Примеры использования:
/*
async function demo() {
  console.log('Start');
  
  await wait(1000); // Ждём 1 секунду
  console.log('After 1 second');
  
  await wait(500); // Ждём ещё 0.5 секунды
  console.log('After 1.5 seconds total');
  
  console.log('Done');
}

// С цепочкой
wait(2000)
  .then((ms) => console.log(`Resolved after ${ms}ms`))
  .catch((err) => console.error('Error:', err));

// Использование с map для параллельных задержек
const delays = [100, 200, 300];
Promise.all(delays.map(wait)).then(() => 
  console.log('All delays completed')
);
*/