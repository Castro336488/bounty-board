'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import BountyList from './components/BountyList'
import PostBounty from './components/PostBounty'
import Profile from './components/Profile'
import Settings from './components/Settings'
import About from './components/About'

export default function Home() {
  const { isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [activePage, setActivePage] = useState('dashboard')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <div className="app-layout" style={{ background: 'linear-gradient(135deg, #071020 0%, #0a1628 40%, #0d1f3c 100%)' }}>

      {/* Floating Arc logo watermarks */}
      <svg style={{ position: 'fixed', top: '-50px', right: '5%', width: '350px', height: '350px', opacity: 0.025, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 100 100">
        <path d="M50 5 C25 5, 8 25, 8 50 L8 75 L22 75 L22 50 C22 33, 35 19, 50 19 C65 19, 78 33, 78 50 L78 75 L92 75 L92 50 C92 25, 75 5, 50 5 Z" fill="white"/>
        <path d="M30 75 L30 60 L70 60 L70 75 Z" fill="white"/>
      </svg>
      <svg style={{ position: 'fixed', bottom: '-60px', right: '30%', width: '250px', height: '250px', opacity: 0.02, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 100 100">
        <path d="M50 5 C25 5, 8 25, 8 50 L8 75 L22 75 L22 50 C22 33, 35 19, 50 19 C65 19, 78 33, 78 50 L78 75 L92 75 L92 50 C92 25, 75 5, 50 5 Z" fill="white"/>
        <path d="M30 75 L30 60 L70 60 L70 75 Z" fill="white"/>
      </svg>

      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="main-content">

        {/* Mobile Header */}
        <div className="mobile-header">
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>
            Bounty<span style={{ color: '#5b8dee' }}>Board</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '10px', background: 'rgba(91,141,238,0.15)', color: '#5b8dee', border: '0.5px solid rgba(91,141,238,0.3)', borderRadius: '20px', padding: '3px 10px' }}>Arc Testnet</div>
            {isConnected && (
              <button onClick={() => setTimeout(() => disconnect(), 0)}
                style={{ fontSize: '11px', padding: '4px 10px', color: 'rgba(255,255,255,0.4)', background: 'transparent', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px' }}>
                Disconnect
              </button>
            )}
          </div>
        </div>

        {!isConnected ? (
          <div style={{ minHeight: '100vh', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px', margin: '0 auto' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>Bounty<span style={{ color: '#5b8dee' }}>Board</span></div>
              <div style={{ fontSize: '10px', background: 'rgba(91,141,238,0.15)', color: '#5b8dee', border: '0.5px solid rgba(91,141,238,0.3)', borderRadius: '20px', padding: '3px 10px' }}>Arc Testnet</div>
            </div>

            {/* Hero card */}
            <div style={{ background: 'linear-gradient(135deg, rgba(26,58,124,0.5), rgba(45,93,192,0.3))', border: '0.5px solid rgba(91,141,238,0.3)', borderRadius: '16px', padding: '1.75rem' }}>
              <svg style={{ width: '40px', height: '40px', marginBottom: '1rem', opacity: 0.8 }} viewBox="0 0 100 100">
                <path d="M50 5 C25 5, 8 25, 8 50 L8 75 L22 75 L22 50 C22 33, 35 19, 50 19 C65 19, 78 33, 78 50 L78 75 L92 75 L92 50 C92 25, 75 5, 50 5 Z" fill="white"/>
                <path d="M30 75 L30 60 L70 60 L70 75 Z" fill="white"/>
              </svg>
              <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#fff', lineHeight: '1.2', marginBottom: '8px' }}>
                Post tasks.<br/><span style={{ color: '#5b8dee' }}>Earn USDC.</span>
              </h1>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                Trustless bounty board on Arc Testnet. USDC locked in escrow, released automatically when work is approved.
              </p>
              <button onClick={() => setTimeout(() => connect({ connector: injected() }), 0)}
                style={{ width: '100%', background: 'linear-gradient(135deg, #1a3a7c, #2d5dc0)', color: '#fff', border: '0.5px solid rgba(91,141,238,0.4)', padding: '13px', borderRadius: '10px', fontWeight: '600', fontSize: '15px' }}>
                Connect Wallet →
              </button>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '8px', textAlign: 'center' }}>No signup · MetaMask · Powered by USDC</p>
            </div>

            {/* How it works */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>How it works</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { step: '01', title: 'Post a bounty', desc: 'Lock USDC reward in smart contract escrow' },
                  { step: '02', title: 'Solvers submit work', desc: 'Anyone can compete and submit their work' },
                  { step: '03', title: 'Approve & pay', desc: 'USDC releases instantly to the best solver' },
                ].map((s, i) => (
                  <div key={s.step} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingBottom: i < 2 ? '10px' : 0, borderBottom: i < 2 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#5b8dee', minWidth: '24px', marginTop: '1px' }}>{s.step}</div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>{s.title}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { icon: '🔒', title: 'Trustless escrow', desc: 'No middleman' },
                { icon: '⚡', title: 'Instant payouts', desc: 'Sub-second finality' },
                { icon: '💵', title: 'USDC native', desc: 'Stable payments' },
                { icon: '🌍', title: 'Permissionless', desc: 'Anyone can use it' },
              ].map(f => (
                <div key={f.title} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ fontSize: '22px', marginBottom: '6px' }}>{f.icon}</div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>{f.title}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{f.desc}</div>
                </div>
              ))}
            </div>

            {/* About Arc */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <svg style={{ width: '28px', height: '28px', opacity: 0.8 }} viewBox="0 0 100 100">
                  <path d="M50 5 C25 5, 8 25, 8 50 L8 75 L22 75 L22 50 C22 33, 35 19, 50 19 C65 19, 78 33, 78 50 L78 75 L92 75 L92 50 C92 25, 75 5, 50 5 Z" fill="white"/>
                  <path d="M30 75 L30 60 L70 60 L70 75 Z" fill="white"/>
                </svg>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Built on Arc Network</div>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6', marginBottom: '10px' }}>Arc is a Layer-1 blockchain built by Circle that uses USDC as the native gas token with sub-second finality.</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['USDC as gas', 'Sub-second finality', 'EVM compatible', 'Built by Circle'].map(tag => (
                  <span key={tag} style={{ fontSize: '10px', background: 'rgba(91,141,238,0.1)', color: '#5b8dee', border: '0.5px solid rgba(91,141,238,0.2)', borderRadius: '20px', padding: '3px 10px' }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Get started */}
            <div style={{ background: 'linear-gradient(135deg, rgba(26,58,124,0.2), rgba(45,93,192,0.1))', border: '0.5px solid rgba(91,141,238,0.15)', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>📖 Get started in 4 steps</div>
              {[
                { step: '01', title: 'Add Arc Testnet', desc: 'Chain ID: 5042002' },
                { step: '02', title: 'Get test USDC', desc: 'faucet.circle.com' },
                { step: '03', title: 'Connect wallet', desc: 'Click Connect Wallet above' },
                { step: '04', title: 'Post or solve', desc: 'Start earning USDC' },
              ].map((s, i) => (
                <div key={s.step} style={{ display: 'flex', gap: '10px', marginBottom: i < 3 ? '10px' : 0 }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#5b8dee', minWidth: '22px' }}>{s.step}</div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#fff', marginBottom: '1px' }}>{s.title}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', padding: '1rem 0', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>Built on Arc Testnet · Powered by USDC · <a href="https://github.com/Castro336488/bounty-board" target="_blank" style={{ color: '#5b8dee' }}>GitHub</a></div>
            </div>

          </div>
        ) : (
          <div className="page-content" style={{ padding: '2rem 2.5rem', maxWidth: '900px' }}>
            {activePage === 'dashboard' && <Dashboard setActivePage={setActivePage} />}
            {activePage === 'browse' && <BountyList />}
            {activePage === 'post' && <PostBounty onSuccess={() => setActivePage('browse')} />}
            {activePage === 'profile' && <Profile />}
            {activePage === 'settings' && <Settings />}
            {activePage === 'about' && <About />}
          </div>
        )}
      </div>
    </div>
  )
}