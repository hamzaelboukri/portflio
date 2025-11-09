// src/pages/index.jsx
import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { portfolioService } from '../services/api'

import Header from '../components/header.jsx'
import Nav from '../components/nav.jsx'
import Footer from '../components/footer.jsx'

const SkillBadge = ({ name, index }) => (
  <div 
    className="group relative"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div className="absolute inset-0 bg-[#238D94] rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
    <span className="relative inline-block bg-gradient-to-r from-[#7D944D] to-[#238D94] text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-default border border-white/20">
      {name}
    </span>
  </div>
)

const ProjectCard = ({ project, index }) => (
  <article 
    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Project Image/Preview */}
    <div className="relative h-56 bg-gradient-to-br from-[#238D94] via-[#7D944D] to-[#1F2937] overflow-hidden">
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-transparent to-transparent opacity-60"></div>
      
      {/* Animated circles */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#7D944D]/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span className="text-white text-sm font-semibold tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">View Project</span>
        </div>
      </div>
    </div>
    
    {/* Project Content */}
    <div className="p-6">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-[#1F2937] group-hover:text-[#238D94] transition-colors duration-300 flex-1">
          {project.name}
        </h3>
        {project.githubLink && (
          <a 
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-gray-400 hover:text-[#7D944D] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        )}
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
        {project.description}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs font-semibold text-[#7D944D] uppercase tracking-wider bg-[#7D944D]/10 px-3 py-1 rounded-full">
          {project.githubLink ? '🔓 Open Source' : '🔒 Private'}
        </span>
        
        {project.webLink && (
          <a 
            href={project.webLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group/btn relative overflow-hidden text-white bg-[#238D94] hover:bg-[#1F2937] px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <span className="relative z-10">Launch</span>
            <svg className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-[#7D944D] to-[#238D94] transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
          </a>
        )}
      </div>
    </div>
  </article>
)

const ExperienceItem = ({ exp, index }) => (
  <div 
    className="flex gap-6 relative group"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    {/* Timeline */}
    <div className="flex flex-col items-center relative">
      <div className="w-5 h-5 bg-gradient-to-br from-[#238D94] to-[#7D944D] rounded-full shadow-lg border-4 border-white z-10 group-hover:scale-125 transition-transform duration-300 ring-4 ring-[#238D94]/20"></div>
      <div className="w-0.5 h-full bg-gradient-to-b from-[#238D94] via-[#7D944D] to-transparent opacity-20 group-hover:opacity-40 transition-opacity"></div>
    </div>
    
    {/* Content */}
    <div className="flex-1 pb-12">
      {/* Date Badge */}
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7D944D] to-[#238D94] text-white text-xs font-bold px-4 py-2 rounded-full mb-4 shadow-lg">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {exp.startDate} — {exp.endDate}
      </div>
      
      {/* Experience Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[#238D94]/30">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-bold text-2xl text-[#1F2937] mb-2 group-hover:text-[#238D94] transition-colors">
              {exp.title}
            </h4>
            <div className="flex items-center gap-2 text-[#238D94] font-semibold text-lg mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {exp.company}
            </div>
          </div>
          
          {/* Decorative Element */}
          <div className="w-12 h-12 bg-gradient-to-br from-[#238D94]/10 to-[#7D944D]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-[#238D94]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed bg-gradient-to-br from-gray-50 to-transparent p-5 rounded-xl border-l-4 border-[#7D944D] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#238D94]/5 rounded-full blur-2xl"></div>
          <span className="relative z-10">{exp.description}</span>
        </p>
      </div>
    </div>
  </div>
)

const IndexPage = () => {
  const { data: portfolio, isLoading, error } = useQuery('portfolio', portfolioService.getPortfolio)

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#1F2937]">
      <div className="text-2xl font-bold text-[#238D94] animate-pulse">Loading...</div>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-[#1F2937]">
      <div className="text-red-400 font-bold text-xl">Error: {error.message}</div>
    </div>
  )

  const portfolioData = portfolio?.getPortfolio
  const profiles = portfolioData?.profiles || []
  const projects = portfolioData?.projects || []
  const competences = portfolioData?.competences || []
  const experiences = portfolioData?.experiences || []

  const me = profiles[0] || { fullName: 'Your Name', email: '', phone: '', address: '', website: '' }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <Header />
      <Nav />

      <main className="w-full">
        {/* Hero Section */}
        <section id="profile" className="relative overflow-hidden bg-gradient-to-br from-[#1F2937] via-[#1a2332] to-[#1F2937] shadow-2xl p-12 md:p-16 mb-0">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#238D94] opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7D944D] opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2 space-y-8">
              {/* Greeting Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
                <span className="w-2 h-2 bg-[#238D94] rounded-full animate-pulse"></span>
                <span className="text-gray-300 text-sm font-semibold">Welcome to my portfolio</span>
              </div>

              <div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
                  Hi, I'm <span className="bg-gradient-to-r from-[#238D94] via-[#7D944D] to-[#238D94] bg-clip-text text-transparent">{me.fullName}</span>
                </h1>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1.5 w-20 bg-gradient-to-r from-[#238D94] to-[#7D944D] rounded-full"></div>
                  <div className="h-1.5 w-12 bg-gradient-to-r from-[#7D944D] to-[#238D94] rounded-full"></div>
                  <div className="h-1.5 w-8 bg-[#238D94] rounded-full"></div>
                </div>
              </div>

              <p className="text-gray-300 text-xl md:text-2xl leading-relaxed max-w-2xl font-light">
                I build <span className="text-[#238D94] font-semibold">elegant</span>, <span className="text-[#7D944D] font-semibold">user-friendly</span> web experiences. Turning complex problems into <span className="text-white font-semibold">simple, beautiful solutions</span>.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href={`mailto:${me.email}`} 
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#238D94] to-[#7D944D] text-white rounded-full shadow-xl hover:shadow-2xl transition-all font-bold overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Me
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </a>
                
                {me.website && (
                  <a 
                    href={me.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group px-8 py-4 border-2 border-[#7D944D] text-[#7D944D] rounded-full hover:bg-[#7D944D] hover:text-white transition-all font-bold backdrop-blur-sm bg-white/5 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Visit Website
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="relative group">
                {/* Rotating ring */}
                <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-r from-[#238D94] via-[#7D944D] to-[#238D94] opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                
                {/* Avatar */}
                <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-[#238D94] via-[#1a8a91] to-[#7D944D] flex items-center justify-center text-6xl font-black text-white shadow-2xl border-[6px] border-white/20 backdrop-blur-sm group-hover:scale-105 transition-transform">
                  {me.fullName ? me.fullName.split(' ').map(n=>n[0]).join('').slice(0,2) : 'YK'}
                </div>

                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#238D94] rounded-full flex items-center justify-center shadow-lg border-4 border-[#1F2937] group-hover:rotate-12 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-8 text-center space-y-3 bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10">
                <div className="flex items-center justify-center gap-2 text-[#238D94] font-semibold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {me.email}
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {me.phone}
                </div>
                {me.address && (
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {me.address}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-0">
          {/* Skills Section */}
          <aside id="skills" className="bg-white p-8 shadow-xl border-t-4 border-[#7D944D]">
            <h3 className="text-3xl font-black mb-6 text-[#1F2937] pb-4 border-b-2 border-gray-200">
              Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {competences.length === 0 && (
                <div className="text-gray-500 italic">No skills added yet</div>
              )}
              {competences.map((c, index) => <SkillBadge key={c.id} name={c.name} index={index} />)}
            </div>
          </aside>

          {/* Experience Section */}
          <section id="experience" className="lg:col-span-2 bg-white p-8 shadow-xl border-t-4 border-[#238D94]">
            <h3 className="text-3xl font-black mb-8 text-[#1F2937] pb-4 border-b-2 border-gray-200">
              Experience
            </h3>
            <div className="space-y-2">
              {experiences.length === 0 && (
                <div className="text-gray-500 italic">No experiences added yet</div>
              )}
              {experiences.map((e, index) => <ExperienceItem key={e.id} exp={e} index={index} />)}
            </div>
          </section>
        </div>

        {/* Projects Section */}
        <section id="projects" className="bg-white p-8 md:p-12">
          <h3 className="text-4xl font-black mb-10 text-[#1F2937] pb-4 border-b-4 border-[#238D94] inline-block">
            Featured Projects
          </h3>
          {projects.length === 0 ? (
            <div className="bg-gray-50 p-8 shadow-xl text-gray-500 italic text-center">
              No projects added yet
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {projects.map((p, index) => <ProjectCard key={p.id} project={p} index={index} />)}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default IndexPage