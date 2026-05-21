'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import BountyList from './components/BountyList'
import PostBounty from './components/PostBounty'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <div>
      <header style={{ background: '#fff', borderBottom: '2px solid #ef9f27', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>BOUNTY<span style={{ color: '#ef9f27' }}>BOARD</span></span>
          <span style={{ fontSize: '11px', background: '#fff9f0', color: '#ba7517', border: '1px solid #ef9f27', borderRadius: '20px', padding: '3px 10px', fontWeight: '600' }}>Arc Testnet</span>
        </div>
        {!isConnected ? (
          <button onClick={() => setTimeout(() => connect({ connector: injected() }), 0)} style={{ background: '#ef9f27', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '8px', fontWeight: '700', fontSize: '14px' }}>
            Connect Wallet
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', background: '#fff9f0', border: '1px solid #ef9f27', borderRadius: '20px', padding: '5px 14px', color: '#ba7517', fontFamily: 'monospace', fontWeight: '600' }}>
              {address?.slice(0,6)}...{address?.slice(-4)}
            </span>
            <button onClick={() => setTimeout(() => disconnect(), 0)} style={{ fontSize: '13px', padding: '5px 12px', color: '#888', border: '1px solid #eee', borderRadius: '8px' }}>Disconnect</button>
          </div>
        )}
      </header>

      {!isConnected ? (
        <div>
          <div style={{ background: 'linear-gradient(135deg, #fff9f0 0%, #fff3dc 100%)', borderBottom: '2px solid #ef9f27', padding: '5rem 2rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: '#ef9f27', color: '#fff', fontSize: '12px', fontWeight: '700', borderRadius: '20px', padding: '4px 14px', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>
              LIVE ON ARC TESTNET
            </div>
            <h1 style={{ fontSize: '52px', fontWeight: '900', lineHeight: '1.1', marginBottom: '1.25rem', letterSpacing: '-1px' }}>
              Post tasks.<br />
              <span style={{ color: '#ef9f27' }}>Earn USDC.</span><br />
              Build on Arc.
            </h1>
            <p style={{ fontSize: '18px', color: '#666', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
              A trustless bounty board where USDC is locked in escrow and released automatically when work is approved.
            </p>
            <button onClick={() => setTimeout(() => connect({ connector: injected() }), 0)} style={{ background: '#ef9f27', color: '#fff', border: 'none', padding: '14px 36px', borderRadius: '10px', fontWeight: '800', fontSize: '16px', marginBottom: '1rem' }}>
              Launch App →
            </button>
            <p style={{ fontSize: '13px', color: '#aaa', marginTop: '1rem' }}>No signup · Connect MetaMask · Powered by USDC</p>
          </div>

          <div style={{ padding: '4rem 2rem', maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#ba7517', letterSpacing: '1px' }}>HOW IT WORKS</span>
              <h2 style={{ fontSize: '32px', fontWeight: '800', marginTop: '8px' }}>Three simple steps</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { step: '01', title: 'Post a bounty', desc: 'Describe the task and lock your USDC reward into the smart contract escrow.', icon: '📋' },
                { step: '02', title: 'Solver submits work', desc: 'Anyone can pick up the bounty and submit a link to their completed work.', icon: '⚡' },
                { step: '03', title: 'Approve & pay', desc: 'Review the work and approve it. USDC is released instantly to the solver.', icon: '✅' },
              ].map(s => (
                <div key={s.step} style={{ background: '#fff', border: '2px solid #f0e8d8', borderRadius: '14px', padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#f5e4c0', position: 'absolute', top: '10px', right: '16px', lineHeight: 1 }}>{s.step}</div>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{s.icon}</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{s.title}</div>
                  <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff9f0', borderTop: '2px solid #f0e8d8', borderBottom: '2px solid #f0e8d8', padding: '4rem 2rem' }}>
            <div style={{ maxWidth: '860px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#ba7517', letterSpacing: '1px' }}>FEATURES</span>
                <h2 style={{ fontSize: '32px', fontWeight: '800', marginTop: '8px' }}>Why BountyBoard?</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                {[
                  { icon: '🔒', title: 'Trustless escrow', desc: 'USDC locked in smart contract. No middleman.' },
                  { icon: '⚡', title: 'Instant payouts', desc: 'Sub-second finality on Arc Testnet.' },
                  { icon: '💵', title: 'USDC native', desc: 'Stable payments, no price volatility.' },
                  { icon: '🌍', title: 'Permissionless', desc: 'Anyone can post or solve bounties.' },
                ].map(f => (
                  <div key={f.title} style={{ background: '#fff', border: '1px solid #f0e8d8', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{f.icon}</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>{f.title}</div>
                    <div style={{ fontSize: '13px', color: '#888' }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: '4rem 2rem', maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#ba7517', letterSpacing: '1px' }}>FAQ</span>
              <h2 style={{ fontSize: '32px', fontWeight: '800', marginTop: '8px' }}>Common questions</h2>
            </div>
            {[
              { q: 'What is BountyBoard?', a: 'BountyBoard is a trustless on-chain platform where anyone can post tasks with USDC rewards. Solvers complete the work and get paid automatically via smart contract.' },
              { q: 'What wallet do I need?', a: 'Any EVM wallet works — MetaMask is recommended. Make sure to add Arc Testnet (Chain ID 5042002) and get test USDC from faucet.circle.com.' },
              { q: 'Is my USDC safe?', a: 'Yes. USDC is locked in the smart contract and can only be released to the approved solver or refunded to the poster if cancelled.' },
              { q: 'What is Arc Testnet?', a: "Arc is Circle's Layer-1 blockchain built for stablecoin-native finance. It uses USDC as the native gas token with sub-second finality." },
            ].map(f => (
              <div key={f.q} style={{ borderBottom: '1px solid #f0e8d8', padding: '1.25rem 0' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px' }}>{f.q}</div>
                <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{f.a}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#1a1a1a', color: '#fff', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>BOUNTY<span style={{ color: '#ef9f27' }}>BOARD</span></div>
            <div style={{ fontSize: '13px', color: '#666' }}>Built on Arc Testnet · Powered by USDC</div>
          </div>
        </div>
      ) : (
        <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <PostBounty />
          <BountyList />
        </main>
      )}
    </div>
  )
}