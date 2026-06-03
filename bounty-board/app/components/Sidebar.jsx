'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export default function Sidebar({ activePage, setActivePage }) {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'browse', label: 'Browse Bounties', icon: '📋' },
    { id: 'post', label: 'Post Bounty', icon: '➕' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  const comingSoon = [
    { label: 'AI Agents', icon: '🤖' },
    { label: 'Notifications', icon: '🔔' },
    { label: 'Analytics', icon: '📊' },
    { label: 'Leaderboard', icon: '🏆' },
  ]

  return (
    <div style={{
      width: '220px', minWidth: '220px', height: '100vh',
      background: 'linear-gradient(160deg, #071020 0%, #0a1628 60%, #0d1f3c 100%)',
      borderRight: '0.5px solid rgba(255,255,255,0.07)',
      display: 'flex', flexDirection: 'column', position: 'fixed', left: 0, top: 0, zIndex: 20,
      overflow: 'hidden'
    }}>

      {/* Arc logo watermark */}
      <svg style={{ position: 'absolute', bottom: '40px', right: '-30px', width: '140px', height: '140px', opacity: 0.05, pointerEvents: 'none' }} viewBox="0 0 100 100">
        <path d="M50 5 C25 5, 8 25, 8 50 L8 75 L22 75 L22 50 C22 33, 35 19, 50 19 C65 19, 78 33, 78 50 L78 75 L92 75 L92 50 C92 25, 75 5, 50 5 Z" fill="white"/>
        <path d="M30 75 L30 60 L70 60 L70 75 Z" fill="white"/>
      </svg>

      {/* Logo */}
      <div style={{ padding: '1.25rem 1rem', borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize: '17px', fontWeight: '600', color: '#fff', letterSpacing: '-0.3px' }}>
          Bounty<span style={{ color: '#5b8dee' }}>Board</span>
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>Arc Testnet</div>
      </div>

      {/* Nav items */}
      <div style={{ padding: '0.75rem 0.5rem', flex: 1 }}>
        {navItems.map(item => (
          <div key={item.id}
            onClick={() => isConnected && setActivePage(item.id)}
            style={{
              padding: '8px 12px', margin: '2px 0', borderRadius: '7px', cursor: isConnected ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', gap: '10px',
              background: activePage === item.id ? 'rgba(91,141,238,0.15)' : 'transparent',
              border: activePage === item.id ? '0.5px solid rgba(91,141,238,0.3)' : '0.5px solid transparent',
              transition: 'all 0.15s',
              opacity: isConnected ? 1 : 0.4
            }}>
            <span style={{ fontSize: '15px' }}>{item.icon}</span>
            <span style={{ fontSize: '13px', color: activePage === item.id ? '#fff' : 'rgba(255,255,255,0.45)', fontWeight: activePage === item.id ? '500' : '400' }}>
              {item.label}
            </span>
          </div>
        ))}

        {/* Coming soon */}
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', padding: '0 12px', marginBottom: '6px', letterSpacing: '1px' }}>COMING SOON</div>
          {comingSoon.map(item => (
            <div key={item.label} style={{ padding: '8px 12px', margin: '2px 0', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '15px', opacity: 0.3 }}>{item.icon}</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)' }}>{item.label}</span>
              </div>
              <span style={{ fontSize: '9px', background: 'rgba(91,141,238,0.1)', color: '#5b8dee', border: '0.5px solid rgba(91,141,238,0.2)', borderRadius: '4px', padding: '2px 6px', fontWeight: '500' }}>SOON</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet */}
      <div style={{ padding: '1rem', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
        {!isConnected ? (
          <button onClick={() => setTimeout(() => connect({ connector: injected() }), 0)}
            style={{ width: '100%', background: 'linear-gradient(135deg, #1a3a7c, #2d5dc0)', border: '0.5px solid rgba(91,141,238,0.3)', color: '#fff', fontWeight: '600', borderRadius: '8px', padding: '9px' }}>
            Connect Wallet
          </button>
        ) : (
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>Connected</div>
            <div style={{ fontSize: '12px', color: '#5b8dee', fontFamily: 'monospace', marginBottom: '8px' }}>
              {address?.slice(0,6)}...{address?.slice(-4)}
            </div>
            <button onClick={() => setTimeout(() => disconnect(), 0)}
              style={{ width: '100%', fontSize: '12px', padding: '6px', color: 'rgba(255,255,255,0.4)', background: 'transparent', border: '0.5px solid rgba(255,255,255,0.1)' }}>
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  )
}