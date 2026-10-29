/**
 * Задача 05: Рендерер виртуального дерева в строку (SSR Engine)
 * Virtual DOM, компиляция разметки
 */

// Предполагаем структуру vNode из задачи 02:
// { type: 'string', props: { attr1: value, attr2: value, children: ... }, key: ... }

function renderToHTML(vNode) {
  // Обработка null/undefined — ничего не рендерим
  if (vNode === null || vNode === undefined) {
    return '';
  }

  // Обработка примитивов (строки, числа)
  if (typeof vNode !== 'object') {
    return String(vNode);
  }

  // Обработка массива детей
  if (Array.isArray(vNode)) {
    return vNode.map(renderToHTML).join('');
  }

  // Обработка текстовых узлов внутри объекта (без type)
  if (!vNode.type) {
    return String(vNode.props?.children ?? '');
  }

  const { type, props } = vNode;
  const { children, className, style, ...attributes } = props;

  // Формируем атрибуты
  let attrsString = '';

  // className -> class (если есть)
  if (className !== undefined) {
    attrsString += ` class="${className}"`;
  }

  // style объект -> строка
  if (style !== undefined) {
    if (typeof style === 'object') {
      const styleString = Object.entries(style)
        .map(([key, value]) => {
          // kebab-case для CSS свойств
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          return `${cssKey}: ${value}`;
        })
        .join('; ');
      attrsString += ` style="${styleString}"`;
    } else if (typeof style === 'string') {
      attrsString += ` style="${style}"`;
    }
    // Если style null/undefined — игнорируем
  }

  // Остальные атрибуты
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null && key !== 'key') {
      // Boolean атрибуты
      if (value === true) {
        attrsString += ` ${key}`;
      } else if (value === false) {
        // Не добавляем false атрибуты
      } else {
        // Экранируем HTML-символы в значениях
        const escapedValue = String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
        attrsString += ` ${key}="${escapedValue}"`;
      }
    }
  });

  // Самозакрывающиеся теги
  const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

  if (selfClosingTags.includes(type)) {
    return `<${type}${attrsString}>`;
  }

  // Рекурсивно рендерим детей
  const childrenHTML = children !== undefined
    ? renderToHTML(children)
    : '';

  return `<${type}${attrsString}>${childrenHTML}</${type}>`;
}

// Примеры использования:
/*
const vNode = {
  type: 'div',
  props: {
    className: 'container',
    style: { backgroundColor: '#f0f0f0', padding: '20px' },
    'data-testid': 'main-container',
    children: [
      {
        type: 'h1',
        props: { children: 'Hello, World!' }
      },
      {
        type: 'p',
        props: { 
          className: 'description',
          children: 'This is a paragraph with <escaped> chars'
        }
      },
      {
        type: 'input',
        props: { 
          type: 'text', 
          value: 'test',
          disabled: true 
        }
      }
    ]
  }
};

const html = renderToHTML(vNode);
// <div class="container" style="background-color: #f0f0f0; padding: 20px" data-testid="main-container"><h1>Hello, World!</h1><p class="description">This is a paragraph with &lt;escaped&gt; chars</p><input type="text" value="test" disabled></div>
*/