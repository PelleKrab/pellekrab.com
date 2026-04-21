import Link from 'next/link'

interface ProjectPageProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const ProjectPage: React.FC<ProjectPageProps> = ({ title, subtitle, children }) => {
  return (
    <div className="project-page">
      <Link href="/projects" className="back-link">← back to projects</Link>
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
