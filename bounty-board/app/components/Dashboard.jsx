'use client'

import { useReadContract } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI, STATUS } from '../contract'

export default function Dashboard({ setActivePage }) {
  const { data: bounties } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllBounties',
    query: { refetchInterval: 5000 }
  })

  const total = bounties?.length || 0
  const totalLocked = bounties?.filter(b => STATUS[b.status] === 'Open').reduce((acc, b) => acc + Number(b.reward), 0) || 0
  const totalPaid = bounties?.filter(b => STATUS[b.status] === 'Completed').reduce((acc, b) => acc + Number(b.reward), 0) || 0
  const recent = bounties ? [...bounties].reverse().slice(0, 3) : []

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Dashboard</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Overview of all bounty activity on Arc Testnet</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '2rem' }}>
        {[
          { label: 'Total Bounties', value: total, color: '#fff' },
          { label: 'USDC Locked', value: '$' + (totalLocked / 1e18).toFixed(2), color: '#5b8dee' },
          { label: 'USDC Paid Out', value: '$' + (totalPaid / 1e18).toFixed(2), color: '#1D9E75' },
          { label: 'Open Bounties', value: bounties?.filter(b => STATUS[b.status] === 'Open').length || 0, color: '#ef9f27' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '1.1rem' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontSize: '24px', fontWeight: '600', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Recent bounties */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>Recent Bounties</h2>
          <button onClick={() => setActivePage('browse')} style={{ fontSize: '12px', color: '#5b8dee', background: 'transparent', border: 'none', padding: '4px 8px' }}>View all →</button>
        </div>

        {recent.length === 0 ? (
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
            No bounties yet. Be the first to post one!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recent.map(b => {
              const status = STATUS[b.status]
              const reward = (Number(b.reward) / 1e18).toFixed(2)
              return (
                <div key={b.id.toString()} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.title}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{Number(b.submissionCount)} submission{Number(b.submissionCount) !== 1 ? 's' : ''}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#5b8dee' }}>${reward} USDC</span>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: '500',
                      background: status === 'Open' ? 'rgba(91,141,238,0.15)' : status === 'Completed' ? 'rgba(29,158,117,0.15)' : 'rgba(255,255,255,0.05)',
                      color: status === 'Open' ? '#5b8dee' : status === 'Completed' ? '#1D9E75' : '#888',
                      border: `0.5px solid ${status === 'Open' ? 'rgba(91,141,238,0.3)' : status === 'Completed' ? 'rgba(29,158,117,0.3)' : 'rgba(255,255,255,0.1)'}`
                    }}>{status}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        <div onClick={() => setActivePage('post')} style={{ background: 'linear-gradient(135deg, rgba(26,58,124,0.4), rgba(45,93,192,0.4))', border: '0.5px solid rgba(91,141,238,0.3)', borderRadius: '10px', padding: '1.25rem', cursor: 'pointer', transition: 'all 0.15s' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>➕</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Post a bounty</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Lock USDC and get work done</div>
        </div>
        <div onClick={() => setActivePage('browse')} style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '1.25rem', cursor: 'pointer', transition: 'all 0.15s' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Browse bounties</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Find tasks and earn USDC</div>
        </div>
      </div>
    </div>
  )
}