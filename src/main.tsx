import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'antd/dist/antd.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
)
