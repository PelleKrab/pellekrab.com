import Image from 'next/image'
import Link from 'next/link'
import Nav from './Nav'

const About: React.FC = () => {
  return (
    <div className="container">
      <div className="header">
        <h1 className="profile-name">Pelle Krabbenhöft</h1>
        <Nav />
        <Image
          src="/images/headshot.jpg"
          alt="Pelle"
          width={140}
          height={140}
          className="profile-image-about"
        />
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
        <h2 className="section-title">what i'm doing</h2>
        <ul style={{ fontSize: '15px', marginTop: '12px', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>getting <Link href="/focil-in-reth">FOCIL</Link> to mainnet</li>
          <li style={{ marginBottom: '8px' }}>messing around in <a href="https://github.com/rust-osdev/uefi-rs" target="_blank" rel="noopener noreferrer">UEFI-rs</a></li>
          <li style={{ marginBottom: '8px' }}>learning german</li>
          <li style={{ marginBottom: '8px' }}>climbing rocks and sliding down mountains</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">what i've done</h2>
        <ul style={{ fontSize: '15px', marginTop: '12px', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>prototyped <Link href="/focil-in-reth">FOCIL for Reth</Link></li>
          <li style={{ marginBottom: '8px' }}>messed around with <a href="https://www.microsoft.com/en-us/security/blog/2020/11/17/meet-the-microsoft-pluton-processor-the-security-chip-designed-for-the-future-of-windows-pcs/" target="_blank" rel="noopener noreferrer">Pluton chips</a> at Microsoft</li>
          <li style={{ marginBottom: '8px' }}>built out and ran CU Blockchain Club</li>
          <li style={{ marginBottom: '8px' }}>hackathons and fullstack work</li>
          <li style={{ marginBottom: '8px' }}>taught coding</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">current obsessions</h2>
        <p>
          rust, hardware, <a href="https://en.wikipedia.org/wiki/Zero-knowledge_proof" target="_blank" rel="noopener noreferrer">ZK</a>, prop AMMs, blockchain protocols
        </p>
      </section>
    </div>
  )
}

export default About
