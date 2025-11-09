// src/dashboard/projet.jsx
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { adminService } from '../services/api'

const ProjectManager = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    link: '',
  })
  const [editingId, setEditingId] = useState(null)
  const queryClient = useQueryClient()

  const { data: projects, isLoading, error } = useQuery(
    'projects',
    () => adminService.getProjects()
  )

  const createMutation = useMutation(adminService.createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries('projects')
      setFormData({ title: '', description: '', technologies: '', link: '' })
    },
  })

  const updateMutation = useMutation(
    ({ id, input }) => adminService.updateProject(id, input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects')
        setEditingId(null)
        setFormData({ title: '', description: '', technologies: '', link: '' })
      },
    }
  )

  const deleteMutation = useMutation(adminService.deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries('projects')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const input = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim())
    }
    
    if (editingId) {
      updateMutation.mutate({ id: editingId, input })
    } else {
      createMutation.mutate(input)
    }
  }

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies?.join(', ') || '',
      link: project.link || '',
    })
    setEditingId(project.id)
  }

  if (isLoading) return <div>Loading projects...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Project Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          required
        />
        <input
          type="text"
          placeholder="Technologies (comma separated)"
          value={formData.technologies}
          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="url"
          placeholder="Project Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={createMutation.isLoading || updateMutation.isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {editingId ? 'Update' : 'Create'} Project
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              setFormData({ title: '', description: '', technologies: '', link: '' })
            }}
            className="ml-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects?.getProjects?.map((project) => (
          <div key={project.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(project.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies?.map((tech, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <a
                href={project.link}
                className="text-blue-500 hover:underline text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectManager