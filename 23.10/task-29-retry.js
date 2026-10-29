/**
 * Задача 29: Утилита автоматических повторов (Retry Pattern)
 * Обработка нестабильных сетевых соединений
 */

async function retry(asyncFn, retries = 3, delayMs = 500) {
  // Проверяем аргументы
  if (typeof asyncFn !== 'function') {
    throw new TypeError('First argument must be a function');
  }
  if (typeof retries !== 'number' || retries < 0) {
    retries = 3;
  }
  if (typeof delayMs !== 'number' || delayMs < 0) {
    delayMs = 500;
  }

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Пытаемся выполнить функцию
      return await asyncFn();
    } catch (error) {
      lastError = error;
      
      // Если это последняя попытка — выбрасываем ошибку
      if (attempt === retries) {
        console.error(`[retry] Failed after ${retries + 1} attempts`);
        throw error;
      }

      // Вычисляем задержку (можно добавить exponential backoff)
      const currentDelay = delayMs * (attempt + 1); // Простая линейная задержка
      
      console.warn(`[retry] Attempt ${attempt + 1} failed, retrying in ${currentDelay}ms...`, 
        error.message);
      
      // Ждём перед следующей попыткой
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
    }
  }

  // Теоретически сюда не должны попадать
  throw lastError;
}

// Расширенная версия с exponential backoff и jitter
async function retryWithBackoff(asyncFn, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 500,
    maxDelay = 10000,
    factor = 2,
    jitter = true,
    onRetry = () => {},
  } = options;

  let lastError;
  let currentDelay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        throw lastError;
      }

      // Callback для логирования
      onRetry(error, attempt, currentDelay);

      // Добавляем jitter для предотвращения thundering herd
      const jitterValue = jitter ? Math.random() * currentDelay : 0;
      const delay = Math.min(currentDelay + jitterValue, maxDelay);

      await new Promise((resolve) => setTimeout(resolve, delay));

      // Увеличиваем задержку для следующей попытки
      currentDelay = Math.min(currentDelay * factor, maxDelay);
    }
  }

  throw lastError;
}

// Примеры использования:
/*
// Простое использование
const fetchWithRetry = () => retry(
  () => fetch('/api/data').then((r) => r.json()),
  3,
  1000
);

fetchWithRetry()
  .then((data) => console.log('Success:', data))
  .catch((err) => console.error('Failed:', err));

// С exponential backoff
const unstableOperation = async () => {
  if (Math.random() > 0.7) {
    throw new Error('Random failure');
  }
  return { success: true };
};

retryWithBackoff(unstableOperation, {
  maxRetries: 5,
  initialDelay: 100,
  factor: 2,
  onRetry: (err, attempt, delay) => {
    console.log(`Retry #${attempt} after ${delay.toFixed(0)}ms: ${err.message}`);
  },
})
  .then((result) => console.log('Result:', result))
  .catch((err) => console.error('Final failure:', err.message));
*/