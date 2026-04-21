import type { Metadata } from 'next'
import VerifyButton from '@/components/VerifyButton'

export const metadata: Metadata = {
  title: 'Proof of Humanity — pellekrab',
  description: 'Cryptographic proof that Pelle Krabbenhöft is a unique human, verified via World ID Orb protocol.',
}

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-300" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}>
      <div className="max-w-2xl mx-auto px-8 py-16">

        {/* Header */}
        <div className="mb-12">
          <div className="text-neutral-600 text-xs tracking-widest uppercase mb-3">
            pellekrab
          </div>
          <h1 className="text-white text-xl font-semibold mb-4 tracking-tight">
            proof_of_humanity.ts
          </h1>
          <p className="text-neutral-500 text-sm leading-relaxed">
            This page cryptographically proves I am a unique human, verified via World ID&apos;s Orb
            protocol.
          </p>
        </div>

        <div className="border-t border-neutral-800 mb-12" />

        {/* Verification */}
        <section className="mb-12">
          <div className="text-neutral-600 text-xs tracking-widest uppercase mb-6">
            // verification
          </div>
          <VerifyButton />
        </section>

        <div className="border-t border-neutral-800 mb-12" />

        {/* How it works */}
        <section className="mb-12">
          <div className="text-neutral-600 text-xs tracking-widest uppercase mb-4">
            // how it works
          </div>
          <p className="text-neutral-500 text-sm leading-relaxed mb-3">
            World ID&apos;s Orb device performs iris biometric verification to confirm unique humanhood
            — one person, one identity. A zero-knowledge proof is generated locally; no biometric
            data leaves the device. The proof below cryptographically demonstrates I am a real,
            unique person without revealing my identity.
          </p>
          <p className="text-neutral-500 text-sm leading-relaxed mb-6">
            The <span className="text-neutral-400">nullifier_hash</span> is a per-action identity
            commitment — deterministic but unlinkable across apps. The{' '}
            <span className="text-neutral-400">merkle_root</span> anchors the proof to the current
            World ID state tree. The{' '}
            <span className="text-neutral-400">proof</span> is a Groth16 ZK-SNARK.
          </p>
          <a
            href="https://docs.worldcoin.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-400 transition-colors text-sm"
          >
            → docs.worldcoin.org
          </a>
        </section>

        <div className="border-t border-neutral-800 mb-8" />

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-700">
          <div className="flex gap-6">
            <a
              href="https://github.com/PelleKrab"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              github
            </a>
            <a
              href="https://x.com/pellekrab"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              twitter
            </a>
            <a
              href="/"
              className="hover:text-neutral-400 transition-colors"
            >
              portfolio
            </a>
          </div>
          <span>Built for Paradigm Fellowship 2026</span>
        </footer>

      </div>
    </main>
  )
}
