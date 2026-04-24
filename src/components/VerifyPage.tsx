import React, { useEffect } from 'react'
import type { ISuccessResult } from '@worldcoin/idkit'
import VerifyButton from './VerifyButton'
import ProofDisplay from './ProofDisplay'
import storedProof from '../content/world-id-proof.json'
import { WLD_APP_ID, WLD_ACTION } from '../lib/constants'

const mono = "'JetBrains Mono', 'Courier New', monospace"
const neutral = {
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
}

const permanentProof = storedProof as ISuccessResult | null

const VerifyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Proof of Humanity | pellekrab'
    return () => { document.title = 'Pelle Krabbenhöft' }
  }, [])

  const linkHover = (color: string) => ({
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = neutral[400] },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = color },
  })

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: neutral[300], fontFamily: mono }}>
      <div style={{ maxWidth: '672px', margin: '0 auto', padding: '64px 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ color: neutral[600], fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
            pellekrab
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 600, marginBottom: '16px', letterSpacing: '-0.025em', fontFamily: mono }}>
            proof_of_humanity.ts
          </h1>
          <p style={{ color: neutral[500], fontSize: '14px', lineHeight: 1.625 }}>
            Last year I had my iris scanned by a World ID Orb, registering me as a unique human in its on-chain identity tree.
            This page holds the ZK proof I generated from that registration, signed with the message below.
            It proves a unique, Orb-verified human deliberately signed this exact statement.
            The proof is stored here permanently and anyone can verify it directly against the WorldID Router contract on World Chain.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${neutral[800]}`, marginBottom: '48px' }} />

        {/* Verification — stored proof or live widget */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ color: neutral[600], fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>
            // verification
          </div>
          {permanentProof ? <ProofDisplay proof={permanentProof} appId={WLD_APP_ID} action={WLD_ACTION} /> : <VerifyButton />}
        </section>

        <div style={{ borderTop: `1px solid ${neutral[800]}`, marginBottom: '48px' }} />

        {/* How it works */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ color: neutral[600], fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            // how it works
          </div>
          <p style={{ color: neutral[500], fontSize: '14px', lineHeight: 1.625, marginBottom: '24px' }}>
            World ID&apos;s Orb registered my iris in the on-chain identity tree. One registration per person, verified physically.
            The ZK proof below was generated from that registration without revealing any biometric data.
            When I created it, I committed the <span style={{ color: neutral[400] }}>signal</span> statement into it,
            binding this proof to my Paradigm Fellowship application specifically.
            Verifying against any other string causes the WorldID Router contract to revert.
          </p>
          <a
            href="https://docs.worldcoin.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: neutral[600], fontSize: '14px', textDecoration: 'none' }}
            {...linkHover(neutral[600])}
          >
            → docs.worldcoin.org
          </a>
        </section>

        <div style={{ borderTop: `1px solid ${neutral[800]}`, marginBottom: '32px' }} />

        {/* Footer */}
        <footer style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', fontSize: '12px', color: neutral[700] }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { href: 'https://github.com/PelleKrab', label: 'github', external: true },
              { href: 'https://x.com/pellekrab', label: 'x', external: true },
              { href: '/', label: 'portfolio', external: false },
            ].map(({ href, label, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{ color: neutral[700], textDecoration: 'none' }}
                {...linkHover(neutral[700])}
              >
                {label}
              </a>
            ))}
          </div>
          <span>Built for Paradigm Fellowship 2026</span>
        </footer>

      </div>
    </main>
  )
}

export default VerifyPage
