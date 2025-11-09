// src/sidebar.jsx
import React from 'react'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'competences', name: 'Competences', icon: '💪' },
    { id: 'experiences', name: 'Experiences', icon: '💼' },
    { id: 'projects', name: 'Projects', icon: '🚀' },
  ]

  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left transition duration-300 ${
              activeTab === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar