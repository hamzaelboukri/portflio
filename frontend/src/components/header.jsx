// src/components/header.jsx
import React from 'react'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-[#1F2937] via-[#1a2332] to-[#1F2937] shadow-2xl border-b-4 border-[#238D94]">
      <div className="w-full px-8 md:px-12 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-[#238D94] to-[#7D944D] bg-clip-text text-transparent">
              My Portfolio
            </h1>
            <p className="text-gray-400 mt-3 text-lg font-light tracking-wide">
              Crafting Digital Excellence
            </p>
          </div>
          <div>
            <a 
              href="/admin/login" 
              className="bg-gradient-to-r from-[#238D94] to-[#7D944D] hover:from-[#7D944D] hover:to-[#238D94] text-white py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl font-semibold transform hover:scale-105"
            >
              Admin Access
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header