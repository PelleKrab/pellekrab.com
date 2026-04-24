import React, { useState } from 'react'
import type { ISuccessResult } from '@worldcoin/idkit'
import { generateSignal } from '@worldcoin/idkit-core/hashing'
import { SIGNAL } from '../lib/constants'
import { verifyOnChain, computeExternalNullifier, decodeProof } from '../lib/verifyOnChain'

interface ProofDisplayProps {
  proof: ISuccessResult
  appId?: string
  action?: string
}

const mono = "'JetBrains Mono', 'Courier New', monospace"

const cellStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '160px 1fr',
  gap: '16px',
  padding: '12px 16px',
  borderBottom: '1px solid #262626',
}

const labelStyle: React.CSSProperties = {
  color: '#525252',
  fontSize: '12px',
  fontFamily: mono,
}

const valueStyle: React.CSSProperties = {
  color: '#d4d4d4',
  fontSize: '12px',
  fontFamily: mono,
  wordBreak: 'break-all',
}

type VerifyState = 'idle' | 'loading' | 'done'
type VerifyResult = { ok: boolean; message: string } | null

const ProofDisplay: React.FC<ProofDisplayProps> = ({ proof, appId, action }) => {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [verifyState, setVerifyState] = useState<VerifyState>('idle')
  const [verifyResult, setVerifyResult] = useState<VerifyResult>(null)

  const truncate = (str: string, len = 32) =>
    str.length > len ? str.slice(0, len) + '...' : str

  const effectiveAppId = appId ?? import.meta.env.VITE_WLD_APP_ID
  const effectiveAction = action ?? import.meta.env.VITE_WLD_ACTION

  const h = (n: bigint) => '0x' + n.toString(16)
  const signalHash = generateSignal(SIGNAL).hash
  const externalNullifierHash = computeExternalNullifier(effectiveAppId, effectiveAction)
  const proofArr = decodeProof(proof.proof)

  const castCommand = `# signal:               "${SIGNAL}"
# signalHash:           ${h(signalHash)}  (keccak256 of signal)
# nullifierHash:        ${proof.nullifier_hash}
# externalNullifier:    ${h(externalNullifierHash)}  (keccak256 of appId + action)
# root:                 ${proof.merkle_root}

cast call \\
  0x17B354dD2595411ff79041f930e491A4Df39A278 \\
  "verifyProof(uint256,uint256,uint256,uint256,uint256,uint256[8])" \\
  ${proof.merkle_root} 1 \\
  ${h(signalHash)} \\
  ${proof.nullifier_hash} \\
  ${h(externalNullifierHash)} \\
  "[${proofArr.map(h).join(',')}]" \\
  --rpc-url https://worldchain-mainnet.g.alchemy.com/public
# returns 0x = valid. revert = invalid proof.`

  const handleCopy = () => {
    navigator.clipboard.writeText(castCommand).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleVerify = async () => {
    setVerifyState('loading')
    setVerifyResult(null)
    const result = await verifyOnChain(proof, SIGNAL, effectiveAppId, effectiveAction)
    setVerifyResult(
      result.status === 'valid'
        ? { ok: true,  message: 'Proof accepted by WorldID Router on World Chain. Cryptographically valid.' }
        : { ok: false, message: result.reason }
    )
    setVerifyState('done')
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <span style={{ color: '#4ade80', fontSize: '18px' }}>✓</span>
        <span style={{ color: '#4ade80', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: mono }}>
          Verified Human
        </span>
      </div>

      {/* Proof fields */}
      <div style={{ border: '1px solid #262626', marginBottom: '32px' }}>
        <div style={cellStyle}>
          <span style={labelStyle}>verification_level</span>
          <span style={valueStyle}>{proof.verification_level}</span>
        </div>
        <div style={{ ...cellStyle, backgroundColor: '#0f1a0f' }}>
          <span style={{ ...labelStyle, color: '#4ade80' }}>signal</span>
          <span style={{ ...valueStyle, color: '#4ade80' }}>
            {SIGNAL}
            <span style={{ color: '#525252', fontSize: '11px', display: 'block', marginTop: '4px' }}>
              statement committed into the proof. verification fails with any other string.
            </span>
          </span>
        </div>
        <div style={cellStyle}>
          <span style={labelStyle}>nullifier_hash</span>
          <span style={valueStyle}>{proof.nullifier_hash}</span>
        </div>
        <div style={cellStyle}>
          <span style={labelStyle}>merkle_root</span>
          <span style={valueStyle}>{proof.merkle_root}</span>
        </div>
        <div style={{ ...cellStyle, borderBottom: 'none', alignItems: 'flex-start' }}>
          <span style={labelStyle}>proof</span>
          <span style={valueStyle}>
            {expanded ? proof.proof : truncate(proof.proof)}{' '}
            <button
              onClick={() => setExpanded(!expanded)}
              style={{ color: '#737373', textDecoration: 'underline', fontSize: '12px', fontFamily: mono, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#d4d4d4')}
              onMouseLeave={e => (e.currentTarget.style.color = '#737373')}
            >
              [{expanded ? 'collapse' : 'expand'}]
            </button>
          </span>
        </div>
      </div>

      {/* Independent verification */}
      <div style={{ color: '#525252', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px', fontFamily: mono }}>
        // verify independently
      </div>
      <p style={{ color: '#737373', fontSize: '13px', lineHeight: 1.625, marginBottom: '8px', fontFamily: mono }}>
        Calls verifyProof on the{' '}
        <a
          href="https://worldscan.org/address/0x17B354dD2595411ff79041f930e491A4Df39A278"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#525252', fontFamily: mono }}
        >
          WorldID Router
        </a>
        {' '}on World Chain directly, no Worldcoin API. A wrong proof or signal causes a revert. You can also run the cast command below yourself.
      </p>

      {/* In-browser button */}
      <button
        onClick={handleVerify}
        disabled={verifyState === 'loading'}
        style={{
          border: '1px solid #525252',
          color: '#a3a3a3',
          padding: '8px 16px',
          fontSize: '13px',
          fontFamily: mono,
          background: 'none',
          cursor: verifyState === 'loading' ? 'not-allowed' : 'pointer',
          opacity: verifyState === 'loading' ? 0.5 : 1,
          marginBottom: '12px',
          textDecoration: 'none',
          transition: 'border-color 0.15s, color 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4d4d4'; e.currentTarget.style.color = '#d4d4d4' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#525252'; e.currentTarget.style.color = '#a3a3a3' }}
      >
        {verifyState === 'loading' ? '// calling contract...' : '> verify_on_chain()'}
      </button>

      {verifyResult && (
        <div style={{ fontSize: '13px', fontFamily: mono, marginBottom: '16px', color: verifyResult.ok ? '#4ade80' : '#f87171' }}>
          {verifyResult.ok ? '✓ ' : '✗ '}{verifyResult.message}
        </div>
      )}

      {/* curl command */}
      <div style={{ position: 'relative' }}>
        <pre style={{
          backgroundColor: '#111111',
          border: '1px solid #262626',
          padding: '16px',
          fontSize: '11px',
          fontFamily: mono,
          color: '#737373',
          overflowX: 'auto',
          lineHeight: 1.7,
          margin: 0,
        }}>
          {castCommand}
        </pre>
        <button
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: '1px solid #333',
            color: copied ? '#4ade80' : '#525252',
            padding: '4px 10px',
            fontSize: '11px',
            fontFamily: mono,
            background: '#111111',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
    </div>
  )
}

export default ProofDisplay
