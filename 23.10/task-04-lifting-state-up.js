/**
 * Задача 04: Поднятие состояния (Lifting State Up)
 * Однонаправленный поток данных (Unidirectional Data Flow)
 */

// Parent компонент — хранит состояние count
function Parent() {
  let count = 0;
  const listeners = [];

  // Публичный API для подписчиков (упрощённая версия)
  function subscribe(callback) {
    listeners.push(callback);
    return () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };
  }

  // Уведомление подписчиков об изменении
  function notify() {
    listeners.forEach(callback => callback(count));
  }

  return {
    getCount() {
      return count;
    },
    increment() {
      count++;
      notify();
    },
    subscribe,
  };
}

// Child компонент — принимает count и колбэк onIncrement
// Не имеет права напрямую мутировать переменную родителя!
function Child(state) {
  // state содержит: count, onIncrement
  const { count, onIncrement } = state;

  return {
    render: () => `
      <div class="child">
        <p>Count: ${count}</p>
        <button onclick="onIncrement()">Increment</button>
      </div>
    `,
  };
}

// Пример использования:
/*
const parentState = Parent();

// Подписываемся на изменения для обновления UI
const unsubscribe = parentState.subscribe((count) => {
  console.log(`Count changed to: ${count}`);
});

// Создаём дочерний компонент
const child = Child({
  count: parentState.getCount(),
  onIncrement: () => parentState.increment(),
});

// При клике на кнопку child вызовет onIncrement, который:
// 1. Не мутирует переменную напрямую (а вызывает метод родителя)
// 2. Родитель обновляет своё состояние
// 3. Родитель уведомляет подписчиков
// 4. UI обновляется с новым значением

// cleanup при размонтировании
unsubscribe();
*/