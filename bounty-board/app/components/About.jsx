'use client'

export default function About() {
  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>About</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Learn about BountyBoard, Arc and Circle</p>
      </div>

      {/* BountyBoard */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
          <span style={{ fontSize: '28px' }}>🏆</span>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>BountyBoard</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Trustless on-chain bounty platform</div>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', marginBottom: '1rem' }}>
          BountyBoard is a decentralized bounty platform built on Arc Testnet. Anyone can post tasks with USDC rewards locked in smart contract escrow. Solvers submit work, the poster approves, and USDC releases automatically — no middleman, no fees, no trust required.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
          {[
            { icon: '🔒', label: 'Trustless escrow' },
            { icon: '⚡', label: 'Instant payouts' },
            { icon: '👥', label: 'Multi-solver' },
            { icon: '⏰', label: 'Deadline support' },
            { icon: '🏷️', label: 'Categories' },
            { icon: '🌍', label: 'Permissionless' },
          ].map(f => (
            <div key={f.label} style={{ background: 'rgba(91,141,238,0.08)', border: '0.5px solid rgba(91,141,238,0.15)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
              {f.icon} {f.label}
            </div>
          ))}
        </div>
      </div>

      {/* Arc */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
          <svg style={{ width: '36px', height: '36px', opacity: 0.9 }} viewBox="0 0 100 100">
            <path d="M50 5 C25 5, 8 25, 8 50 L8 75 L22 75 L22 50 C22 33, 35 19, 50 19 C65 19, 78 33, 78 50 L78 75 L92 75 L92 50 C92 25, 75 5, 50 5 Z" fill="white"/>
            <path d="M30 75 L30 60 L70 60 L70 75 Z" fill="white"/>
          </svg>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>Arc Network</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>The Economic Operating System for the internet</div>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Arc is an open Layer-1 blockchain built by Circle, designed for stablecoin-native finance. It uses USDC as the native gas token, delivers sub-second finality, and is fully EVM compatible — making it the perfect chain for financial applications like BountyBoard.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'Chain ID', value: '5042002' },
            { label: 'Native gas token', value: 'USDC' },
            { label: 'Finality', value: 'Sub-second' },
            { label: 'EVM compatible', value: 'Yes — Solidity works' },
            { label: 'Explorer', value: 'testnet.arcscan.app' },
            { label: 'Faucet', value: 'faucet.circle.com' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>{item.label}</span>
              <span style={{ fontSize: '13px', color: '#5b8dee', fontFamily: 'monospace' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Circle */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
          <span style={{ fontSize: '28px' }}>💚</span>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>Circle</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>The company behind USDC and Arc</div>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Circle is a global financial technology firm that enables businesses and developers to harness the power of digital currencies and public blockchains. Circle created USDC — the world's leading regulated dollar digital currency — and built Arc to make stablecoin-native financial applications possible.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'USDC', value: 'Regulated, 1:1 USD-backed stablecoin' },
            { label: 'Arc', value: 'Stablecoin-native L1 blockchain' },
            { label: 'Mission', value: 'Make money move freely globally' },
            { label: 'Website', value: 'circle.com' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>{item.label}</span>
              <span style={{ fontSize: '13px', color: '#5b8dee' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How to use */}
      <div style={{ background: 'linear-gradient(135deg, rgba(26,58,124,0.3), rgba(45,93,192,0.2))', border: '0.5px solid rgba(91,141,238,0.2)', borderRadius: '12px', padding: '1.5rem' }}>
        <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '1rem' }}>📖 How to use BountyBoard</div>
        {[
          { step: '01', title: 'Add Arc Testnet to MetaMask', desc: 'Chain ID: 5042002 · RPC: https://rpc.testnet.arc.network' },
          { step: '02', title: 'Get test USDC', desc: 'Visit faucet.circle.com, select Arc Testnet and paste your wallet address' },
          { step: '03', title: 'Connect your wallet', desc: 'Click "Connect Wallet" and approve the connection in MetaMask' },
          { step: '04', title: 'Post a bounty', desc: 'Go to Post Bounty, fill in the details, set a reward and lock USDC' },
          { step: '05', title: 'Solve a bounty', desc: 'Browse open bounties, submit your work as a URL link' },
          { step: '06', title: 'Approve & get paid', desc: 'Poster reviews submissions and approves the best one — USDC releases instantly' },
        ].map((s, i) => (
          <div key={s.step} style={{ display: 'flex', gap: '14px', marginBottom: i < 5 ? '1rem' : 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#5b8dee', minWidth: '28px', marginTop: '1px' }}>{s.step}</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>{s.title}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}