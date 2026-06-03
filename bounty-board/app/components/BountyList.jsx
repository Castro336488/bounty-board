'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI, STATUS, CATEGORIES } from '../contract'

function Countdown({ deadline }) {
  const now = Date.now()
  const diff = Number(deadline) * 1000 - now
  if (diff <= 0) return <span style={{ fontSize: '11px', color: '#d85a30' }}>Expired</span>
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  if (days > 0) return <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>⏰ {days}d {hours}h left</span>
  return <span style={{ fontSize: '11px', color: '#ef9f27' }}>⏰ {hours}h {mins}m left</span>
}

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
    return <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', marginTop: '8px' }}>No submissions yet.</p>
  }

  return (
    <div style={{ marginTop: '12px' }}>
      <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.3)', marginBottom: '8px', letterSpacing: '0.5px' }}>
        SUBMISSIONS ({submissions.length})
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {submissions.map((s, i) => (
          <div key={i} style={{ background: s.approved ? 'rgba(29,158,117,0.1)' : 'rgba(255,255,255,0.03)', border: `0.5px solid ${s.approved ? 'rgba(29,158,117,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', marginBottom: '3px' }}>
                {s.solver.slice(0,8)}...{s.solver.slice(-6)}
              </div>
              <a href={s.submissionUrl} target="_blank" style={{ fontSize: '13px', color: '#5b8dee', wordBreak: 'break-all' }}>
                {s.submissionUrl}
              </a>
            </div>
            {s.approved ? (
              <span style={{ fontSize: '11px', background: 'rgba(29,158,117,0.2)', color: '#1D9E75', borderRadius: '20px', padding: '3px 10px', fontWeight: '600', whiteSpace: 'nowrap' }}>✓ Approved</span>
            ) : isMyBounty && bountyStatus === 'Open' ? (
              <button onClick={() => writeContract({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: 'approveWork',
                args: [BigInt(bountyId), BigInt(i + 1)],
              }, { onSuccess: () => refetch() })}
                disabled={isLoading}
                style={{ background: 'linear-gradient(135deg, #1a3a7c, #2d5dc0)', color: '#fff', border: '0.5px solid rgba(91,141,238,0.3)', borderRadius: '8px', padding: '6px 14px', fontWeight: '600', fontSize: '12px', whiteSpace: 'nowrap' }}>
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
  const [filterCategory, setFilterCategory] = useState('All')

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

  function expireBounty(id) {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'expireBounty',
      args: [BigInt(id)],
    }, { onSuccess: () => refetch() })
  }

  const filtered = bounties ? [...bounties].reverse().filter(b => filterCategory === 'All' || CATEGORIES[b.category] === filterCategory) : []

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Browse Bounties</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Find tasks and earn USDC on Arc Testnet</p>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['All', ...CATEGORIES].map(c => (
          <button key={c} onClick={() => setFilterCategory(c)}
            style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '20px', fontWeight: '500',
              background: filterCategory === c ? 'rgba(91,141,238,0.2)' : 'rgba(255,255,255,0.04)',
              border: filterCategory === c ? '0.5px solid rgba(91,141,238,0.4)' : '0.5px solid rgba(255,255,255,0.07)',
              color: filterCategory === c ? '#5b8dee' : 'rgba(255,255,255,0.4)'
            }}>
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
          No bounties found. Be the first to post one!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(b => {
            const status = STATUS[b.status]
            const reward = (Number(b.reward) / 1e18).toFixed(2)
            const isMyBounty = b.poster.toLowerCase() === address?.toLowerCase()
            const isExpanded = expanded[b.id.toString()]
            const isExpiredDeadline = Number(b.deadline) > 0 && Date.now() > Number(b.deadline) * 1000

            return (
              <div key={b.id.toString()} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>{b.title}</span>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: '500', flexShrink: 0, marginLeft: '10px',
                    background: status === 'Open' ? 'rgba(91,141,238,0.15)' : status === 'Completed' ? 'rgba(29,158,117,0.15)' : status === 'Expired' ? 'rgba(216,90,48,0.15)' : 'rgba(255,255,255,0.05)',
                    color: status === 'Open' ? '#5b8dee' : status === 'Completed' ? '#1D9E75' : status === 'Expired' ? '#d85a30' : '#888',
                    border: `0.5px solid ${status === 'Open' ? 'rgba(91,141,238,0.3)' : status === 'Completed' ? 'rgba(29,158,117,0.3)' : status === 'Expired' ? 'rgba(216,90,48,0.3)' : 'rgba(255,255,255,0.1)'}`
                  }}>{status}</span>
                </div>

                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>{b.description}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#5b8dee', background: 'rgba(91,141,238,0.1)', border: '0.5px solid rgba(91,141,238,0.2)', borderRadius: '20px', padding: '2px 10px' }}>${reward} USDC</span>
                  <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', borderRadius: '20px', padding: '2px 10px' }}>{CATEGORIES[b.category]}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>by {isMyBounty ? 'you' : b.poster.slice(0,8)+'...'+b.poster.slice(-6)}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{Number(b.submissionCount)} submission{Number(b.submissionCount) !== 1 ? 's' : ''}</span>
                  {Number(b.deadline) > 0 && status === 'Open' && <Countdown deadline={b.deadline} />}
                  <button onClick={() => setExpanded(p => ({ ...p, [b.id.toString()]: !p[b.id.toString()] }))}
                    style={{ fontSize: '11px', padding: '2px 10px', borderRadius: '20px', border: '0.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)' }}>
                    {isExpanded ? 'Hide' : 'View submissions'}
                  </button>
                </div>

                {isExpanded && <BountySubmissions bountyId={b.id.toString()} isMyBounty={isMyBounty} bountyStatus={status} />}

                {status === 'Open' && !isMyBounty && !isExpiredDeadline && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <input placeholder="Submission URL (GitHub, IPFS...)" value={submitUrls[b.id] || ''} onChange={e => setSubmitUrls(p => ({ ...p, [b.id]: e.target.value }))} />
                    <button onClick={() => submitWork(b.id)} disabled={isLoading}
                      style={{ background: 'linear-gradient(135deg, #1a3a7c, #2d5dc0)', color: '#fff', border: '0.5px solid rgba(91,141,238,0.3)', fontWeight: '600', whiteSpace: 'nowrap' }}>
                      {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                )}

                {status === 'Open' && isMyBounty && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button onClick={() => cancelBounty(b.id)}
                      style={{ color: '#d85a30', background: 'rgba(216,90,48,0.1)', border: '0.5px solid rgba(216,90,48,0.2)', borderRadius: '8px', padding: '7px 16px', fontWeight: '600', fontSize: '13px' }}>
                      Cancel & refund
                    </button>
                    {isExpiredDeadline && (
                      <button onClick={() => expireBounty(b.id)}
                        style={{ color: '#ef9f27', background: 'rgba(239,159,39,0.1)', border: '0.5px solid rgba(239,159,39,0.2)', borderRadius: '8px', padding: '7px 16px', fontWeight: '600', fontSize: '13px' }}>
                        Claim refund (expired)
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}