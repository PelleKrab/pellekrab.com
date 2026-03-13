# pellekrab.com

Personal portfolio site. React + TypeScript + Vite, deployed to Firebase Hosting.

## Dev

```bash
npm install
npm run dev
npm run build
```

## Adding a blog post

1. Write `src/content/your-post.md`
2. Create `src/components/YourPost.tsx`:
```tsx
import React from 'react'
import MarkdownPage from './MarkdownPage'
import content from '../content/your-post.md?raw'

const YourPost: React.FC = () => <MarkdownPage content={content} />
export default YourPost
```
3. Add a route in `src/App.tsx`
4. Add an entry in `src/components/Projects.tsx`

## Deploy

```bash
npm run build
firebase deploy --project <project-id>
```
