// src/pages/index.jsx
import React from 'react'
import { useQuery } from 'react-query'
import { portfolioService } from '../services/api'
import Header from '../components/header.jsx'
import Nav from '../components/nav.jsx'
import Footer from '../components/footer.jsx'

const IndexPage = () => {
  const { data: portfolio, isLoading, error } = useQuery(
    'portfolio',
    portfolioService.getPortfolio
  )

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl">Loading...</div>
    </div>
  )

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-500 text-xl">Error loading portfolio: {error.message}</div>
    </div>
  )

  const portfolioData = portfolio?.getPortfolio
  if (!portfolioData) return null

  const { profiles, projects, competences, experiences } = portfolioData

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Nav />
      
      <main className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        {profiles && profiles.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-semibold text-blue-600">{profiles[0].fullName}</h3>
                <p className="text-gray-600 mt-2">{profiles[0].email}</p>
                <p className="text-gray-600">{profiles[0].phone}</p>
              </div>
              <div>
                <p className="text-gray-600">{profiles[0].address}</p>
                <a 
                  href={profiles[0].website} 
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profiles[0].website}
                </a>
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Competences Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Skills & Competences</h2>
            <div className="space-y-4">
              {competences?.map((competence) => (
                <div key={competence.id} className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-lg text-gray-800">{competence.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {competence.category}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      Level: {competence.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experiences Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Professional Experience</h2>
            <div className="space-y-6">
              {experiences?.map((experience) => (
                <div key={experience.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="text-xl font-semibold text-gray-800">{experience.position}</h3>
                  <p className="text-gray-600 font-medium">{experience.company}</p>
                  <p className="text-sm text-gray-500 mt-1">{experience.duration}</p>
                  <p className="text-gray-700 mt-3 leading-relaxed">{experience.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm transition duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default IndexPage