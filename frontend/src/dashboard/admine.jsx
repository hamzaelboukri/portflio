import { useEffect, useState } from 'react'
import Sidebar from '../components/dashboard/sidebare.jsx'
import { fetchGraphQL } from '../config/graphql.jsx'

export default function AdminPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', image: '', githubLink: '', webLink: '' })
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    setLoading(true)
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
    try {
      const mutation = `mutation ($input: ProjectInput!) { createProject(input: $input) { id name } }`
      const variables = { input: form }
      const res = await fetchGraphQL(mutation, variables)
      setProjects((p) => [res.createProject, ...p])
      setForm({ name: '', description: '', image: '', githubLink: '', webLink: '' })
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  async function deleteProject(id) {
    if (!confirm('Delete project?')) return
    try {
      const mutation = `mutation ($id: ID!) { deleteProject(id: $id) }`
      await fetchGraphQL(mutation, { id })
      setProjects((p) => p.filter((x) => x.id !== id))
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 20 }}>
        <h1>Admin Dashboard</h1>
        <p><a href="/">Open portfolio</a></p>

        <section id="projects">
          <h2>Projects</h2>
          <form onSubmit={createProject} style={{ marginBottom: 12 }}>
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <input placeholder="GitHub link" value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} />
            <input placeholder="Web link" value={form.webLink} onChange={(e) => setForm({ ...form, webLink: e.target.value })} />
            <br />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <br />
            <button type="submit">Create project</button>
          </form>

          {loading && <p>Loading projects…</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <ul>
            {projects.map((p) => (
              <li key={p.id} style={{ marginBottom: 12 }}>
                <strong>{p.name}</strong>
                <p>{p.description}</p>
                <div>
                  <button onClick={() => deleteProject(p.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="competences">
          <h2>Competences (Read-only)</h2>
          <p>Use GraphQL playground or add UI to manage competences.</p>
        </section>

        <section id="experiences">
          <h2>Experiences (Read-only)</h2>
          <p>Use GraphQL playground or add UI to manage experiences.</p>
        </section>
      </main>
    </div>
  )
}
