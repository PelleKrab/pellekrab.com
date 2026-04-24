import React, { useState } from 'react'
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'
import type { ISuccessResult } from '@worldcoin/idkit'
import ProofDisplay from './ProofDisplay'
import { SIGNAL } from '../lib/constants'

const mono = "'JetBrains Mono', 'Courier New', monospace"

const VerifyButton: React.FC = () => {
  const [proof, setProof] = useState<ISuccessResult | null>(null)

  // Verification is done on-chain via verifyOnChain — skip the Worldcoin centralized API
  const handleVerify = async (_result: ISuccessResult) => {}

  const onSuccess = (result: ISuccessResult) => {
    setProof(result)
    if (import.meta.env.DEV) {
      console.log('WORLD ID PROOF — paste into src/content/world-id-proof.json:\n' + JSON.stringify(result, null, 2))
    }
  }

  if (proof) {
    return <ProofDisplay proof={proof} />
  }

  return (
    <div>
      <p style={{ color: '#737373', fontSize: '14px', fontFamily: mono, marginBottom: '24px', lineHeight: 1.625 }}>
        Click to open the World ID verification widget. Scan the QR code with the World App to complete Orb verification.
      </p>
      <IDKitWidget
        app_id={import.meta.env.VITE_WLD_APP_ID as `app_${string}`}
        action={import.meta.env.VITE_WLD_ACTION as string}
        signal={SIGNAL}
        onSuccess={onSuccess}
        handleVerify={handleVerify}
        verification_level={VerificationLevel.Orb}
      >
        {({ open }: { open: () => void }) => (
          <button
            onClick={open}
            style={{
              border: '1px solid #737373',
              color: '#d4d4d4',
              padding: '12px 24px',
              fontSize: '14px',
              fontFamily: mono,
              letterSpacing: '0.05em',
              background: 'none',
              cursor: 'pointer',
              transition: 'border-color 0.15s, color 0.15s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#737373'; e.currentTarget.style.color = '#d4d4d4' }}
          >
            {'> verify_human()'}
          </button>
        )}
      </IDKitWidget>
    </div>
  )
}

export default VerifyButton
