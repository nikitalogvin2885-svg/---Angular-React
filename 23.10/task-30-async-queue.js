/**
 * Задача 30: Последовательная асинхронная очередь (Async Queue Runner)
 * Микротаски, ограничение конкурентности
 */

class AsyncQueue {
  constructor() {
    this.queue = []; // Очередь задач
    this.processing = false; // Флаг обработки
    this.concurrency = 1; // Ограничение конкурентности (1 = строго по очереди)
    this.activeCount = 0; // Количество активных задач
  }

  /**
   * Добавляет задачу в очередь
   * @param {Function} taskFn - Асинхронная функция задачи
   * @returns {Promise} - Promise результата задачи
   */
  enqueue(taskFn) {
    return new Promise((resolve, reject) => {
      // Оборачиваем функцию для получения результата
      const wrappedTask = async () => {
        try {
          const result = await taskFn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      // Добавляем в очередь
      this.queue.push(wrappedTask);
      
      // Запускаем обработку, если нужно
      this.processQueue();
    });
  }

  /**
   * Обрабатывает очередь задач
   */
  processQueue() {
    // Если уже обрабатываем максимум задач — выходим
    if (this.activeCount >= this.concurrency) {
      return;
    }

    // Если очередь пуста — выходим
    if (this.queue.length === 0) {
      return;
    }

    // Увеличиваем счётчик активных задач
    this.activeCount++;

    // Берем следующую задачу из очереди
    const task = this.queue.shift();

    // Выполняем задачу
    task()
      .finally(() => {
        // Уменьшаем счётчик активных задач
        this.activeCount--;
        // Рекурсивно обрабатываем следующую задачу
        this.processQueue();
      });
  }

  /**
   * Возвращает размер очереди (ожидающие задачи)
   */
  get size() {
    return this.queue.length;
  }

  /**
   * Проверяет, идёт ли обработка
   */
  isBusy() {
    return this.activeCount > 0 || this.queue.length > 0;
  }

  /**
   * Очищает очередь (опционально)
   */
  clear() {
    this.queue = [];
  }
}

// Примеры использования:
/*
const queue = new AsyncQueue();

// Симуляция асинхронных операций
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const task1 = async () => {
  await delay(100);
  console.log('Task 1 completed');
  return 1;
};

const task2 = async () => {
  await delay(200);
  console.log('Task 2 completed');
  return 2;
};

const task3 = async () => {
  await delay(150);
  console.log('Task 3 completed');
  return 3;
};

// Добавляем задачи
console.log('Queue size before:', queue.size);

queue.enqueue(task1);
queue.enqueue(task2);
queue.enqueue(task3);

console.log('Queue size after enqueue:', queue.size);

// Ждём завершения
setTimeout(() => {
  console.log('Queue size after 500ms:', queue.size);
}, 500);

// С обработкой результатов
queue.enqueue(async () => {
  await delay(100);
  return 'Result from task';
}).then((result) => {
  console.log('Got result:', result);
});

// Очередь с ошибками
queue.enqueue(async () => {
  await delay(50);
  throw new Error('Task failed!');
}).catch((err) => {
  console.error('Task error:', err.message);
});
*/