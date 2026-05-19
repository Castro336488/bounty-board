'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI, STATUS } from '../contract'

export default function BountyList() {
  const { address } = useAccount()
  const [submitUrls, setSubmitUrls] = useState({})

  const { data: bounties, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllBounties',
    query: { refetchInterval: 5000 }
  })

  const { writeContract, data: tx } = useWriteContract()
  const { isLoading } = useWaitForTransactionReceipt({ hash: tx })

  function submitWork(id) {
    const url = submitUrls[id]
    if (!url) return alert('Enter a submission URL')
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'submitWork',
      args: [BigInt(id), url],
    }, { onSuccess: () => refetch() })
  }

  function approveWork(id) {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'approveWork',
      args: [BigInt(id)],
    }, { onSuccess: () => refetch() })
  }

  function cancelBounty(id) {
    if (!confirm('Cancel and get refund?')) return
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'cancelBounty',
      args: [BigInt(id)],
    }, { onSuccess: () => refetch() })
  }

  if (!bounties || bounties.length === 0) {
    return <p style={{ color: '#888', fontSize: '14px' }}>No bounties yet. Be the first to post one!</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[...bounties].reverse().map(b => {
        const status = STATUS[b.status]
        const reward = (Number(b.reward) / 1e18).toFixed(2)
        const isMyBounty = b.poster.toLowerCase() === address.toLowerCase()

        return (
          <div key={b.id.toString()} style={{ background: '#fff', border: '2px solid #f0e8d8', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <span style={{ fontSize: '15px', fontWeight: '700' }}>{b.title}</span>
              <span style={{ fontSize: '12px', padding: '3px 10px', borderRadius: '20px', fontWeight: '600',
                background: status === 'Open' ? '#fff9f0' : status === 'Submitted' ? '#faeeda' : status === 'Completed' ? '#e1f5ee' : '#f1f0ee',
                color: status === 'Open' ? '#ef9f27' : status === 'Submitted' ? '#ba7517' : status === 'Completed' ? '#1d9e75' : '#888',
                border: `1px solid ${status === 'Open' ? '#ef9f27' : status === 'Submitted' ? '#ba7517' : status === 'Completed' ? '#1d9e75' : '#ddd'}`
              }}>
                {status}
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{b.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', background: '#fff9f0', color: '#ef9f27', border: '1px solid #ef9f27', borderRadius: '20px', padding: '3px 12px' }}>${reward} USDC</span>
              <span style={{ fontSize: '12px', color: '#999', fontFamily: 'monospace' }}>by {isMyBounty ? 'you' : b.poster.slice(0,8)+'...'+b.poster.slice(-6)}</span>
            </div>

            {b.submissionUrl && (
              <p style={{ fontSize: '13px', marginBottom: '8px' }}>
                Submission: <a href={b.submissionUrl} target="_blank" style={{ color: '#ef9f27' }}>{b.submissionUrl}</a>
              </p>
            )}

            {status === 'Open' && !isMyBounty && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <input
                  placeholder="Submission URL (GitHub, IPFS...)"
                  value={submitUrls[b.id] || ''}
                  onChange={e => setSubmitUrls(p => ({ ...p, [b.id]: e.target.value }))}
                />
                <button onClick={() => submitWork(b.id)} disabled={isLoading} style={{ background: '#ef9f27', color: '#fff', border: 'none', fontWeight: '700', whiteSpace: 'nowrap' }}>Submit work</button>
              </div>
            )}

            {status === 'Open' && isMyBounty && (
              <button onClick={() => cancelBounty(b.id)} style={{ marginTop: '10px', color: '#d85a30', background: '#faece7', border: 'none', borderRadius: '8px', padding: '7px 16px', fontWeight: '600' }}>
                Cancel & refund
              </button>
            )}

            {status === 'Submitted' && isMyBounty && (
              <button onClick={() => approveWork(b.id)} disabled={isLoading} style={{ marginTop: '10px', color: '#1d9e75', background: '#e1f5ee', border: 'none', borderRadius: '8px', padding: '7px 16px', fontWeight: '600' }}>
                {isLoading ? 'Processing...' : '✓ Approve & release USDC'}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}