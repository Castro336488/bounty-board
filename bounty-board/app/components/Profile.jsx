'use client'

import { useAccount, useReadContract } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI, STATUS } from '../contract'

export default function Profile() {
  const { address } = useAccount()

  const { data: bounties } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllBounties',
    query: { refetchInterval: 5000 }
  })

  const myPosted = bounties?.filter(b => b.poster.toLowerCase() === address?.toLowerCase()) || []
  const totalPosted = myPosted.length
  const totalSpent = myPosted.filter(b => STATUS[b.status] === 'Completed').reduce((acc, b) => acc + Number(b.reward), 0)
  const openBounties = myPosted.filter(b => STATUS[b.status] === 'Open').length

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>My Profile</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Your bounty activity on Arc Testnet</p>
      </div>

      {/* Wallet card */}
      <div style={{ background: 'linear-gradient(135deg, rgba(26,58,124,0.4), rgba(45,93,192,0.3))', border: '0.5px solid rgba(91,141,238,0.3)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>WALLET</div>
        <div style={{ fontSize: '15px', fontFamily: 'monospace', color: '#fff', marginBottom: '4px' }}>{address}</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Arc Testnet</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '2rem' }}>
        {[
          { label: 'Bounties Posted', value: totalPosted, color: '#fff' },
          { label: 'Open Bounties', value: openBounties, color: '#5b8dee' },
          { label: 'USDC Paid Out', value: '$' + (totalSpent / 1e18).toFixed(2), color: '#1D9E75' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '1rem' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontSize: '22px', fontWeight: '600', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* My bounties */}
      <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '1rem' }}>My Bounties</h2>
      {myPosted.length === 0 ? (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
          You haven't posted any bounties yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[...myPosted].reverse().map(b => {
            const status = STATUS[b.status]
            const reward = (Number(b.reward) / 1e18).toFixed(2)
            return (
              <div key={b.id.toString()} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#fff' }}>{b.title}</span>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: '500',
                    background: status === 'Open' ? 'rgba(91,141,238,0.15)' : status === 'Completed' ? 'rgba(29,158,117,0.15)' : 'rgba(255,255,255,0.05)',
                    color: status === 'Open' ? '#5b8dee' : status === 'Completed' ? '#1D9E75' : '#888',
                    border: `0.5px solid ${status === 'Open' ? 'rgba(91,141,238,0.3)' : status === 'Completed' ? 'rgba(29,158,117,0.3)' : 'rgba(255,255,255,0.1)'}`
                  }}>{status}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>{b.description}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#5b8dee' }}>${reward} USDC</span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{Number(b.submissionCount)} submission{Number(b.submissionCount) !== 1 ? 's' : ''}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}