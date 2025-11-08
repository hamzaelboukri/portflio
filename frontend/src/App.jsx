import './App.css'
import PortfolioPage from './pages/index.jsx'
import AdminPage from './dashboard/admine.jsx'

function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'

  if (path.startsWith('/admin')) return <AdminPage />
  return <PortfolioPage />
}

export default App
