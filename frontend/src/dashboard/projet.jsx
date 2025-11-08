import { useEffect, useState } from 'react'
import { fetchGraphQL } from '../config/graphql.jsx'

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', description: '', image: '', githubLink: '', webLink: '' })

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchGraphQL(`query { getProjects { id name description image githubLink webLink } }`)
      setProjects(res.getProjects || [])
    } catch (err) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  async function createProject(e) {
    e.preventDefault()
    setError(null)
    try {
      const mutation = `mutation ($input: ProjectInput!) { createProject(input: $input) { id name } }`
      const variables = { input: form }
      const res = await fetchGraphQL(mutation, variables)
      if (res && res.createProject) setProjects((p) => [res.createProject, ...p])
      setForm({ name: '', description: '', image: '', githubLink: '', webLink: '' })
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  async function deleteProject(id) {
    if (!confirm('Delete this project?')) return
    setError(null)
    try {
      const mutation = `mutation ($id: ID!) { deleteProject(id: $id) }`
      await fetchGraphQL(mutation, { id })
      setProjects((p) => p.filter((x) => x.id !== id))
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2>Manage Projects</h2>

      <form onSubmit={createProject} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <input placeholder="GitHub link" value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} />
        <input placeholder="Web link" value={form.webLink} onChange={(e) => setForm({ ...form, webLink: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div>
          <button type="submit">Create project</button>
        </div>
      </form>

      {loading && <p>Loading projects…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section>
        <h3>Existing Projects</h3>
        {projects.length === 0 && <p>No projects yet.</p>}
        <ul>
          {projects.map((p) => (
            <li key={p.id} style={{ marginBottom: 12 }}>
              <strong>{p.name}</strong>
              <p>{p.description}</p>
              <div>
                <a href={p.githubLink} target="_blank" rel="noreferrer">Code</a> · <a href={p.webLink} target="_blank" rel="noreferrer">Demo</a>
              </div>
              <div>
                <button onClick={() => deleteProject(p.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
