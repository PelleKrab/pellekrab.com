import { NextResponse } from 'next/server'
import type { ISuccessResult } from '@worldcoin/idkit'

export async function POST(request: Request) {
  const body: ISuccessResult = await request.json()

  const appId = process.env.NEXT_PUBLIC_WLD_APP_ID
  const action = process.env.NEXT_PUBLIC_WLD_ACTION

  if (!appId || !action) {
    return NextResponse.json(
      { success: false, detail: 'Server misconfiguration: missing app_id or action' },
      { status: 500 }
    )
  }

  const verifyRes = await fetch(
    `https://developer.worldcoin.org/api/v2/verify/${appId}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nullifier_hash: body.nullifier_hash,
        merkle_root: body.merkle_root,
        proof: body.proof,
        verification_level: body.verification_level,
        action,
      }),
    }
  )

  const data = await verifyRes.json()

  if (verifyRes.ok) {
    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    { success: false, detail: data.detail ?? 'Verification failed' },
    { status: 400 }
  )
}
