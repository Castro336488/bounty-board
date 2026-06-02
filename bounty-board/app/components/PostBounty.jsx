'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract'

export default function PostBounty({ onSuccess }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [reward, setReward] = useState('')

  const { writeContract, data: tx } = useWriteContract()
  const { isLoading } = useWaitForTransactionReceipt({ hash: tx })

  async function handlePost() {
    if (!title || !desc || !reward) return alert('Fill in all fields')
    const amount = parseUnits(reward, 18)
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'postBounty',
      args: [title, desc],
      value: amount,
    }, {
      onSuccess: () => {
        setTitle(''); setDesc(''); setReward('')
        if (onSuccess) onSuccess()
      },
      onError: (e) => console.error('error:', e)
    })
  }

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Post a Bounty</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Lock USDC in escrow and get work done</p>
      </div>

      <div style={{ maxWidth: '560px', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.75rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>TITLE</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Build a swap UI for Arc" />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>DESCRIPTION</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the task, deliverables and requirements..." />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>REWARD (USDC)</label>
          <input type="number" value={reward} onChange={e => setReward(e.target.value)} placeholder="e.g. 10" />
        </div>

        <div style={{ background: 'rgba(91,141,238,0.08)', border: '0.5px solid rgba(91,141,238,0.2)', borderRadius: '8px', padding: '10px 14px', marginBottom: '1.5rem', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
          💡 USDC will be locked in the smart contract escrow until you approve a submission or cancel the bounty.
        </div>

        <button onClick={handlePost} disabled={isLoading}
          style={{ width: '100%', background: 'linear-gradient(135deg, #1a3a7c, #2d5dc0)', color: '#fff', border: '0.5px solid rgba(91,141,238,0.3)', fontWeight: '600', padding: '11px', borderRadius: '8px', fontSize: '14px' }}>
          {isLoading ? 'Posting...' : '🔒 Lock USDC & Post Bounty'}
        </button>
      </div>
    </div>
  )
}