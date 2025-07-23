
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from "./contexts/theme/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App/>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
