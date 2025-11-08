import { useEffect, useState } from 'react'
import { fetchGraphQL } from '../config/graphql.jsx'

export default function PortfolioPage() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [competences, setCompetences] = useState([])
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const p = await fetchGraphQL(`query { getProfile { id fullName email phone address website } }`)
        const proj = await fetchGraphQL(`query { getProjects { id name description image githubLink webLink } }`)
        const comp = await fetchGraphQL(`query { getCompetences { id name description } }`)
        const exp = await fetchGraphQL(`query { getExperiences { id title company startDate endDate description } }`)

        setProfile(p.getProfile && p.getProfile[0] ? p.getProfile[0] : null)
        setProjects(proj.getProjects || [])
        setCompetences(comp.getCompetences || [])
        setExperiences(exp.getExperiences || [])
      } catch (err) {
        setError(err.message || String(err))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="app-root">Loading portfolio…</div>
  if (error) return <div className="app-root">Error: {error}</div>

  return (
    <div className="app-root" style={{ padding: 20 }}>
      <header>
        <h1>{profile ? profile.fullName : 'Portfolio'}</h1>
        {profile && <p>{profile.email} • {profile.phone} • {profile.website}</p>}
        <nav>
          <a href="/admin">Admin dashboard</a>
        </nav>
      </header>

      <section>
        <h2>Projects</h2>
        {projects.length === 0 && <p>No projects yet.</p>}
        <ul>
          {projects.map((pr) => (
            <li key={pr.id} style={{ marginBottom: 12 }}>
              <strong>{pr.name}</strong>
              <p>{pr.description}</p>
              {pr.image && <img src={pr.image} alt={pr.name} style={{ maxWidth: 200 }} />}
              <p>
                <a href={pr.githubLink} target="_blank" rel="noreferrer">GitHub</a> · <a href={pr.webLink} target="_blank" rel="noreferrer">Website</a>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Competences</h2>
        <ul>
          {competences.map((c) => (
            <li key={c.id}><strong>{c.name}</strong>: {c.description}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Experience</h2>
        <ul>
          {experiences.map((e) => (
            <li key={e.id}>
              <strong>{e.title}</strong> — {e.company} ({e.startDate} - {e.endDate})
              <p>{e.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
