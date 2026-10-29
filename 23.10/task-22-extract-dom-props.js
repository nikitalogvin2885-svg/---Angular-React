/**
 * Задача 22: Исключение кастомных пропсов (Omit Props)
 * Rest-деструктуризация объектов
 */

function extractDomProps(allProps, customKeysArray = []) {
  // Деструктурируем с Rest для разделения DOM и кастомных пропсов
  const {
    // Кастомные ключи из массива
    ...domProps
  } = allProps;

  // Удаляем кастомные ключи, которые могут быть в объекте
  for (const key of customKeysArray) {
    delete domProps[key];
  }

  // Также удаляем React-специфичные пропсы, которые нельзя передавать в DOM
  const reactSpecific = ['children', 'key', 'ref'];
  for (const key of reactSpecific) {
    delete domProps[key];
  }

  return domProps;
}

// Примеры использования:
/*
const props = {
  // DOM-атрибуты
  id: 'my-input',
  className: 'form-control',
  value: 'test',
  placeholder: 'Enter text',
  disabled: false,
  
  // Кастомные пропсы фреймворка
  variant: 'outlined',
  size: 'medium',
  error: false,
  helperText: 'This is help',
  
  // React-специфичные
  children: 'Input label',
};

const domOnly = extractDomProps(props, ['variant', 'size', 'error', 'helperText']);
// {
//   id: 'my-input',
//   className: 'form-control',
//   value: 'test',
//   placeholder: 'Enter text',
//   disabled: false,
// }

// Безопасная передача в нативный HTML-тег
const input = document.createElement('input');
Object.assign(input, domOnly);
*/