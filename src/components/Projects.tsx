import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectEntry from './ProjectEntry'

const Projects: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="header">
        <h1 className="profile-name">Pelle Krabbenhöft</h1>
        
        <nav style={{ display: 'flex', gap: '24px', fontSize: '14px', marginBottom: '24px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              textDecoration: 'underline',
              opacity: 0.6,
              fontWeight: 400
            }}
          >
            home
          </button>
          <button
            onClick={() => navigate('/projects')}
            style={{
              textDecoration: 'underline',
              opacity: 1,
              fontWeight: 600
            }}
          >
            projects
          </button>
        </nav>

        <p className="projects-subtitle">An incomplete collection of things I've worked on</p>
      </div>

      <section className="section">
        <div className="project-list">
          <ProjectEntry
            href="/focil-censorship-metrics"
            title="Ethereum FOCIL Inclusion List Analysis: Bandwidth and Censorship Metrics (2025)"
            description="A data study quantifying IL redundancy and bandwidth trade-offs across top-fee and censorship-only building strategies, using 699K blocks of BlockNative mempool data."
            technologies="Python, BlockNative, Ethereum"
          />
          <ProjectEntry
            href="/focil-in-reth"
            title="Ethereum Protocol Fellowship - FOCIL in Reth (2025)"
            description="A final report on the implementation, testing, and future of FOCIL (Fork Choice Enforced Inclusion List) in Reth, an Ethereum client."
            technologies="Rust, Ethereum, Kurtosis"
          />
          <ProjectEntry
            href="/commit-boost-charon"
            title="Charon x CommitBoost (2025)"
            description="A case study on the compatibility of CommitBoost with Charon, Obol's distributed validator middleware."
            technologies="Docker, Python, Bash, Ethers.js"
          />
          <ProjectEntry
            href="/consider-this"
            title="Consider This (UC Berkeley AI Hackathon, 2024)"
            description="An ed-tech platform designed to foster healthy, empathetic discussions with AI agents for K-12 students, emulating a Socratic Seminar environment."
            technologies="React, Next.js, Vite, TypeScript, AI, OpenAI, Hume AI"
          />
          <ProjectEntry
            href="/eco-bites"
            title="ECO Bites (Boulder Startup Week Hackathon, 2024)"
            description="A sustainability rating platform that uses AI to evaluate restaurants on their environmental practices."
            technologies="React, TypeScript, Next.js, AI, Claude 3, AWS"
          />
          <ProjectEntry
            href="/frc-java-framework"
            title="FRC Java Framework (2023)"
            description="A command-based framework allowing FIRST Robotics Competition teams to program robots using XML configuration."
            technologies="Java, OpenCV, PID, WPILib"
          />
        </div>
      </section>
    </div>
  )
}

export default Projects
