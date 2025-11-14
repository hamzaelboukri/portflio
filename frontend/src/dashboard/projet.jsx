// src/dashboard/projet.jsx
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { adminService } from '../services/api'

const ProjectManager = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    githubLink: '',
    webLink: '',
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
      setFormData({ name: '', description: '', image: '', githubLink: '', webLink: '' })
    },
  })

  const updateMutation = useMutation(
    ({ id, input }) => adminService.updateProject(id, input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects')
        setEditingId(null)
        setFormData({ name: '', description: '', image: '', githubLink: '', webLink: '' })
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
      name: formData.name,
      description: formData.description,
      image: formData.image || '',
      githubLink: formData.githubLink || '',
      webLink: formData.webLink || '',
    }
    
    if (editingId) {
      updateMutation.mutate({ id: editingId, input })
    } else {
      createMutation.mutate(input)
    }
  }

  const handleEdit = (project) => {
    setFormData({
      name: project.name,
      description: project.description,
      image: project.image || '',
      githubLink: project.githubLink || '',
      webLink: project.webLink || '',
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
          placeholder="Project Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          type="url"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          placeholder="GitHub / Source URL (optional)"
          value={formData.githubLink}
          onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          placeholder="Live Demo URL (optional)"
          value={formData.webLink}
          onChange={(e) => setFormData({ ...formData, webLink: e.target.value })}
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
              setFormData({ name: '', description: '', image: '', githubLink: '', webLink: '' })
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
              <h3 className="font-semibold text-lg text-black">{project.name}</h3>
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
            <p className="text-black text-sm mb-3">{project.description}</p>
            <div className="flex gap-3 items-center mb-3">
              {project.githubLink && (
                <a href={project.githubLink} className="text-sm text-black hover:underline" target="_blank" rel="noopener noreferrer">Source</a>
              )}
              {project.webLink && (
                <a href={project.webLink} className="text-sm text-black hover:underline" target="_blank" rel="noopener noreferrer">View</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectManager