// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // You can decode the token here if needed
      setAdmin({ username: 'Admin' }) // Simplified for now
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const result = await authService.login(username, password)
      if (result.login) {
        localStorage.setItem('token', result.login.token)
        setAdmin(result.login.admin)
        return { success: true }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAdmin(null)
  }

  const value = {
    admin,
    login,
    logout,
    isAuthenticated: !!admin,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}