import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './components/About'
import Projects from './components/Projects'
import CommitBoostCharon from './components/CommitBoostCharon'
import FocilInReth from './components/FocilInReth'
import ConsiderThisBerkeleyHack from './components/ConsiderThisBerkeleyHack'
import ECOBitesBSWHackathon from './components/ECOBitesBSWHackathon'
import FRCJavaFramework from './components/FRCJavaFramework'

const VerifyPage = lazy(() => import('./components/VerifyPage'))

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/commit-boost-charon" element={<CommitBoostCharon />} />
      <Route path="/focil-in-reth" element={<FocilInReth />} />
      <Route path="/consider-this" element={<ConsiderThisBerkeleyHack />} />
      <Route path="/eco-bites" element={<ECOBitesBSWHackathon />} />
      <Route path="/frc-java-framework" element={<FRCJavaFramework />} />
      <Route path="/verify" element={<Suspense fallback={null}><VerifyPage /></Suspense>} />
    </Routes>
  </Router>
)

export default App
