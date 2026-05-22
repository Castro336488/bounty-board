'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI, STATUS } from '../contract'

function BountySubmissions({ bountyId, isMyBounty, bountyStatus }) {
  const { writeContract, data: tx } = useWriteContract()
  const { isLoading } = useWaitForTransactionReceipt({ hash: tx })

  const { data: submissions, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getBountySubmissions',
    args: [BigInt(bountyId)],
    query: { refetchInterval: 5000 }
  })

  if (!submissions || submissions.length === 0) {
    return <p style={{ fontSize: '13px', color: '#aaa', marginTop: '8px' }}>No submissions yet.</p>
  }

  return (
    <div style={{ marginTop: '12px' }}>
      <div style={{ fontSize: '13px', fontWeight: '700', color: '#888', marginBottom: '8px' }}>
        Submissions ({submissions.length})
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {submissions.map((s, i) => (
          <div key={i} style={{ background: s.approved ? '#e1f5ee' : '#fff9f0', border: `1px solid ${s.approved ? '#1d9e75' : '#f0e8d8'}`, borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#888', fontFamily: 'monospace', marginBottom: '3px' }}>
                {s.solver.slice(0,8)}...{s.solver.slice(-6)}
              </div>
              <a href={s.submissionUrl} target="_blank" style={{ fontSize: '13px', color: '#ef9f27', wordBreak: 'break-all' }}>
                {s.submissionUrl}
              </a>
            </div>
            {s.approved ? (
              <span style={{ fontSize: '12px', background: '#1d9e75', color: '#fff', borderRadius: '20px', padding: '3px 10px', fontWeight: '600', whiteSpace: 'nowrap' }}>✓ Approved</span>
            ) : isMyBounty && bountyStatus === 'Open' ? (
              <button
                onClick={() => writeContract({
                  address: CONTRACT_ADDRESS,
                  abi: CONTRACT_ABI,
                  functionName: 'approveWork',
                  args: [BigInt(bountyId), BigInt(i + 1)],
                }, { onSuccess: () => refetch() })}
                disabled={isLoading}
                style={{ background: '#ef9f27', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 14px', fontWeight: '700', fontSize: '12px', whiteSpace: 'nowrap' }}
              >
                {isLoading ? 'Processing...' : '✓ Approve & pay'}
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BountyList() {
  const { address } = useAccount()
  const [submitUrls, setSubmitUrls] = useState({})
  const [expanded, setExpanded] = useState({})

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
    }, { onSuccess: () => { refetch(); setSubmitUrls(p => ({ ...p, [id]: '' })) } })
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

  function toggleExpanded(id) {
    setExpanded(p => ({ ...p, [id]: !p[id] }))
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
        const isExpanded = expanded[b.id.toString()]

        return (
          <div key={b.id.toString()} style={{ background: '#fff', border: '2px solid #f0e8d8', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <span style={{ fontSize: '15px', fontWeight: '700' }}>{b.title}</span>
              <span style={{ fontSize: '12px', padding: '3px 10px', borderRadius: '20px', fontWeight: '600',
                background: status === 'Open' ? '#fff9f0' : status === 'Completed' ? '#e1f5ee' : '#f1f0ee',
                color: status === 'Open' ? '#ef9f27' : status === 'Completed' ? '#1d9e75' : '#888',
                border: `1px solid ${status === 'Open' ? '#ef9f27' : status === 'Completed' ? '#1d9e75' : '#ddd'}`
              }}>
                {status}
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{b.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', background: '#fff9f0', color: '#ef9f27', border: '1px solid #ef9f27', borderRadius: '20px', padding: '3px 12px' }}>${reward} USDC</span>
              <span style={{ fontSize: '12px', color: '#999', fontFamily: 'monospace' }}>by {isMyBounty ? 'you' : b.poster.slice(0,8)+'...'+b.poster.slice(-6)}</span>
              <span style={{ fontSize: '12px', color: '#aaa' }}>{Number(b.submissionCount)} submission{Number(b.submissionCount) !== 1 ? 's' : ''}</span>
              <button onClick={() => toggleExpanded(b.id.toString())} style={{ fontSize: '12px', padding: '3px 10px', borderRadius: '20px', border: '1px solid #f0e8d8', background: '#fff9f0', color: '#ba7517', fontWeight: '600' }}>
                {isExpanded ? 'Hide' : 'View submissions'}
              </button>
            </div>

            {isExpanded && (
              <BountySubmissions
                bountyId={b.id.toString()}
                isMyBounty={isMyBounty}
                bountyStatus={status}
              />
            )}

            {status === 'Open' && !isMyBounty && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <input
                  placeholder="Your submission URL (GitHub, IPFS...)"
                  value={submitUrls[b.id] || ''}
                  onChange={e => setSubmitUrls(p => ({ ...p, [b.id]: e.target.value }))}
                />
                <button onClick={() => submitWork(b.id)} disabled={isLoading} style={{ background: '#ef9f27', color: '#fff', border: 'none', fontWeight: '700', whiteSpace: 'nowrap' }}>
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            )}

            {status === 'Open' && isMyBounty && (
              <button onClick={() => cancelBounty(b.id)} style={{ marginTop: '10px', color: '#d85a30', background: '#faece7', border: 'none', borderRadius: '8px', padding: '7px 16px', fontWeight: '600' }}>
                Cancel & refund
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}