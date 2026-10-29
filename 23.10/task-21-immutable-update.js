/**
 * Задача 21: Трехуровневое иммутабельное обновление стейта
 * Spread-оператор, ссылочная целостность
 */

// Исходный стейт с трёхуровневой вложенностью
const state = {
  user: {
    profile: {
      notifications: {
        email: true,
        push: false,
      },
      name: 'Alice',
    },
  },
  posts: [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
  ],
  settings: {
    theme: 'light',
  },
};

/**
 * Обновляем state.user.profile.notifications.email на противоположное значение
 * Все затронутые родительские объекты получают новые ссылки
 * Нетронутые ветки (posts) сохраняют исходные ссылки
 */
function toggleEmailNotification(currentState) {
  return {
    ...currentState,
    user: {
      ...currentState.user,
      profile: {
        ...currentState.user.profile,
        notifications: {
          ...currentState.user.profile.notifications,
          email: !currentState.user.profile.notifications.email,
        },
      },
    },
  };
}

// Пример использования:
/*
const newState = toggleEmailNotification(state);

console.log('Original email:', state.user.profile.notifications.email); // true
console.log('New email:', newState.user.profile.notifications.email);   // false

// Проверяем ссылочную целостность:
console.log(state === newState);                                      // false — корень изменился
console.log(state.user === newState.user);                            // false
console.log(state.user.profile === newState.user.profile);            // false
console.log(state.user.profile.notifications === newState.user.profile.notifications); // false
console.log(state.user.profile.name === newState.user.profile.name);  // true — не изменилось, ссылка та же

// state.posts сохранил свою ссылку (ключевой момент для React.memo)!
console.log(state.posts === newState.posts);                          // true
console.log(state.posts[0] === newState.posts[0]);                    // true
console.log(state.settings === newState.settings);                    // true — не изменилось
*/