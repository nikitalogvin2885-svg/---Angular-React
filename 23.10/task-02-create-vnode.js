/**
 * Задача 02: Эмуляция функции React.createElement
 * Virtual DOM, фабрика узлов
 */

function createVNode(type, props, ...children) {
  // Обрабатываем дочерние элементы
  // Одиночные текстовые дети остаются строками/числами, не оборачиваются в массивы
  
  // Фильтруем null/undefined из children, но сохраняем 0 и false как валидные
  const processedChildren = children.reduce((acc, child) => {
    if (child !== null && child !== undefined) {
      acc.push(child);
    }
    return acc;
  }, []);

  // Если только один дочерний элемент — храним его напрямую (не в массиве)
  // Это оптимизация для текстовых узлов
  const finalChildren = processedChildren.length === 1 
    ? processedChildren[0] 
    : processedChildren;

  return {
    type,
    props: {
      ...props,
      children: finalChildren,
    },
    key: props?.key ?? null,
  };
}

// Примеры использования:
/*
// Простой элемент
const vNode1 = createVNode('div', { className: 'container' }, 'Hello');

// Вложенные элементы
const vNode2 = createVNode(
  'div',
  { className: 'card' },
  createVNode('h1', null, 'Title'),
  createVNode('p', null, 'Description')
);

// С одним текстовым ребёнком (не оборачивается в массив)
const vNode3 = createVNode('span', null, 'Just text');
console.log(vNode3.props.children); // 'Just text', не ['Just text']

// С несколькими детьми (массив)
const vNode4 = createVNode('ul', null, 
  createVNode('li', null, 'Item 1'),
  createVNode('li', null, 'Item 2')
);
console.log(Array.isArray(vNode4.props.children)); // true
*/