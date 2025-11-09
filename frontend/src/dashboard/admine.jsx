// src/dashboard/admine.jsx
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/dashboard/sidebare.jsx'
import CompetenceManager from './competence.jsx'
import ExperienceManager from './experience.jsx'
import ProfileManager from './profil.jsx'
import ProjectManager from './projet.jsx'

const AdminDashboard = () => {
  const { admin, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  if (!admin) {
    return <div>Please log in to access the dashboard</div>
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileManager />
      case 'competences':
        return <CompetenceManager />
      case 'experiences':
        return <ExperienceManager />
      case 'projects':
        return <ProjectManager />
      default:
        return <ProfileManager />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {admin.username}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard