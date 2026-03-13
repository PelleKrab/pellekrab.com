import React from 'react'
import MarkdownPage from './MarkdownPage'
import content from '../content/focil-in-reth.md?raw'

const FocilInReth: React.FC = () => {
  return (
    <MarkdownPage content={content} />
  )
}

export default FocilInReth
