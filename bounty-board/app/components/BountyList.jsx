'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI, STATUS, CATEGORIES } from '../contract'

const TRUSTED_DOMAINS = [
  'github.com', 'gitlab.com', 'bitbucket.org',
  'docs.google.com', 'drive.google.com',
  'notion.so', 'notion.site',
  'medium.com', 'mirror.xyz',
  'ipfs.io', 'ipfs.infura.io', 'nftstorage.link',
  'figma.com', 'canva.com',
  'youtube.com', 'youtu.be',
  'loom.com', 'vimeo.com',
  'replit.com', 'codesandbox.io',
  'vercel.app', 'netlify.app',
  'arcscan.app', 'explorer.arc.io',
]

const SUSPICIOUS_DOMAINS = [
  'bit.ly', 'tinyurl.com', 't.co', 'ow.ly',
  'goo.gl', 'short.io', 'rebrand.ly',
  'discord.gg', 'discord.com/invite',
  'telegram.me', 't.me',
  'localhost', '127.0.0.1',
]

function validateUrl(url) {
  if (!url || !url.trim()) {
    return { valid: false, error: 'Submission URL cannot be empty' }
  }
  if (!url.startsWith('https://')) {
    return { valid: false, error: 'URL must start with https://' }
  }
  try {
    const parsed = new URL(url)
    const domain = parsed.hostname.toLowerCase()
    const isSuspicious = SUSPICIOUS_DOMAINS.some(d => domain.includes(d))
    if (isSuspicious) {
      return { valid: false, error: 'Shortened or messaging links are not allowed. Please submit a direct link to your work.' }
    }
    if (parsed.pathname === '/' || parsed.pathname === '') {
      return { valid: false, error: 'Please submit a direct link to your work, not just a website homepage.' }
    }
    const isTrusted = TRUSTED_DOMAINS.some(d => domain.includes(d))
    if (!isTrusted) {
      return { valid: true, warning: 'This domain is not on our trusted list. Make sure the link points directly to your work.' }
    }
    return { valid: true }
  } catch {
    return { valid: false, error: 'Please enter a valid URL' }
  }
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
          <div key={i} style={{ background: s.approved ? 'rgba(29,158,117,0.08)' : 'rgba(255,255,255,0.03)', border: `0.5px solid ${s.approved ? 'rgba(29,158,117,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', marginBottom: '3px' }}>
                {s.solver.slice(0,8)}...{s.solver.slice(-6)}
              </div>
              <a href={s.submissionUrl} target="_blank" style={{ fontSize: '13px', color: '#c084fc', wordBreak: 'break-all' }}>
                {s.submissionUrl}
              </a>
            </div>
            {s.approved ? (
              <span style={{ fontSize: '11px', background: 'rgba(29,158,117,0.15)', color: '#1D9E75', borderRadius: '20px', padding: '3px 10px', fontWeight: '600', whiteSpace: 'nowrap' }}>✓ Approved</span>
            ) : isMyBounty && bountyStatus === 'Open' ? (
              <button onClick={() => writeContract({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: 'approveWork',
                args: [BigInt(bountyId), BigInt(i + 1)],
              }, { onSuccess: () => refetch() })}
                disabled={isLoading}
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 14px', fontWeight: '600', fontSize: '12px', whiteSpace: 'nowrap' }}>
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
  const [urlErrors, setUrlErrors] = useState({})
  const [urlWarnings, setUrlWarnings] = useState({})
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

  function handleUrlChange(id, value) {
    setSubmitUrls(p => ({ ...p, [id]: value }))
    setUrlErrors(p => ({ ...p, [id]: null }))
    setUrlWarnings(p => ({ ...p, [id]: null }))
    if (value.length > 10) {
      const result = validateUrl(value)
      if (!result.valid) {
        setUrlErrors(p => ({ ...p, [id]: result.error }))
      } else if (result.warning) {
        setUrlWarnings(p => ({ ...p, [id]: result.warning }))
      }
    }
  }

  function submitWork(id) {
    const url = submitUrls[id]
    const result = validateUrl(url)
    if (!result.valid) {
      setUrlErrors(p => ({ ...p, [id]: result.error }))
      return
    }
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'submitWork',
      args: [BigInt(id), url],
    }, { onSuccess: () => {
      refetch()
      setSubmitUrls(p => ({ ...p, [id]: '' }))
      setUrlErrors(p => ({ ...p, [id]: null }))
      setUrlWarnings(p => ({ ...p, [id]: null }))
    }})
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
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Find tasks and earn USDC on Arc Mainnet</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['All', ...CATEGORIES].map(c => (
          <button key={c} onClick={() => setFilterCategory(c)}
            style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '20px', fontWeight: '500',
              background: filterCategory === c ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.04)',
              border: filterCategory === c ? '0.5px solid rgba(168,85,247,0.4)' : '0.5px solid rgba(255,255,255,0.07)',
              color: filterCategory === c ? '#c084fc' : 'rgba(255,255,255,0.4)'
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
            const urlError = urlErrors[b.id]
            const urlWarning = urlWarnings[b.id]

            return (
              <div key={b.id.toString()} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>{b.title}</span>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: '500', flexShrink: 0, marginLeft: '10px',
                    background: status === 'Open' ? 'rgba(168,85,247,0.15)' : status === 'Completed' ? 'rgba(29,158,117,0.15)' : status === 'Expired' ? 'rgba(216,90,48,0.15)' : 'rgba(255,255,255,0.05)',
                    color: status === 'Open' ? '#c084fc' : status === 'Completed' ? '#1D9E75' : status === 'Expired' ? '#d85a30' : '#888',
                    border: `0.5px solid ${status === 'Open' ? 'rgba(168,85,247,0.3)' : status === 'Completed' ? 'rgba(29,158,117,0.3)' : status === 'Expired' ? 'rgba(216,90,48,0.3)' : 'rgba(255,255,255,0.1)'}`
                  }}>{status}</span>
                </div>

                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>{b.description}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#c084fc', background: 'rgba(168,85,247,0.1)', border: '0.5px solid rgba(168,85,247,0.2)', borderRadius: '20px', padding: '2px 10px' }}>${reward} USDC</span>
                  <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', borderRadius: '20px', padding: '2px 10px' }}>{CATEGORIES[b.category]}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>by {isMyBounty ? 'you' : b.poster.slice(0,8)+'...'+b.poster.slice(-6)}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{Number(b.submissionCount)} submission{Number(b.submissionCount) !== 1 ? 's' : ''}</span>
                  <button onClick={() => setExpanded(p => ({ ...p, [b.id.toString()]: !p[b.id.toString()] }))}
                    style={{ fontSize: '11px', padding: '2px 10px', borderRadius: '20px', border: '0.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)' }}>
                    {isExpanded ? 'Hide' : 'View submissions'}
                  </button>
                </div>

                {isExpanded && <BountySubmissions bountyId={b.id.toString()} isMyBounty={isMyBounty} bountyStatus={status} />}

                {status === 'Open' && !isMyBounty && !isExpiredDeadline && (
                  <div style={{ marginTop: '10px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        placeholder="https://github.com/your-repo or Google Doc link..."
                        value={submitUrls[b.id] || ''}
                        onChange={e => handleUrlChange(b.id, e.target.value)}
                        style={{ border: urlError ? '1px solid rgba(239,68,68,0.5)' : urlWarning ? '1px solid rgba(245,158,11,0.5)' : undefined }}
                      />
                      <button onClick={() => submitWork(b.id)} disabled={isLoading || !!urlError}
                        style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', border: 'none', fontWeight: '600', whiteSpace: 'nowrap', opacity: urlError ? 0.5 : 1 }}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                    {urlError && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '12px', color: 'rgba(239,68,68,0.9)' }}>
                        <span>❌</span> {urlError}
                      </div>
                    )}
                    {urlWarning && !urlError && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '12px', color: 'rgba(245,158,11,0.9)' }}>
                        <span>⚠️</span> {urlWarning}
                      </div>
                    )}
                    {!urlError && !urlWarning && (
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '6px' }}>
                        Accepted: GitHub, Google Docs, Notion, IPFS, Figma, Medium and more
                      </div>
                    )}
                  </div>
                )}

                {status === 'Open' && isMyBounty && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button onClick={() => cancelBounty(b.id)}
                      style={{ color: '#d85a30', background: 'rgba(216,90,48,0.08)', border: '0.5px solid rgba(216,90,48,0.2)', borderRadius: '8px', padding: '7px 16px', fontWeight: '600', fontSize: '13px' }}>
                      Cancel & refund
                    </button>
                    {isExpiredDeadline && (
                      <button onClick={() => expireBounty(b.id)}
                        style={{ color: '#ef9f27', background: 'rgba(239,159,39,0.08)', border: '0.5px solid rgba(239,159,39,0.2)', borderRadius: '8px', padding: '7px 16px', fontWeight: '600', fontSize: '13px' }}>
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