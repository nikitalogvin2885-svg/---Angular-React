/**
 * Задача 23: Рекурсивный Deep Merge конфигураций
 * Слияние объектов
 */

function deepMerge(target, source) {
  // Создаём новый объект (не мутируем target!)
  const result = { ...target };

  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = result[key];

    // Если оба значения — объекты (и не null), мержим рекурсивно
    if (
      sourceValue !== null &&
      typeof sourceValue === 'object' &&
      targetValue !== null &&
      typeof targetValue === 'object' &&
      !Array.isArray(sourceValue) &&
      !Array.isArray(targetValue)
    ) {
      // Рекурсивный merge для вложенных объектов
      result[key] = deepMerge(targetValue, sourceValue);
    } else {
      // Примитивы и массивы — перезаписываем
      result[key] = sourceValue;
    }
  }

  return result;
}

// Примеры использования:
/*
const defaultConfig = {
  app: {
    name: 'MyApp',
    version: '1.0.0',
    features: {
      darkMode: true,
      notifications: true,
    },
  },
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
  },
};

const userConfig = {
  app: {
    features: {
      darkMode: false, // Перезаписываем
      analytics: true, // Добавляем новый ключ
    },
  },
  api: {
    baseUrl: 'https://api.dev.example.com', // Перезаписываем
  },
};

const merged = deepMerge(defaultConfig, userConfig);
// {
//   app: {
//     name: 'MyApp',          // Из default
//     version: '1.0.0',       // Из default
//     features: {
//       darkMode: false,      // Перезаписано из userConfig
//       notifications: true,  // Из default (не было в userConfig)
//       analytics: true,      // Из userConfig (новый ключ)
//     },
//   },
//   api: {
//     baseUrl: 'https://api.dev.example.com', // Перезаписано
//     timeout: 5000,           // Из default
//     retries: 3,              // Из default
//   },
// }

// Проверяем, что оригиналы не мутированы
console.log(defaultConfig.app.features.darkMode); // true (не изменился)
*/