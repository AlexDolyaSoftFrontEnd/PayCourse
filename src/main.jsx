// ============================================
// Точка входа приложения React
// ============================================

// Импорт React хука StrictMode для выявления потенциальных проблем в приложении
import { StrictMode } from 'react'

// Импорт функции createRoot для подключения React приложения к DOM
import { createRoot } from 'react-dom/client'

// Импорт корневого компонента приложения
import App from './App.jsx'

// Импорт глобальных CSS стилей
import './index.css'

// ============================================
// Инициализация React приложения
// ============================================
// 1. createRoot находит элемент с id='root' в HTML документе
// 2. StrictMode оборачивает приложение для проверки на потенциальные ошибки
// 3. render монтирует компонент App в найденный элемент
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
