'use client'
import { useState } from 'react'
import type { ISuccessResult } from '@worldcoin/idkit'

interface ProofDisplayProps {
  proof: ISuccessResult
}

export default function ProofDisplay({ proof }: ProofDisplayProps) {
  const [expanded, setExpanded] = useState(false)

  const truncate = (str: string, len = 32) =>
    str.length > len ? str.slice(0, len) + '...' : str

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <span className="text-green-400 text-lg">✓</span>
        <span className="text-green-400 text-sm font-semibold tracking-widest uppercase">
          Verified Human
        </span>
      </div>

      <div className="border border-neutral-800 divide-y divide-neutral-800">
        <div className="grid grid-cols-[160px_1fr] gap-4 px-4 py-3">
          <span className="text-neutral-600 text-xs font-mono">verification_level</span>
          <span className="text-neutral-300 text-xs font-mono">{proof.verification_level}</span>
        </div>
        <div className="grid grid-cols-[160px_1fr] gap-4 px-4 py-3">
          <span className="text-neutral-600 text-xs font-mono">merkle_root</span>
          <span className="text-neutral-300 text-xs font-mono break-all">{proof.merkle_root}</span>
        </div>
        <div className="grid grid-cols-[160px_1fr] gap-4 px-4 py-3">
          <span className="text-neutral-600 text-xs font-mono">nullifier_hash</span>
          <span className="text-neutral-300 text-xs font-mono break-all">{proof.nullifier_hash}</span>
        </div>
        <div className="grid grid-cols-[160px_1fr] gap-4 px-4 py-3">
          <span className="text-neutral-600 text-xs font-mono self-start">proof</span>
          <span className="text-neutral-300 text-xs font-mono break-all">
            {expanded ? proof.proof : truncate(proof.proof)}{' '}
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-neutral-500 hover:text-neutral-300 transition-colors underline text-xs font-mono"
            >
              [{expanded ? 'collapse' : 'expand'}]
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}
