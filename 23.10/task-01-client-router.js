/**
 * Задача 01: Клиентский роутер на History API
 * Архитектура SPA, клиентская маршрутизация
 */

class ClientRouter {
  constructor(routes) {
    this.routes = routes;
    
    // Привязываем обработчики
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
    
    // Подключаем глобальные слушатели
    document.addEventListener('click', this.handleLinkClick);
    window.addEventListener('popstate', this.handlePopState);
    
    // Рендерим текущий путь при инициализации
    this.navigate(window.location.pathname, false);
  }

  handleLinkClick(event) {
    const link = event.target.closest('a');
    
    // Игнорируем:
    // - ссылки без href
    // - внешние ссылки (другой домен)
    // - специальные клавиши (Ctrl, Shift и т.д.)
    if (!link || 
        !link.href || 
        link.target === '_blank' || 
        event.ctrlKey || 
        event.metaKey ||
        event.shiftKey ||
        event.altKey) {
      return;
    }

    const url = new URL(link.href);
    
    // Проверяем, что это тот же домен
    if (url.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    this.navigate(url.pathname, true);
  }

  handlePopState(event) {
    // При навигации кнопками браузера выполняем рендер
    this.navigate(window.location.pathname, false);
  }

  navigate(path, pushState = true) {
    // Добавляем в историю если нужно
    if (pushState) {
      window.history.pushState({}, '', path);
    }

    // Ищем обработчик маршрута
    const handler = this.routes[path];
    
    if (handler) {
      const htmlContent = handler();
      this.render(htmlContent);
    } else {
      // Роутер 404 — можно добавить отдельный обработчик
      this.render(this.routes['/404'] ? this.routes['/404']() : '<h1>404 Not Found</h1>');
    }
  }

  render(content) {
    // Очищаем контейнер и монтируем новое содержимое
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = content;
    }
  }

  // Для тестирования: очистка слушателей
  destroy() {
    document.removeEventListener('click', this.handleLinkClick);
    window.removeEventListener('popstate', this.handlePopState);
  }
}

// Пример использования:
/*
const router = new ClientRouter({
  '/': () => '<h1>Главная</h1><p>Добро пожаловать!</p>',
  '/about': () => '<h1>О нас</h1><p>Информация о компании</p>',
  '/contact': () => '<h1>Контакты</h1><p>email: info@example.com</p>',
});
*/