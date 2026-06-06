'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import Dashboard from './components/Dashboard'
import BountyList from './components/BountyList'
import PostBounty from './components/PostBounty'
import Profile from './components/Profile'
import Settings from './components/Settings'
import About from './components/About'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [activePage, setActivePage] = useState('dashboard')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  const arcTags = ['USDC as native gas', 'Sub-second finality', 'EVM compatible', 'Built by Circle', 'Chain ID: 5042002']
  const circleTags = ['Creator of USDC', 'Regulated stablecoin', '1:1 USD backed', 'Global reach', 'Powering Arc']

  const navItems = [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'browse', label: '📋 Browse' },
    { id: 'post', label: '➕ Post' },
    { id: 'profile', label: '👤 Profile' },
    { id: 'settings', label: '⚙️ Settings' },
  ]

  return (
    <div className="app-layout">

      {!isConnected ? (
        /* Landing page */
        <div style={{ background: '#0d0a1a', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

          {/* Floating blobs */}
          <div style={{ position: 'fixed', top: '-60px', left: '5%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(124,58,237,0.15)', filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'fixed', top: '100px', right: '0%', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(168,85,247,0.1)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'fixed', bottom: '200px', left: '40%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(139,92,246,0.12)', filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0 }} />

          {/* Nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', borderBottom: '0.5px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 2, backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>BountyBoard</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>How it works</span>
              <a href="https://github.com/Castro336488/bounty-board" target="_blank" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>GitHub</a>
              <a href="https://testnet.arcscan.app/address/0x7675D2932D72b3F76d8f3e2d27ABF90dd0178683" target="_blank" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>Explorer</a>
              <button onClick={() => setTimeout(() => connect({ connector: injected() }), 0)}
                style={{ fontSize: '13px', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', border: 'none', borderRadius: '8px', padding: '8px 18px', color: '#fff', fontWeight: '500' }}>
                Launch app
              </button>
            </div>
          </div>

          {/* Hero */}
          <div style={{ padding: '90px 40px 80px', textAlign: 'center', borderBottom: '0.5px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-block', fontSize: '10px', color: 'rgba(168,85,247,0.9)', letterSpacing: '1.5px', marginBottom: '22px', background: 'rgba(124,58,237,0.1)', border: '0.5px solid rgba(124,58,237,0.3)', borderRadius: '20px', padding: '5px 16px' }}>
              BUILT ON ARC TESTNET · POWERED BY USDC
            </div>
            <h1 style={{ fontSize: '52px', fontWeight: '600', color: '#fff', lineHeight: '1.1', marginBottom: '22px', letterSpacing: '-1.5px' }}>
              One board.<br/>All bounties.
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.38)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: '1.9' }}>
              Post tasks, lock USDC in escrow, and pay contributors automatically on approval. No middleman. Just smart contracts.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <button onClick={() => setTimeout(() => connect({ connector: injected() }), 0)}
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', border: 'none', fontSize: '14px', fontWeight: '500', padding: '12px 28px', borderRadius: '8px' }}>
                Connect wallet
              </button>
              <a href="https://github.com/Castro336488/bounty-board" target="_blank"
                style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', padding: '12px 28px', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '8px' }}>
                Read docs
              </a>
            </div>
          </div>

          {/* 3 feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', borderBottom: '0.5px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 2 }}>
            {[
              { icon: '🔒', color: '124,58,237', title: 'Trustless escrow.', desc: 'USDC locked in smart contract. Released only when work is approved. No middleman, ever.' },
              { icon: '⚡', color: '168,85,247', title: 'Instant payouts.', desc: 'Sub-second finality on Arc. USDC reaches the solver\'s wallet the moment work is approved.' },
              { icon: '🌍', color: '139,92,246', title: 'Permissionless.', desc: 'Anyone with a wallet can post or solve bounties. No signup, no KYC, no permission needed.' },
            ].map((f, i, arr) => (
              <div key={f.title} style={{ padding: '36px 40px', borderRight: i < arr.length - 1 ? '0.5px solid rgba(255,255,255,0.07)' : 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `rgba(${f.color},0.15)`, border: `0.5px solid rgba(${f.color},0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '20px' }}>{f.icon}</div>
                <div style={{ fontSize: '16px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>{f.title}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: '1.7' }}>{f.desc}</div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div style={{ padding: '72px 40px', borderBottom: '0.5px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '1.5px', marginBottom: '18px' }}>HOW IT WORKS</div>
            <p style={{ fontSize: '32px', fontWeight: '500', color: '#fff', marginBottom: '48px', letterSpacing: '-0.5px' }}>Three steps.<br/>Zero trust required.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {[
                { n: '01', color: '124,58,237', title: 'Post a bounty', desc: 'Lock your USDC reward in smart contract escrow. Anyone can see it.' },
                { n: '02', color: '168,85,247', title: 'Solvers submit work', desc: 'Multiple solvers can compete and submit links to their work.' },
                { n: '03', color: '139,92,246', title: 'Approve & pay', desc: 'Pick the best submission. USDC releases instantly to the solver.' },
              ].map(s => (
                <div key={s.n} style={{ padding: '28px', border: `0.5px solid rgba(${s.color},0.2)`, borderRadius: '14px', background: `rgba(${s.color},0.05)` }}>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: `rgba(${s.color},0.6)`, marginBottom: '14px' }}>{s.n}</div>
                  <div style={{ fontSize: '15px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>{s.title}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', lineHeight: '1.7' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Arc section */}
          <div style={{ padding: '72px 40px', borderBottom: '0.5px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '11px', color: 'rgba(168,85,247,0.7)', letterSpacing: '1.5px', marginBottom: '18px' }}>POWERED BY ARC</div>
            <p style={{ fontSize: '32px', fontWeight: '500', color: '#fff', lineHeight: '1.25', marginBottom: '22px', letterSpacing: '-0.5px' }}>The chain where USDC<br/>is everything.</p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.38)', maxWidth: '560px', lineHeight: '1.9', marginBottom: '32px' }}>
              Arc is a Layer-1 blockchain built by Circle where USDC is the native gas token. Sub-second finality, EVM compatible, and designed specifically for stablecoin-native finance. No ETH needed. Ever.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {arcTags.map(t => (
                <span key={t} style={{ fontSize: '12px', color: 'rgba(168,85,247,0.8)', background: 'rgba(124,58,237,0.08)', border: '0.5px solid rgba(124,58,237,0.2)', borderRadius: '20px', padding: '6px 14px' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Circle section */}
          <div style={{ padding: '72px 40px', borderBottom: '0.5px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '11px', color: 'rgba(192,132,252,0.7)', letterSpacing: '1.5px', marginBottom: '18px' }}>BUILT WITH CIRCLE</div>
            <p style={{ fontSize: '32px', fontWeight: '500', color: '#fff', lineHeight: '1.25', marginBottom: '22px', letterSpacing: '-0.5px' }}>Money that moves<br/>freely. Globally.</p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.38)', maxWidth: '560px', lineHeight: '1.9', marginBottom: '32px' }}>
              Circle created USDC — the world's leading regulated dollar digital currency. Their mission is to make money move freely globally. BountyBoard puts that mission into action — paying contributors anywhere, instantly.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {circleTags.map(t => (
                <span key={t} style={{ fontSize: '12px', color: 'rgba(192,132,252,0.8)', background: 'rgba(139,92,246,0.08)', border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: '20px', padding: '6px 14px' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Get started */}
          <div style={{ padding: '72px 40px', borderBottom: '0.5px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '1.5px', marginBottom: '18px' }}>GET STARTED</div>
            <p style={{ fontSize: '32px', fontWeight: '500', color: '#fff', marginBottom: '48px', letterSpacing: '-0.5px' }}>Up and running<br/>in minutes.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              {[
                { n: '01', title: 'Add Arc Testnet', desc: 'Chain ID: 5042002 · RPC: rpc.testnet.arc.network' },
                { n: '02', title: 'Get test USDC', desc: 'Visit faucet.circle.com and paste your wallet address' },
                { n: '03', title: 'Connect wallet', desc: 'Click Connect Wallet and approve in MetaMask' },
                { n: '04', title: 'Post or solve', desc: 'Post a bounty with USDC or solve one and earn' },
              ].map(s => (
                <div key={s.n} style={{ padding: '24px', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: '20px', fontWeight: '600', color: 'rgba(168,85,247,0.4)', marginBottom: '12px' }}>{s.n}</div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', lineHeight: '1.7' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ padding: '80px 40px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <p style={{ fontSize: '32px', fontWeight: '500', color: '#fff', lineHeight: '1.25', marginBottom: '14px', letterSpacing: '-0.5px' }}>Start building on the<br/>trustless bounty layer.</p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.3)', marginBottom: '32px' }}>Connect your wallet and post your first bounty in minutes.</p>
            <button onClick={() => setTimeout(() => connect({ connector: injected() }), 0)}
              style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', border: 'none', fontSize: '14px', fontWeight: '500', padding: '12px 30px', borderRadius: '8px' }}>
              Connect wallet →
            </button>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', borderTop: '0.5px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 2, flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)' }}>© 2025 BountyBoard · Arc Testnet · Powered by USDC</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[
                { label: 'App', href: 'https://arcbountyboard.xyz' },
                { label: 'GitHub', href: 'https://github.com/Castro336488/bounty-board' },
                { label: 'Explorer', href: 'https://testnet.arcscan.app' },
                { label: 'X', href: 'https://x.com/BountyBoardArc' },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{l.label}</a>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* App — connected state */
        <div>
          {/* Top nav */}
          <div className="top-nav">
            <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>BountyBoard</div>
            <div className="nav-tabs">
              {navItems.map(item => (
                <div key={item.id} className={`nav-tab ${activePage === item.id ? 'active' : ''}`} onClick={() => setActivePage(item.id)}>
                  {item.label}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '12px', color: '#c084fc', background: 'rgba(124,58,237,0.1)', border: '0.5px solid rgba(124,58,237,0.25)', borderRadius: '20px', padding: '5px 12px', fontFamily: 'monospace' }}>
                {address?.slice(0,6)}...{address?.slice(-4)}
              </div>
              <button onClick={() => setTimeout(() => disconnect(), 0)}
                style={{ fontSize: '11px', padding: '5px 12px', color: 'rgba(255,255,255,0.35)', background: 'transparent', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '6px' }}>
                Disconnect
              </button>
            </div>
          </div>

          {/* Mobile bottom nav */}
          <div className="mobile-bottom-nav">
            {navItems.map(item => (
              <div key={item.id} onClick={() => setActivePage(item.id)}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', padding: '4px 0' }}>
                <span style={{ fontSize: '20px' }}>{item.label.split(' ')[0]}</span>
                <span style={{ fontSize: '9px', color: activePage === item.id ? '#c084fc' : 'rgba(255,255,255,0.3)', fontWeight: activePage === item.id ? '600' : '400' }}>
                  {item.label.split(' ')[1]}
                </span>
              </div>
            ))}
          </div>

          {/* Page content */}
          <div className="page-content">
            {activePage === 'dashboard' && <Dashboard setActivePage={setActivePage} />}
            {activePage === 'browse' && <BountyList />}
            {activePage === 'post' && <PostBounty onSuccess={() => setActivePage('browse')} />}
            {activePage === 'profile' && <Profile />}
            {activePage === 'settings' && <Settings />}
            {activePage === 'about' && <About />}
          </div>

          {/* Coming soon bar */}
          <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 3rem 2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(168,85,247,0.1)', borderRadius: '10px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>COMING SOON</span>
              {['🤖 AI Agents', '🔔 Notifications', '📊 Analytics', '🏆 Leaderboard'].map(item => (
                <span key={item} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>{item}</span>
              ))}
              <span style={{ marginLeft: 'auto', fontSize: '9px', background: 'rgba(124,58,237,0.1)', color: '#c084fc', border: '0.5px solid rgba(124,58,237,0.2)', borderRadius: '4px', padding: '2px 8px' }}>SOON</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}