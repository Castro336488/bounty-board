'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract'

export default function PostBounty() {
  const [open, setOpen] = useState(false)
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
        setTitle(''); setDesc(''); setReward(''); setOpen(false)
      },
      onError: (e) => console.error('error:', e)
    })
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '17px', fontWeight: '700' }}>Open bounties</h2>
        <button onClick={() => setOpen(!open)} style={{ background: '#ef9f27', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: '8px', fontWeight: '700' }}>+ Post bounty</button>
      </div>

      {open && (
        <div style={{ background: '#fff', border: '2px solid #f0e8d8', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '4px', fontWeight: '600' }}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Build a swap UI for Arc" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '4px', fontWeight: '600' }}>Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the task and deliverables..." />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '4px', fontWeight: '600' }}>Reward (USDC)</label>
            <input type="number" value={reward} onChange={e => setReward(e.target.value)} placeholder="e.g. 10" />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handlePost} disabled={isLoading} style={{ background: '#ef9f27', color: '#fff', border: 'none', fontWeight: '700' }}>
              {isLoading ? 'Posting...' : 'Lock & post'}
            </button>
            <button onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}