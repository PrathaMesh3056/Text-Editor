import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 1. Import Bootstrap CSS first to lay the foundation
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. Import your custom CSS file AFTER Bootstrap.
// This allows your custom styles (like .btn-ai) to correctly
// apply and override Bootstrap defaults if needed.
import './index.css'

// Bootstrap's JavaScript bundle (optional but good to have)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

