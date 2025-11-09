// src/dashboard/experience.jsx
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { adminService } from '../services/api'

const ExperienceManager = () => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    duration: '',
    description: '',
  })
  const [editingId, setEditingId] = useState(null)
  const queryClient = useQueryClient()

  const { data: experiences, isLoading, error } = useQuery(
    'experiences',
    adminService.getExperiences
  )

  const createMutation = useMutation(adminService.createExperience, {
    onSuccess: () => {
      queryClient.invalidateQueries('experiences')
      setFormData({ company: '', position: '', duration: '', description: '' })
    },
  })

  const updateMutation = useMutation(
    ({ id, input }) => adminService.updateExperience(id, input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('experiences')
        setEditingId(null)
        setFormData({ company: '', position: '', duration: '', description: '' })
      },
    }
  )

  const deleteMutation = useMutation(adminService.deleteExperience, {
    onSuccess: () => {
      queryClient.invalidateQueries('experiences')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      updateMutation.mutate({ id: editingId, input: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const handleEdit = (experience) => {
    setFormData({
      company: experience.company,
      position: experience.position,
      duration: experience.duration,
      description: experience.description,
    })
    setEditingId(experience.id)
  }

  if (isLoading) return <div>Loading experiences...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Experiences</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <input
          type="text"
          placeholder="Duration (e.g., 2020-2022)"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          required
        />
        <button
          type="submit"
          disabled={createMutation.isLoading || updateMutation.isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {editingId ? 'Update' : 'Create'} Experience
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              setFormData({ company: '', position: '', duration: '', description: '' })
            }}
            className="ml-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="space-y-4">
        {experiences?.getExperiences?.map((experience) => (
          <div key={experience.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{experience.position}</h3>
                <p className="text-gray-600 font-medium">{experience.company}</p>
                <p className="text-sm text-gray-500 mt-1">{experience.duration}</p>
                <p className="mt-2 text-gray-700">{experience.description}</p>
              </div>
              <div className="space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(experience)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(experience.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceManager