'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI, CATEGORIES } from '../contract'

export default function PostBounty({ onSuccess }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [reward, setReward] = useState('')
  const [category, setCategory] = useState(0)
  const [deadline, setDeadline] = useState('')

  const { writeContract, data: tx } = useWriteContract()
  const { isLoading } = useWaitForTransactionReceipt({ hash: tx })

  async function handlePost() {
    if (!title || !desc || !reward) return alert('Fill in all fields')
    const amount = parseUnits(reward, 18)
    const deadlineTs = deadline ? BigInt(Math.floor(new Date(deadline).getTime() / 1000)) : BigInt(0)

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'postBounty',
      args: [title, desc, category, deadlineTs],
      value: amount,
    }, {
      onSuccess: () => {
        setTitle(''); setDesc(''); setReward(''); setCategory(0); setDeadline('')
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>CATEGORY</label>
            <select value={category} onChange={e => setCategory(Number(e.target.value))}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '14px', outline: 'none' }}>
              {CATEGORIES.map((c, i) => (
                <option key={c} value={i} style={{ background: '#0a1628' }}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>REWARD (USDC)</label>
            <input type="number" value={reward} onChange={e => setReward(e.target.value)} placeholder="e.g. 10" />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>
            DEADLINE <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: '400' }}>(optional)</span>
          </label>
          <input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)}
            style={{ colorScheme: 'dark' }} />
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '4px' }}>If set, bounty auto-refunds after this date if not approved</div>
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