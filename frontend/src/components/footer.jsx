// src/components/footer.jsx
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1F2937] via-[#1a2332] to-[#1F2937] text-white py-12 mt-0 border-t-4 border-[#238D94]">
      <div className="w-full px-8 md:px-12">
        <div className="text-center">
          <div className="mb-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#238D94] to-[#7D944D] bg-clip-text text-transparent">
              My Portfolio
            </h3>
          </div>
          <p className="text-gray-400 text-lg mb-2">
            &copy; 2025 All rights reserved.
          </p>
          <p className="text-[#238D94] font-medium">
            Built with React & GraphQL
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <div className="w-12 h-1 bg-gradient-to-r from-[#238D94] to-[#7D944D] rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer