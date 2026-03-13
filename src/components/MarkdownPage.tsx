import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import { useNavigate } from 'react-router-dom'
import 'katex/dist/katex.min.css'

interface MarkdownPageProps {
  content: string
}

const components = {
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
      <table {...props}>{children}</table>
    </div>
  ),
}

const MarkdownPage: React.FC<MarkdownPageProps> = ({ content }) => {
  const navigate = useNavigate()

  return (
    <div className="project-page">
      <button className="back-button" onClick={() => navigate('/projects')}>← back to projects</button>
      <div className="project-content">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]} components={components}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default MarkdownPage
