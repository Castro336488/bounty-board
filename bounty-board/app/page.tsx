'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi'
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
  const [activePage, setActivePage] = useState('dashboard')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #071020 0%, #0a1628 40%, #0d1f3c 100%)' }}>

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

      {/* Main content */}
      <div style={{ marginLeft: '220px', flex: 1, minHeight: '100vh', position: 'relative', zIndex: 1 }}>

        {!isConnected ? (
          /* Landing page */
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
            <svg style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem', opacity: 0.8 }} viewBox="0 0 100 100">
              <path d="M50 5 C25 5, 8 25, 8 50 L8 75 L22 75 L22 50 C22 33, 35 19, 50 19 C65 19, 78 33, 78 50 L78 75 L92 75 L92 50 C92 25, 75 5, 50 5 Z" fill="white"/>
              <path d="M30 75 L30 60 L70 60 L70 75 Z" fill="white"/>
            </svg>
            <div style={{ display: 'inline-block', background: 'rgba(91,141,238,0.15)', color: '#5b8dee', fontSize: '12px', fontWeight: '600', borderRadius: '20px', padding: '4px 14px', marginBottom: '1.5rem', border: '0.5px solid rgba(91,141,238,0.3)', letterSpacing: '0.5px' }}>
              LIVE ON ARC TESTNET
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: '700', lineHeight: '1.15', marginBottom: '1.25rem', letterSpacing: '-1px' }}>
              Post tasks.<br />
              <span style={{ color: '#5b8dee' }}>Earn USDC.</span><br />
              Build on Arc.
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
              A trustless bounty board where USDC is locked in escrow and released automatically when work is approved.
            </p>
            <button onClick={() => setTimeout(() => connect({ connector: injected() }), 0)}
              style={{ background: 'linear-gradient(135deg, #1a3a7c, #2d5dc0)', color: '#fff', border: '0.5px solid rgba(91,141,238,0.4)', padding: '13px 36px', borderRadius: '10px', fontWeight: '600', fontSize: '15px', marginBottom: '1rem' }}>
              Connect Wallet to Start →
            </button>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', marginTop: '1rem' }}>No signup · MetaMask · Powered by USDC</p>
            {/* About section for non-connected users */}
<div style={{ marginTop: '4rem', textAlign: 'left' }}>
  <div style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', marginBottom: '1.5rem', textAlign: 'center' }}>ABOUT</div>

  <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.25rem', marginBottom: '12px' }}>
    <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>🏆 What is BountyBoard?</div>
    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.7' }}>A trustless on-chain bounty board where USDC rewards are locked in smart contract escrow and released automatically when work is approved. No middleman. No fees. Just code.</p>
  </div>

  <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.25rem', marginBottom: '12px' }}>
    <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>
      <svg style={{ width: '16px', height: '16px', display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} viewBox="0 0 100 100">
        <path d="M50 5 C25 5, 8 25, 8 50 L8 75 L22 75 L22 50 C22 33, 35 19, 50 19 C65 19, 78 33, 78 50 L78 75 L92 75 L92 50 C92 25, 75 5, 50 5 Z" fill="white"/>
        <path d="M30 75 L30 60 L70 60 L70 75 Z" fill="white"/>
      </svg>
      What is Arc?
    </div>
    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.7' }}>Arc is a Layer-1 blockchain built by Circle that uses USDC as the native gas token. Sub-second finality, EVM compatible, and designed for stablecoin-native finance.</p>
  </div>

  <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.25rem', marginBottom: '12px' }}>
    <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>💚 What is Circle?</div>
    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.7' }}>Circle is the company behind USDC — the world's leading regulated dollar digital currency. Their mission is to make money move freely globally. Arc is their stablecoin-native blockchain.</p>
  </div>

  <div style={{ background: 'linear-gradient(135deg, rgba(26,58,124,0.3), rgba(45,93,192,0.2))', border: '0.5px solid rgba(91,141,238,0.2)', borderRadius: '12px', padding: '1.25rem' }}>
    <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '1rem' }}>📖 How to get started</div>
    {[
      { step: '01', title: 'Add Arc Testnet', desc: 'Chain ID: 5042002 · RPC: https://rpc.testnet.arc.network' },
      { step: '02', title: 'Get test USDC', desc: 'Visit faucet.circle.com and paste your wallet address' },
      { step: '03', title: 'Connect wallet', desc: 'Click Connect Wallet above and approve in MetaMask' },
      { step: '04', title: 'Post or solve', desc: 'Post a bounty with USDC or solve one and earn' },
    ].map((s, i) => (
      <div key={s.step} style={{ display: 'flex', gap: '12px', marginBottom: i < 3 ? '12px' : 0 }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#5b8dee', minWidth: '24px' }}>{s.step}</div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>{s.title}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{s.desc}</div>
        </div>
      </div>
    ))}
  </div>
</div>

            {/* How it works */}
            <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', textAlign: 'left' }}>
              {[
                { step: '01', title: 'Post a bounty', desc: 'Lock USDC in escrow' },
                { step: '02', title: 'Submit work', desc: 'Solvers compete for it' },
                { step: '03', title: 'Approve & pay', desc: 'USDC releases instantly' },
              ].map(s => (
                <div key={s.step} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ fontSize: '11px', color: '#5b8dee', fontWeight: '600', marginBottom: '6px' }}>{s.step}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* App pages */
          <div style={{ padding: '2rem 2.5rem', maxWidth: '900px' }}>
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