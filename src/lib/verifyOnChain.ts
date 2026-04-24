import { createPublicClient, http, defineChain } from 'viem'
import { generateSignal, packAndEncode, hashToField, encodeAction } from '@worldcoin/idkit-core/hashing'
import type { ISuccessResult } from '@worldcoin/idkit'

// World Chain mainnet (chainId 480) — Worldcoin's own L2, separate from OP Mainnet
const worldChain = defineChain({
  id: 480,
  name: 'World Chain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://worldchain-mainnet.g.alchemy.com/public'] },
  },
  blockExplorers: {
    default: { name: 'Worldscan', url: 'https://worldscan.org' },
  },
})

// WorldID Router on World Chain mainnet
const WORLD_ID_ROUTER = '0x17B354dD2595411ff79041f930e491A4Df39A278' as const

const VERIFY_PROOF_ABI = [
  {
    name: 'verifyProof',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'root',                  type: 'uint256' },
      { name: 'groupId',               type: 'uint256' },
      { name: 'signalHash',            type: 'uint256' },
      { name: 'nullifierHash',         type: 'uint256' },
      { name: 'externalNullifierHash', type: 'uint256' },
      { name: 'proof',                 type: 'uint256[8]' },
    ],
    outputs: [],
  },
] as const

export const client = createPublicClient({
  chain: worldChain,
  transport: http('https://worldchain-mainnet.g.alchemy.com/public'),
})

export function decodeProof(proofHex: string): readonly [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint] {
  const hex = proofHex.startsWith('0x') ? proofHex.slice(2) : proofHex
  return Array.from({ length: 8 }, (_, i) =>
    BigInt('0x' + hex.slice(i * 64, (i + 1) * 64))
  ) as unknown as readonly [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint]
}

/**
 * Compute externalNullifierHash per the World ID protocol:
 *   externalNullifier     = encodePacked(hashToField(appId), action_string)
 *   externalNullifierHash = hashToField(externalNullifier)
 */
export function computeExternalNullifier(appId: string, action: string): bigint {
  return packAndEncode([
    ['bytes32', hashToField(appId).digest],
    ['string',  encodeAction(action)],
  ]).hash
}

export type OnChainResult =
  | { status: 'valid' }
  | { status: 'invalid'; reason: string }
  | { status: 'error'; reason: string }

export async function verifyOnChain(
  proof: ISuccessResult,
  signal: string,
  appId: string,
  action: string,
): Promise<OnChainResult> {
  const args = [
    BigInt(proof.merkle_root),
    1n,                                           // groupId: 1 = Orb
    generateSignal(signal).hash,
    BigInt(proof.nullifier_hash),
    computeExternalNullifier(appId, action),
    decodeProof(proof.proof),
  ] as const

  if (import.meta.env.DEV) {
    console.debug('[verifyOnChain] args:', args.map(a =>
      typeof a === 'bigint' ? `0x${a.toString(16)}` : a
    ))
  }

  try {
    await client.readContract({
      address: WORLD_ID_ROUTER,
      abi: VERIFY_PROOF_ABI,
      functionName: 'verifyProof',
      args,
    })
    return { status: 'valid' }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (import.meta.env.DEV) console.error('[verifyOnChain] error:', msg)

    if (msg.includes('InvalidProof') || msg.includes('reverted') || msg.includes('execution reverted'))
      return { status: 'invalid', reason: 'Contract rejected: cryptographically invalid or Merkle root expired.' }

    return { status: 'error', reason: `Error: ${msg.slice(0, 120)}` }
  }
}
