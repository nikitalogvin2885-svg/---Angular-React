/**
 * Задача 28: Отмена устаревших запросов (AbortController)
 * Защита от Race Condition в React
 */

async function fetchWithTimeout(url, timeoutMs = 5000) {
  // Создаём AbortController для управления отменой
  const controller = new AbortController();
  const { signal } = controller;

  // Таймер для принудительной отмены
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    // Выполняем запрос с сигналом отмены
    const response = await fetch(url, {
      signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Различаем ошибку таймаута от других ошибок
    if (error.name === 'AbortError') {
      throw new AbortError(`Request timeout after ${timeoutMs}ms`);
    }
    // Пробрасываем оригинальную ошибку
    throw error;
  } finally {
    // Очищаем таймер в любом случае
    clearTimeout(timeoutId);
  }
}

// Кастомный класс ошибки для AbortError
class AbortError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AbortError';
  }
}

// Примеры использования:
/*
async function searchUsers(query) {
  const controller = new AbortController();
  
  // Отменяем предыдущий запрос при новом
  if (window.searchController) {
    window.searchController.abort();
  }
  window.searchController = controller;

  try {
    const results = await fetchWithTimeout(
      `/api/users/search?q=${encodeURIComponent(query)}`,
      3000
    );
    return results;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request was cancelled');
      return [];
    }
    throw error;
  }
}

// React компонент с useEffect:
/*
useEffect(() => {
  const controller = new AbortController();
  
  fetchWithTimeout('/api/data', 5000)
    .then((data) => setData(data))
    .catch((error) => {
      if (error.name !== 'AbortError') {
        setError(error);
      }
    });

  return () => controller.abort();
}, []);
*/