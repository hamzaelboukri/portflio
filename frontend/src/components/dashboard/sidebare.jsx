export default function Sidebar() {
  return (
    <aside style={{ width: 220, padding: 16, borderRight: '1px solid #eee' }}>
      <h3>Admin</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a href="/admin">Dashboard</a></li>
        <li><a href="/admin#projects">Projects</a></li>
        <li><a href="/admin#competences">Competences</a></li>
        <li><a href="/admin#experiences">Experiences</a></li>
        <li><a href="/">View Portfolio</a></li>
      </ul>
    </aside>
  )
}
