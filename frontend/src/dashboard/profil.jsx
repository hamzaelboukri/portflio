    // src/dashboard/protil.jsx
import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { adminService } from '../services/api'

const ProfileManager = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
  })
  const [editingId, setEditingId] = useState(null)
  const queryClient = useQueryClient()

  const { data: profiles, isLoading, error } = useQuery(
    'profiles',
    adminService.getProfiles
  )

  const createMutation = useMutation(adminService.createProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('profiles')
      setFormData({ fullName: '', email: '', phone: '', address: '', website: '' })
    },
  })

  const updateMutation = useMutation(
    ({ id, input }) => adminService.updateProfile(id, input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profiles')
        setEditingId(null)
        setFormData({ fullName: '', email: '', phone: '', address: '', website: '' })
      },
    }
  )

  const deleteMutation = useMutation(adminService.deleteProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('profiles')
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

  const handleEdit = (profile) => {
    setFormData({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      website: profile.website,
    })
    setEditingId(profile.id)
  }

  if (isLoading) return <div>Loading profiles...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Profile</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="url"
          placeholder="Website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={createMutation.isLoading || updateMutation.isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {editingId ? 'Update' : 'Create'} Profile
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              setFormData({ fullName: '', email: '', phone: '', address: '', website: '' })
            }}
            className="ml-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="space-y-4">
        {profiles?.getProfile?.map((profile) => (
          <div key={profile.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-blue-600">{profile.fullName}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-gray-600">{profile.email}</p>
                    <p className="text-gray-600">{profile.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{profile.address}</p>
                    <a href={profile.website} className="text-blue-500 hover:underline">
                      {profile.website}
                    </a>
                  </div>
                </div>
              </div>
              <div className="space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(profile)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(profile.id)}
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

export default ProfileManager