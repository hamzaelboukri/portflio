// src/dashboard/compstance.jsx
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { adminService } from '../services/api'

const CompetenceManager = () => {
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [editingId, setEditingId] = useState(null)
  const queryClient = useQueryClient()

  const { data: competences, isLoading, error } = useQuery(
    'competences',
    adminService.getCompetences
  )

  const createMutation = useMutation(adminService.createCompetence, {
    onSuccess: () => {
      queryClient.invalidateQueries('competences')
      setFormData({ name: '', description: '' })
    },
  })

  const updateMutation = useMutation(
    ({ id, input }) => adminService.updateCompetence(id, input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('competences')
        setEditingId(null)
        setFormData({ name: '', description: '' })
      },
    }
  )

  const deleteMutation = useMutation(adminService.deleteCompetence, {
    onSuccess: () => {
      queryClient.invalidateQueries('competences')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const input = {
      name: formData.name,
      description: formData.description,
    }
    if (editingId) {
      updateMutation.mutate({ id: editingId, input })
    } else {
      createMutation.mutate(input)
    }
  }

  const handleEdit = (competence) => {
    setFormData({
      name: competence.name,
      description: competence.description,
    })
    setEditingId(competence.id)
  }

  if (isLoading) return <div>Loading competences...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Competences</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          disabled={createMutation.isLoading || updateMutation.isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {editingId ? 'Update' : 'Create'} Competence
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              setFormData({ name: '', description: '' })
            }}
            className="ml-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="space-y-4">
        {competences?.getCompetences?.map((competence) => (
          <div key={competence.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-blue-600">{competence.name}</h3>
                <p className="text-gray-600 mt-2">{competence.description}</p>
              </div>
              <div className="space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(competence)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(competence.id)}
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

export default CompetenceManager