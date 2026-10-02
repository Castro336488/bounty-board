'use client'

import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { arcMainnet } from '../providers'

export default function NetworkGuard({ children }) {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain, isPending } = useSwitchChain()

  const isWrongNetwork = isConnected && chainId !== arcMainnet.id

  if (!isWrongNetwork) return <>{children}</>

  return (
    <div style={{ minHeight: '100vh', background: '#0d0a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', zIndex: 50 }}>
      <div style={{ maxWidth: '440px', width: '100%', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '16px', padding: '2.5rem', textAlign: 'center' }}>

        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '28px' }}>
          ⚠️
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
          Wrong Network
        </h2>

        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', marginBottom: '8px' }}>
          You are connected to the wrong network. BountyBoard runs on <strong style={{ color: '#c084fc' }}>Arc Mainnet</strong> — switching to any other network could result in lost funds.
        </p>

        <div style={{ background: 'rgba(239,68,68,0.08)', border: '0.5px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px', marginBottom: '1.5rem', fontSize: '12px', color: 'rgba(239,68,68,0.9)' }}>
          ⚠️ Do not send real USDC to this contract on any other network.
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', marginBottom: '1.5rem', textAlign: 'left' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '8px', letterSpacing: '1px' }}>ARC MAINNET DETAILS</div>
          {[
            { label: 'Network name', value: 'Arc' },
            { label: 'Chain ID', value: '5042' },
            { label: 'RPC URL', value: 'rpc.mainnet.arc.io' },
            { label: 'Currency', value: 'USDC' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{item.label}</span>
              <span style={{ fontSize: '12px', color: '#c084fc', fontFamily: 'monospace' }}>{item.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => switchChain({ chainId: arcMainnet.id })}
          disabled={isPending}
          style={{ width: '100%', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontWeight: '700', fontSize: '15px', cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.7 : 1 }}>
          {isPending ? 'Switching...' : '🔄 Switch to Arc Mainnet'}
        </button>

        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '12px' }}>
          Your wallet will prompt you to confirm the network switch
        </p>
      </div>
    </div>
  )
}