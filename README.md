# Pellekrab.com - Simple

A clean, minimal retro-style portfolio website inspired by piapark.me. Built with React, TypeScript, and Vite for easy maintenance and fast performance.

## Features

- **Minimal Design**: Clean serif typography, ample whitespace, no animations
- **Fast & Lightweight**: Vite + React with minimal dependencies
- **Easy to Maintain**: Simple component structure, straightforward styling
- **Responsive**: Works on mobile, tablet, and desktop
- **All Your Content**: All 8 projects and your info ported from the original site

## Project Structure

```
src/
├── components/
│   ├── Home.tsx                      # Main landing page
│   ├── ProjectEntry.tsx              # Individual project card component
│   ├── ProjectPage.tsx               # Template for project detail pages
│   ├── CommitBoostCharon.tsx
│   ├── FocilInReth.tsx
│   ├── ConsiderThisBerkeleyHack.tsx
│   ├── ECOBitesBSWHackathon.tsx
│   ├── RustBlockchainProject.tsx
│   ├── FRCJavaFramework.tsx
│   ├── JavaRoboticsProject.tsx
│   └── SpaceShooterProject.tsx
├── App.tsx                           # Router configuration
├── style.css                         # All styling
├── main.tsx                          # Application entry
└── vite-env.d.ts
```

## Setup

```bash
# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Differences from Original

1. **No animations** - Clean, simple interactions
2. **No Tailwind** - Plain CSS for simplicity and faster maintenance
3. **Serif typography** - Georgia/Garamond for that retro feel
4. **Minimal styling** - Spacious layout, clear hierarchy
5. **No external backgrounds** - Just clean white backgrounds
6. **Simpler component hierarchy** - Easy to understand and modify

## Customization

### Colors
Edit `src/style.css` to change colors:
- Background: `#fafaf8`
- Text: `#333`
- Links: `#0066cc`

### Typography
Font family is set to Georgia, Garamond, serif. Change in `src/style.css`:
```css
body {
  font-family: 'Georgia', 'Garamond', serif;
}
```

### Adding Profile Images
Copy your headshot to `src/assets/images/headshot.jpg` and it will be automatically imported in the Home component.

## Deployment

This site can be deployed anywhere that serves static sites:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
- Any static web host

```bash
# Build generates a dist/ folder
npm run build
# Deploy the dist/ folder to your hosting service
```

## Updating Content

### Edit your bio
Edit `src/components/Home.tsx` - update the profile name, title, and links.

### Add/edit projects
Update the ProjectEntry components in `src/components/Home.tsx` with href, title, description, and technologies.

### Edit project pages
Each project has its own component (e.g., `CommitBoostCharon.tsx`). Edit the content inside the ProjectPage component wrapper.

## Development Philosophy

This site is built for:
- **Simplicity**: Easy to understand and modify
- **Maintainability**: Minimal dependencies, clean structure
- **Performance**: Fast load times, minimal bundle size
- **Readability**: Clear typography and spacing

## License

This is your personal portfolio site. Feel free to use, modify, and deploy as needed.
