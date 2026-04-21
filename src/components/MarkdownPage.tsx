'use client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import Link from 'next/link'

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
  return (
    <div className="project-page">
      <Link href="/projects" className="back-link">← back to projects</Link>
      <div className="project-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default MarkdownPage
