import React from 'react'
import ProjectEntry from './ProjectEntry'

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="header">
        <h1 className="profile-name">Pelle Krabbenhöft</h1>
        <p className="profile-title">dev, hacker, pilot</p>
      </div>

      <section className="section">
        <div className="social-links">
          <a href="https://www.linkedin.com/in/pellekrab" target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href="https://github.com/PelleKrab" target="_blank" rel="noopener noreferrer">github</a>
          <a href="https://x.com/pellekrab" target="_blank" rel="noopener noreferrer">x</a>
          <a href="mailto:pellekrab.1440g@passmail.net">email</a>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Projects</h2>
        <div className="project-list">
          <ProjectEntry
            href="/focil-in-reth"
            title="Ethereum Protocol Fellowship - FOCIL in Reth (2025)"
            description="A final report on the implementation, testing, and future of FOCIL (Fork Choice Enforced Inclusion List) in Reth, an Ethereum client."
            technologies="rust, Ethereum, Kurtosis"
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

export default Home
