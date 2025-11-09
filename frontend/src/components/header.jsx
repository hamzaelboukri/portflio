// src/components/header.jsx
import React from 'react'

const Header = () => {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">My Portfolio</h1>
            <p className="text-gray-600 mt-2">Welcome to my professional portfolio</p>
          </div>
          <div>
            <a 
              href="/admin/login" 
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Admin Login
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header