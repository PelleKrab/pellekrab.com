import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ProjectEntryProps {
  href: string
  title: string
  description: string
  technologies: string
}

const ProjectEntry: React.FC<ProjectEntryProps> = ({ href, title, description, technologies }) => {
  const navigate = useNavigate()

  return (
    <div
      className="project-entry"
      onClick={() => navigate(href)}
    >
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>
      <p className="project-tech">{technologies}</p>
    </div>
  )
}

export default ProjectEntry
