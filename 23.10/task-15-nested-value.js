/**
 * Задача 15: Безопасный экстрактор данных с fallback-значением
 * Optional Chaining (?.), Nullish Coalescing (??)
 */

function getNestedValue(data, fallback = undefined) {
  // Используем optional chaining для безопасного доступа
  // ?? для предоставления fallback, если значение null/undefined
  return data?.payload?.user?.settings?.theme ?? fallback;
}

// Примеры использования:
/*
// Полный путь существует
const fullData = {
  payload: {
    user: {
      settings: {
        theme: 'dark'
      }
    }
  }
};
console.log(getNestedValue(fullData, 'light')); // 'dark'

// Частичные данные
const partialData1 = {
  payload: {
    user: null
  }
};
console.log(getNestedValue(partialData1, 'light')); // 'light'

const partialData2 = {
  payload: null
};
console.log(getNestedValue(partialData2, 'light')); // 'light'

// Пустой объект
const emptyData = {};
console.log(getNestedValue(emptyData, 'light')); // 'light'

// Null/undefined
console.log(getNestedValue(null, 'light')); // 'light'
console.log(getNestedValue(undefined, 'light')); // 'light'

// Значение explicit undefined vs fallback
const dataWithUndefined = {
  payload: {
    user: {
      settings: {
        theme: undefined
      }
    }
  }
};
// ?? различает undefined и fallback
console.log(getNestedValue(dataWithUndefined, 'light')); // 'light'

// Для ситуаций, когда 0 или false — валидные значения
const dataWithZero = {
  payload: {
    user: {
      settings: {
        count: 0
      }
    }
  }
};
// ?? вернёт 0 (т.к. 0 — не null/undefined)
console.log(getNestedValue(dataWithZero, 10)); // 0
*/