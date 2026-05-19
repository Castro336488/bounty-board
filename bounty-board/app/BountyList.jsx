'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI, USDC_ADDRESS, USDC_ABI } from '../contract'

export default function PostBounty() {
  const { address } = useAccount()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [reward, setReward] = useState('')

  const { writeContract: approve, data: approveTx } = useWriteContract()
  const { writeContract: post, data: postTx } = useWriteContract()

  const { isLoading: approving } = useWaitForTransactionReceipt({ hash: approveTx })
  const { isLoading: posting } = useWaitForTransactionReceipt({ hash: postTx })

  async function handlePost() {
    if (!title || !desc || !reward) return alert('Fill in all fields')
    const amount = parseUnits(reward, 6)
    approve({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      functionName: 'approve',
      args: [CONTRACT_ADDRESS, amount],
    }, {
      onSuccess: () => {
        post({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'postBounty',
          args: [title, desc, amount],
        }, {
          onSuccess: () => {
            setTitle(''); setDesc(''); setReward(''); setOpen(false)
          }
        })
      }
    })
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '17px', fontWeight: '600' }}>Open bounties</h2>
        <button onClick={() => setOpen(!open)}>+ Post bounty</button>
      </div>

      {open && (
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '4px' }}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Build a swap UI for Arc" style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '4px' }}>Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the task and deliverables..." style={{ width: '100%', minHeight: '80px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '4px' }}>Reward (USDC)</label>
            <input type="number" value={reward} onChange={e => setReward(e.target.value)} placeholder="e.g. 50" style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handlePost} disabled={approving || posting}>
              {approving ? 'Approving...' : posting ? 'Posting...' : 'Lock & post'}
            </button>
            <button onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}