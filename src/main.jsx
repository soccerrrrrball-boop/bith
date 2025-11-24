import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

console.log('Main.jsx loaded')

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Root element not found!')
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found!</div>'
} else {
  console.log('Root element found, creating React root...')
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>,
    )
    console.log('React app rendered successfully')
  } catch (error) {
    console.error('Error rendering app:', error)
    rootElement.innerHTML = `<div style="padding: 20px; color: red;">Error: ${error.message}</div>`
  }
}

