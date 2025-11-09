// src/dashboard/compstance.jsx
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { adminService } from '../services/api'

const CompetenceManager = () => {
  const [formData, setFormData] = useState({ name: '', level: '', category: '' })
  const [editingId, setEditingId] = useState(null)
  const queryClient = useQueryClient()

  const { data: competences, isLoading, error } = useQuery(
    'competences',
    adminService.getCompetences
  )

  const createMutation = useMutation(adminService.createCompetence, {
    onSuccess: () => {
      queryClient.invalidateQueries('competences')
      setFormData({ name: '', level: '', category: '' })
    },
  })

  const updateMutation = useMutation(
    ({ id, input }) => adminService.updateCompetence(id, input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('competences')
        setEditingId(null)
        setFormData({ name: '', level: '', category: '' })
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
    if (editingId) {
      updateMutation.mutate({ id: editingId, input: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const handleEdit = (competence) => {
    setFormData({
      name: competence.name,
      level: competence.level,
      category: competence.category,
    })
    setEditingId(competence.id)
  }

  if (isLoading) return <div>Loading competences...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Competences</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Level"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              setFormData({ name: '', level: '', category: '' })
            }}
            className="ml-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="space-y-4">
        {competences?.getCompetences?.map((competence) => (
          <div key={competence.id} className="flex justify-between items-center border p-4 rounded-lg">
            <div>
              <h3 className="font-semibold text-lg">{competence.name}</h3>
              <p className="text-gray-600">
                {competence.category} - Level: {competence.level}
              </p>
            </div>
            <div className="space-x-2">
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
        ))}
      </div>
    </div>
  )
}

export default CompetenceManager