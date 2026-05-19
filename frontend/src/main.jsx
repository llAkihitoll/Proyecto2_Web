import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StorageProvider } from './context/StorageContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <StorageProvider>
        <App />
      </StorageProvider>
    </ThemeProvider>
  </StrictMode>,
)
