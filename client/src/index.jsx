import "./index.css"
import React from 'react'
import ReactDOM from 'react-dom'
import { AuthProvider } from "./components/contexts/AuthContext"
import { ModalsProvider } from "./components/contexts/ModalsContext"
import { BrowserRouter as Router } from "react-router-dom"
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
