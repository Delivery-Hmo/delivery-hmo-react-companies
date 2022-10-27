import React from 'react'
import './App.css'
import MyRouter from './router'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <MyRouter />
    </AuthProvider>
  )
}

export default App
