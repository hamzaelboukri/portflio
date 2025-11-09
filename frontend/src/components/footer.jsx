// src/components/footer.jsx
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 My Portfolio. All rights reserved.</p>
        <p className="mt-2 text-gray-400">Built with React & GraphQL</p>
      </div>
    </footer>
  )
}

export default Footer