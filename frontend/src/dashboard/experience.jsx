import { useEffect, useState } from 'react'
import { fetchGraphQL } from '../config/graphql.jsx'

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ title: '', company: '', startDate: '', endDate: '', description: '' })

  useEffect(() => {
    loadExperiences()
  }, [])

  async function loadExperiences() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchGraphQL(`query { getExperiences { id title company startDate endDate description } }`)
      setExperiences(res.getExperiences || [])
    } catch (err) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  async function createExperience(e) {
    e.preventDefault()
    setError(null)
    try {
      const mutation = `mutation ($input: ExperienceInput!) { createExperience(input: $input) { id title } }`
      const variables = { input: form }
      const res = await fetchGraphQL(mutation, variables)
      if (res && res.createExperience) setExperiences((s) => [res.createExperience, ...s])
      setForm({ title: '', company: '', startDate: '', endDate: '', description: '' })
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  async function deleteExperience(id) {
    if (!confirm('Delete this experience?')) return
    setError(null)
    try {
      const mutation = `mutation ($id: ID!) { deleteExperience(id: $id) }`
      await fetchGraphQL(mutation, { id })
      setExperiences((s) => s.filter((x) => x.id !== id))
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2>Manage Experiences</h2>

      <form onSubmit={createExperience} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <div style={{ display: 'flex', gap: 8 }}>
          <input type="date" placeholder="Start" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          <input type="date" placeholder="End" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        </div>
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div>
          <button type="submit">Create Experience</button>
        </div>
      </form>

      {loading && <p>Loading experiences…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section>
        <h3>Existing Experiences</h3>
        {experiences.length === 0 && <p>No experiences yet.</p>}
        <ul>
          {experiences.map((exp) => (
            <li key={exp.id} style={{ marginBottom: 12 }}>
              <strong>{exp.title}</strong> — {exp.company} ({exp.startDate} - {exp.endDate})
              <p>{exp.description}</p>
              <button onClick={() => deleteExperience(exp.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
