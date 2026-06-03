'use client'

import { useAccount } from 'wagmi'

export default function Settings() {
  const { address } = useAccount()

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Settings</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Manage your BountyBoard preferences</p>
      </div>

      {/* Network info */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '10px' }}>NETWORK</h2>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
          {[
            { label: 'Network', value: 'Arc Testnet' },
            { label: 'Chain ID', value: '5042002' },
            { label: 'RPC URL', value: 'https://rpc.testnet.arc.network' },
            { label: 'Explorer', value: 'testnet.arcscan.app' },
            { label: 'Faucet', value: 'faucet.circle.com' },
          ].map((item, i) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: i < 4 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{item.label}</span>
              <span style={{ fontSize: '13px', color: '#fff', fontFamily: 'monospace' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contract info */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '10px' }}>CONTRACT</h2>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
          {[
            { label: 'BountyBoard V3', value: '0x7675D2...78683' },s
            { label: 'USDC', value: '0x360000...000000' },
            { label: 'Version', value: 'V2 — Multi-submission' },
          ].map((item, i) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: i < 2 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{item.label}</span>
              <span style={{ fontSize: '13px', color: '#5b8dee', fontFamily: 'monospace' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Coming soon features */}
      <div>
        <h2 style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '10px' }}>COMING SOON</h2>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
          {[
            { label: '🤖 AI Agents', desc: 'Autonomous agents that post and solve bounties' },
            { label: '🔔 Notifications', desc: 'Get notified when work is submitted or approved' },
            { label: '📊 Analytics', desc: 'Deep insights into bounty activity and trends' },
            { label: '🏆 Leaderboard', desc: 'Top solvers ranked by USDC earned' },
          ].map((item, i) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: i < 3 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '2px' }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>{item.desc}</div>
              </div>
              <span style={{ fontSize: '9px', background: 'rgba(91,141,238,0.1)', color: '#5b8dee', border: '0.5px solid rgba(91,141,238,0.2)', borderRadius: '4px', padding: '3px 7px', fontWeight: '500', flexShrink: 0 }}>SOON</span>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '10px' }}>LINKS</h2>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
          {[
            { label: 'Live App', value: 'arcbountyboard.xyz', href: 'https://arcbountyboard.xyz' },
            { label: 'GitHub', value: 'Castro336488/bounty-board', href: 'https://github.com/Castro336488/bounty-board' },
            { label: 'Explorer', value: 'testnet.arcscan.app', href: 'https://testnet.arcscan.app' },
          ].map((item, i) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: i < 2 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{item.label}</span>
              <a href={item.href} target="_blank" style={{ fontSize: '13px', color: '#5b8dee' }}>{item.value}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}