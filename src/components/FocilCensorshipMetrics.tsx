import React from 'react'
import MarkdownPage from './MarkdownPage'
import content from '../content/focil-censorship-metrics.md?raw'

const FocilCensorshipMetrics: React.FC = () => {
  return <MarkdownPage content={content} />
}

export default FocilCensorshipMetrics
