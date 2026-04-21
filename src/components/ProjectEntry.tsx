import Link from 'next/link'

interface ProjectEntryProps {
  href: string
  title: string
  description: string
  technologies: string
}

const ProjectEntry: React.FC<ProjectEntryProps> = ({ href, title, description, technologies }) => {
  return (
    <Link href={href} className="project-entry">
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>
      <p className="project-tech">{technologies}</p>
    </Link>
  )
}

export default ProjectEntry
