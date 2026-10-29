/**
 * Задача 09: Настройка абсолютных импортов в Vite
 * vite.config.js, модули path
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      // Поддержка псевдонима @ -> ./src
      '@': path.resolve(__dirname, './src'),
      
      // Альтернативный синтаксис для ESM
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  
  // Дополнительные настройки для удобства разработки
  server: {
    port: 3000,
    open: true,
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});

/*
Пример использования с абсолютными импортами:

import Button from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import api from '@/utils/api';
import './styles/main.css';

// Без псевдонима пришлось бы писать:
// import Button from '../../components/Button';
*/