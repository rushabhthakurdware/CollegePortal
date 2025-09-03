import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CourseProvider } from './context/CourseContext.jsx'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CourseProvider>
        <App />
      </CourseProvider>
    </BrowserRouter>
  </StrictMode>,
)
