/**
 * Задача 08: Цепочка скриптов жизненного цикла сборки
 * package.json scripts
 */

/*
Конфигурация для package.json:

{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "lint": "eslint src/",
    "prebuild": "npm run lint",
    "build": "vite build",
    "postbuild": "echo \"Build complete! Size:\" && du -sh dist",
    "prebuild:ci": "npm run lint -- --max-warnings=0"
  }
}

Или для Windows (PowerShell):

{
  "scripts": {
    "lint": "eslint src/",
    "prebuild": "npm run lint",
    "build": "vite build",
    "postbuild": "powershell -Command \"(Get-ChildItem -Path dist -Recurse | Measure-Object -Property Length -Sum).Sum / 1KB\"",
    "prebuild:ci": "npm run lint -- --max-warnings=0"
  }
}

Альтернативная реализация postbuild для получения размера папки:

// Node.js версия (кроссплатформенная)
"postbuild": "node -e \"const fs = require('fs'); const path = require('path'); const dist = path.join(__dirname, 'dist'); let size = 0; function walk(dir) { if (!fs.existsSync(dir)) return; const entries = fs.readdirSync(dir, { withFileTypes: true }); for (const entry of entries) { const fullPath = path.join(dir, entry.name); if (entry.isDirectory()) walk(fullPath); else size += fs.statSync(fullPath).size; } } walk(dist); console.log('Build complete! Size: ' + (size / 1024).toFixed(2) + ' KB');\""
*/