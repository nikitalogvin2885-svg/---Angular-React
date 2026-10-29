/**
 * Задача 27: Отказоустойчивый дашборд (Promise.allSettled)
 * Параллельные асинхронные комбинаторы
 */

async function loadDashboard() {
  // Параллельные запросы
  const promises = [
    fetch('/api/users').then((r) => r.json()).catch((e) => ({ error: e.message })),
    fetch('/api/stats').then((r) => r.json()).catch((e) => ({ error: e.message })),
    fetch('/api/notifications').then((r) => r.json()).catch((e) => ({ error: e.message })),
  ];

  // allSettled ждёт все промисы, не прерываясь на ошибки
  const results = await Promise.allSettled(promises);

  const successData = [];
  const errors = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      // Проверяем, есть ли ошибка в данных
      if (result.value.error) {
        errors.push({
          source: `request_${index + 1}`,
          error: result.value.error,
        });
      } else {
        successData.push(result.value);
      }
    } else {
      errors.push({
        source: `request_${index + 1}`,
        error: result.reason?.message || 'Unknown error',
      });
    }
  });

  return {
    successData,
    errors,
    // Удобные флаги для UI
    hasErrors: errors.length > 0,
    isComplete: true,
  };
}

// Примеры использования:
/*
async function main() {
  console.log('Loading dashboard...');
  
  const { successData, errors, hasErrors } = await loadDashboard();
  
  if (successData.length > 0) {
    console.log('✅ Loaded sections:', successData.length);
    console.log('Data:', successData);
  }
  
  if (errors.length > 0) {
    console.log('❌ Failed sections:', errors.length);
    errors.forEach(({ source, error }) => {
      console.log(`  - ${source}: ${error}`);
    });
  }
  
  // UI продолжает работать даже с ошибками
  renderDashboard(successData);
  showErrorBanner(errors);
}

// Эмуляция API для тестирования
function mockFetch(url) {
  const delays = [100, 200, 300];
  const shouldFail = { '/api/stats': true };
  
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail[url]) {
        resolve({ json: () => Promise.reject(new Error('Server error')) });
      } else {
        resolve({
          json: () => Promise.resolve({ data: url, timestamp: Date.now() }),
        });
      }
    }, delays[Math.floor(Math.random() * delays.length)]);
  });
}
*/