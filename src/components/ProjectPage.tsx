import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ProjectPageProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const ProjectPage: React.FC<ProjectPageProps> = ({ title, subtitle, children }) => {
  const navigate = useNavigate()

  return (
    <div className="project-page">
      <button className="back-button" onClick={() => navigate('/projects')}>← back to projects</button>
      <div className="project-header">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="project-content">
        {children}
      </div>
    </div>
  )
}

export default ProjectPage
