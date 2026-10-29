/**
 * Задача 10: Эмуляция протокола HMR over WebSocket
 * Hot Module Replacement, архитектура Vite
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

// Создаём HTTP сервер для статических файлов
const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? './index.html' : '.' + req.url;
  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
      res.end(content);
    }
  });
});

// Создаём WebSocket сервер
const wss = new WebSocketServer({ server });

// Файл для отслеживания
const watchedFile = path.resolve(__dirname, 'test.js');

wss.on('connection', (ws) => {
  console.log('📡 Client connected');

  // Отправляем приветственное сообщение
  ws.send(JSON.stringify({
    type: 'connected',
    message: 'HMR server ready',
  }));

  ws.on('close', () => {
    console.log('📡 Client disconnected');
  });
});

// Отслеживаем изменения в файле
fs.watch(watchedFile, (eventType, filename) => {
  console.log(`📝 File changed: ${filename} (${eventType})`);

  // Отправляем сообщение reload всем подключенным клиентам
  const message = JSON.stringify({
    type: 'reload',
    timestamp: Date.now(),
  });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // WebSocket.OPEN
      console.log('  → Sending reload to client');
      client.send(message);
    }
  });
});

// Запуск сервера
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 HMR Server running on http://localhost:${PORT}`);
  console.log(`📂 Watching: ${watchedFile}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down HMR server...');
  wss.close();
  server.close();
  process.exit(0);
});

/*
Клиентская часть (client.js):

const ws = new WebSocket('ws://localhost:3001');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'reload') {
    console.log('🔄 Reloading module...');
    
    // Очищаем кэш модулей
    if (import.meta.hot) {
      import.meta.hot.invalidate();
    } else {
      // Полная перезагрузка страницы как fallback
      window.location.reload();
    }
  }
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
*/