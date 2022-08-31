import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './ui/App'

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(<App />)
}
