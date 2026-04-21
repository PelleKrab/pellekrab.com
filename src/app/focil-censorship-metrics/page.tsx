import fs from 'fs'
import path from 'path'
import MarkdownPage from '@/components/MarkdownPage'

export default function FocilCensorshipMetricsPage() {
  const content = fs.readFileSync(
    path.join(process.cwd(), 'src/content/focil-censorship-metrics.md'),
    'utf-8'
  )
  return <MarkdownPage content={content} />
}
