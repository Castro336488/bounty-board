'use client'

export default function Settings() {
  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Settings</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Manage your BountyBoard preferences</p>
      </div>

      <div style={{ maxWidth: '580px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Network */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(168,85,247,0.8)', letterSpacing: '1px', marginBottom: '1rem' }}>NETWORK</div>
          {[
            { label: 'Network', value: 'Arc Mainnet' },
            { label: 'Chain ID', value: '5042' },
            { label: 'RPC URL', value: 'https://rpc.mainnet.arc.io' },
            { label: 'Explorer', value: 'explorer.arc.io' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{item.label}</span>
              <span style={{ fontSize: '13px', color: '#fff', fontFamily: 'monospace' }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Contract */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(168,85,247,0.8)', letterSpacing: '1px', marginBottom: '1rem' }}>CONTRACT</div>
          {[
            { label: 'BountyBoard', value: '0x20D02...326F' },
            { label: 'Network', value: 'Arc Mainnet' },
            { label: 'Version', value: 'V3 — Categories & Deadlines' },
            { label: 'Status', value: 'Live ✅' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{item.label}</span>
              <span style={{ fontSize: '13px', color: '#fff', fontFamily: 'monospace' }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Links */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(168,85,247,0.8)', letterSpacing: '1px', marginBottom: '1rem' }}>LINKS</div>
          {[
            { label: 'Live App', value: 'arcbountyboard.xyz', href: 'https://arcbountyboard.xyz' },
            { label: 'GitHub', value: 'Castro336488/bounty-board', href: 'https://github.com/Castro336488/bounty-board' },
            { label: 'Explorer', value: 'explorer.arc.io', href: 'https://explorer.arc.io/address/0x20D02749c6249cd67AAcDE9423b6AB3Db472326F' },
            { label: 'X', value: '@BountyBoardArc', href: 'https://x.com/BountyBoardArc' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{item.label}</span>
              <a href={item.href} target="_blank" style={{ fontSize: '13px', color: '#c084fc' }}>{item.value}</a>
            </div>
          ))}
        </div>

        {/* Coming soon */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(168,85,247,0.8)', letterSpacing: '1px', marginBottom: '1rem' }}>COMING SOON</div>
          {[
            { icon: '🤖', title: 'AI Agents', desc: 'Autonomous agents that post and solve bounties' },
            { icon: '🔔', title: 'Notifications', desc: 'Get notified when work is submitted or approved' },
            { icon: '📊', title: 'Analytics', desc: 'Deep insights into bounty activity and trends' },
            { icon: '🏆', title: 'Leaderboard', desc: 'Top solvers ranked by USDC earned' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px', opacity: 0.5 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{item.title}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{item.desc}</div>
                </div>
              </div>
              <span style={{ fontSize: '9px', background: 'rgba(168,85,247,0.1)', color: '#c084fc', border: '0.5px solid rgba(168,85,247,0.2)', borderRadius: '4px', padding: '2px 8px' }}>SOON</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}