/**
 * Задача 11: Рекурсивный Deep Freeze
 * Мутабельность, защита объектов
 */

function deepFreeze(object) {
  // Получаем собственные ключи объекта
  const ownKeys = Object.getOwnPropertyNames(object);
  
  // Замораживаем каждое свойство
  ownKeys.forEach((key) => {
    const value = object[key];
    
    // Если значение - объект (и не null), рекурсивно замораживаем
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  });

  // Замораживаем сам объект
  return Object.freeze(object);
}

// Примеры использования:
/*
const user = {
  name: 'Alice',
  settings: {
    theme: 'dark',
    notifications: {
      email: true,
      push: false,
    },
  },
};

deepFreeze(user);

// Попытка изменить примитив — безуспешно
user.name = 'Bob'; // Strict mode: TypeError

// Попытка изменить вложенный объект — безуспешно
user.settings.theme = 'light'; // Strict mode: TypeError

// Попытка добавить новое свойство — безуспешно
user.settings.newProp = 'value'; // Strict mode: TypeError

// Массивы тоже замораживаются
const arr = [1, 2, { nested: true }];
deepFreeze(arr);
arr[0] = 999; // TypeError
arr[2].nested = false; // TypeError

// Проверка
console.log(Object.isFrozen(user)); // true
console.log(Object.isFrozen(user.settings)); // true
console.log(Object.isFrozen(user.settings.notifications)); // true
*/