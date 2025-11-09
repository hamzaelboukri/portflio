// src/components/nav.jsx
import React from 'react'

const Nav = () => {
  return (
    <nav className="bg-[#1F2937] border-b-2 border-[#238D94]/30 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 shadow-lg">
      <div className="w-full px-8 md:px-12">
        <div className="flex space-x-1 py-4">
          <a href="#profile" className="px-6 py-2 text-gray-300 hover:text-white hover:bg-[#238D94] rounded-lg transition-all duration-300 font-medium">
            Profile
          </a>
          <a href="#skills" className="px-6 py-2 text-gray-300 hover:text-white hover:bg-[#238D94] rounded-lg transition-all duration-300 font-medium">
            Skills
          </a>
          <a href="#experience" className="px-6 py-2 text-gray-300 hover:text-white hover:bg-[#238D94] rounded-lg transition-all duration-300 font-medium">
            Experience
          </a>
          <a href="#projects" className="px-6 py-2 text-gray-300 hover:text-white hover:bg-[#238D94] rounded-lg transition-all duration-300 font-medium">
            Projects
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Nav  