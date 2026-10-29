/**
 * Задача 18: Переключение флага в массиве объектов (.map)
 * Иммутабельный update элемента списка
 */

function toggleTodoStatus(todos, todoId) {
  return todos.map((todo) => {
    // Ищем задачу с нужным ID
    if (todo.id === todoId) {
      // Инвертируем флаг done
      return {
        ...todo,
        done: !todo.done,
      };
    }
    // Остальные задачи возвращаем без изменений
    return todo;
  });
}

// Примеры использования:
/*
const todos = [
  { id: 1, text: 'Learn JavaScript', done: false },
  { id: 2, text: 'Build a project', done: true },
  { id: 3, text: 'Write tests', done: false },
];

const updated1 = toggleTodoStatus(todos, 1);
// [
//   { id: 1, text: 'Learn JavaScript', done: true },
//   { id: 2, text: 'Build a project', done: true },
//   { id: 3, text: 'Write tests', done: false },
// ]

const updated2 = toggleTodoStatus(updated1, 2);
// [
//   { id: 1, text: 'Learn JavaScript', done: true },
//   { id: 2, text: 'Build a project', done: false }, ← инвертировано обратно
//   { id: 3, text: 'Write tests', done: false },
// ]

// Проверяем иммутабельность
console.log(todos === updated1); // false — новый массив
console.log(todos[0] === updated1[0]); // false — изменённый объект
console.log(todos[1] === updated1[1]); // true — неизменённый объект (React.memo сработает)
console.log(todos[2] === updated1[2]); // true — неизменённый объект
*/