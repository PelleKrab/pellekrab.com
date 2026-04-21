import fs from 'fs'
import path from 'path'
import MarkdownPage from '@/components/MarkdownPage'

export default function FocilInRethPage() {
  const content = fs.readFileSync(
    path.join(process.cwd(), 'src/content/focil-in-reth.md'),
    'utf-8'
  )
  return <MarkdownPage content={content} />
}
