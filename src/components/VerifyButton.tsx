'use client'
import { useState } from 'react'
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'
import type { ISuccessResult } from '@worldcoin/idkit'
import ProofDisplay from './ProofDisplay'

export default function VerifyButton() {
  const [proof, setProof] = useState<ISuccessResult | null>(null)
  const [verifying, setVerifying] = useState(false)

  const handleVerify = async (result: ISuccessResult) => {
    setVerifying(true)
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.detail || 'Verification failed')
      }
    } finally {
      setVerifying(false)
    }
  }

  const onSuccess = (result: ISuccessResult) => {
    setProof(result)
  }

  if (proof) {
    return <ProofDisplay proof={proof} />
  }

  return (
    <div>
      <p className="text-neutral-500 text-sm font-mono mb-6 leading-relaxed">
        Click to open the World ID verification widget. Scan the QR code with the World App to
        complete Orb verification.
      </p>
      <IDKitWidget
        app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`}
        action={process.env.NEXT_PUBLIC_WLD_ACTION!}
        onSuccess={onSuccess}
        handleVerify={handleVerify}
        verification_level={VerificationLevel.Orb}
      >
        {({ open }: { open: () => void }) => (
          <button
            onClick={open}
            disabled={verifying}
            className="border border-neutral-600 text-neutral-300 px-6 py-3 text-sm font-mono tracking-wide hover:border-white hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {verifying ? '// verifying...' : '> verify_human()'}
          </button>
        )}
      </IDKitWidget>
    </div>
  )
}
