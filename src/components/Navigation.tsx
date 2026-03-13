import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navigation: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === '/'
  const isProjects = location.pathname === '/projects'

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 32px 0 32px' }}>
      <nav style={{ display: 'flex', gap: '24px', fontSize: '14px', marginBottom: '40px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            textDecoration: isHome ? 'underline' : 'underline',
            opacity: isHome ? 1 : 0.6,
            fontWeight: isHome ? 600 : 400
          }}
        >
          home
        </button>
        <button
          onClick={() => navigate('/projects')}
          style={{
            textDecoration: isProjects ? 'underline' : 'underline',
            opacity: isProjects ? 1 : 0.6,
            fontWeight: isProjects ? 600 : 400
          }}
        >
          projects
        </button>
      </nav>
    </div>
  )
}

export default Navigation
