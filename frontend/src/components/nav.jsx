// src/components/nav.jsx
import React from 'react'

const Nav = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8 py-4">
          <a href="#profile" className="hover:text-blue-300 transition duration-300">Profile</a>
          <a href="#skills" className="hover:text-blue-300 transition duration-300">Skills</a>
          <a href="#experience" className="hover:text-blue-300 transition duration-300">Experience</a>
          <a href="#projects" className="hover:text-blue-300 transition duration-300">Projects</a>
        </div>
      </div>
    </nav>
  )
}

export default Nav