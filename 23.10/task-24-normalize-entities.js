/**
 * Задача 24: Нормализация реляционных сущностей (byId & allIds)
 * Нормализация стейта, доступ O(1)
 */

/**
 * Преобразует плоский массив в нормализованную структуру
 */
function normalizeEntities(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('Входной параметр должен быть массивом');
  }

  return {
    byId: Object.fromEntries(array.map((item) => [item.id, { ...item }])),
    allIds: array.map((item) => item.id),
  };
}

/**
 * Точечно обновляет поля сущности за O(1) с сохранением ссылочной целостности
 */
function patchEntityById(state, id, patch) {
  const currentEntity = state.byId[id];

  if (!currentEntity) {
    console.warn(`Сущность с ID "${id}" не найдена.`);
    return state;
  }

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...currentEntity,
        ...patch,
        updatedAt: Date.now(),
      },
    },
  };
}

/**
 * Удаляет сущность из словаря и индексного массива
 */
function removeEntityById(state, idToDelete) {
  if (!state.byId[idToDelete]) {
    return state;
  }

  const { [idToDelete]: removed, ...remainingById } = state.byId;

  return {
    byId: remainingById,
    allIds: state.allIds.filter((id) => id !== idToDelete),
  };
}

// Примеры использования:
/*
const rawData = [
  { id: 'usr_1', name: 'Alice', role: 'admin' },
  { id: 'usr_2', name: 'Bob', role: 'editor' },
  { id: 'usr_3', name: 'Charlie', role: 'viewer' },
];

// Нормализация
const normalized = normalizeEntities(rawData);
// {
//   byId: {
//     usr_1: { id: 'usr_1', name: 'Alice', role: 'admin' },
//     usr_2: { id: 'usr_2', name: 'Bob', role: 'editor' },
//     usr_3: { id: 'usr_3', name: 'Charlie', role: 'viewer' },
//   },
//   allIds: ['usr_1', 'usr_2', 'usr_3'],
// }

// Доступ O(1) по ID
const user = normalized.byId['usr_2']; // { id: 'usr_2', name: 'Bob', role: 'editor' }

// Точечное обновление за O(1)
const updatedState = patchEntityById(normalized, 'usr_2', { role: 'admin' });
// byId['usr_2'] теперь имеет новый объект с role: 'admin'

// Удаление за O(N) из-за filter, но O(1) для структуры byId
const afterDelete = removeEntityById(updatedState, 'usr_1');
*/