'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI, CATEGORIES } from '../contract'

export default function PostBounty({ onSuccess }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [reward, setReward] = useState('')
  const [category, setCategory] = useState(0)
  const [deadline, setDeadline] = useState('')

  // AI Generator state
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [showAI, setShowAI] = useState(false)

  const { writeContract, data: tx } = useWriteContract()
  const { isLoading } = useWaitForTransactionReceipt({ hash: tx })

  async function generateWithAI() {
    if (!aiPrompt.trim()) return alert('Describe what you need first')
    setAiLoading(true)
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are helping someone post a bounty on BountyBoard — a trustless on-chain bounty board on Arc Testnet where USDC rewards are locked in escrow.

The user wants: "${aiPrompt}"

Generate a well-structured bounty with:
1. A clear, specific title (max 10 words)
2. A detailed description explaining the task, deliverables, and requirements (3-5 sentences)
3. A suggested USDC reward amount (realistic for the task, between 5 and 500)
4. The most fitting category from: Dev, Design, Content, Testing, Research

Respond ONLY with valid JSON in this exact format, no markdown, no extra text:
{"title":"...","description":"...","reward":"...","category":"Dev"}`
          }]
        })
      })
      const data = await response.json()
      const text = data.content[0].text.trim()
      const parsed = JSON.parse(text)
      setTitle(parsed.title || '')
      setDesc(parsed.description || '')
      setReward(parsed.reward?.toString() || '')
      const catIndex = CATEGORIES.indexOf(parsed.category)
      if (catIndex !== -1) setCategory(catIndex)
      setShowAI(false)
      setAiPrompt('')
    } catch (e) {
      console.error('AI error:', e)
      alert('AI generation failed. Please try again or fill in manually.')
    }
    setAiLoading(false)
  }

  async function handlePost() {
    if (!title || !desc || !reward) return alert('Fill in all fields')
    const amount = parseUnits(reward, 18)
    const deadlineTs = deadline ? BigInt(Math.floor(new Date(deadline).getTime() / 1000)) : BigInt(0)

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'postBounty',
      args: [title, desc, category, deadlineTs],
      value: amount,
    }, {
      onSuccess: () => {
        setTitle(''); setDesc(''); setReward(''); setCategory(0); setDeadline('')
        if (onSuccess) onSuccess()
      },
      onError: (e) => console.error('error:', e)
    })
  }

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Post a Bounty</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Lock USDC in escrow and get work done</p>
      </div>

      <div style={{ maxWidth: '580px' }}>

        {/* AI Generator */}
        <div style={{ background: 'rgba(168,85,247,0.06)', border: '0.5px solid rgba(168,85,247,0.25)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showAI ? '1rem' : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>🤖</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>AI Bounty Generator</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>Describe what you need — AI fills the form</div>
              </div>
            </div>
            <button onClick={() => setShowAI(!showAI)}
              style={{ fontSize: '12px', padding: '5px 12px', background: 'rgba(168,85,247,0.15)', border: '0.5px solid rgba(168,85,247,0.3)', color: '#c084fc', borderRadius: '6px' }}>
              {showAI ? 'Hide' : 'Try it'}
            </button>
          </div>

          {showAI && (
            <div>
              <textarea
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                placeholder="e.g. I need someone to build a token price tracker for Arc Testnet using React and wagmi..."
                style={{ marginBottom: '10px', minHeight: '80px' }}
              />
              <button onClick={generateWithAI} disabled={aiLoading}
                style={{ width: '100%', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', border: 'none', fontWeight: '600', padding: '10px', borderRadius: '8px', fontSize: '14px' }}>
                {aiLoading ? '✨ Generating...' : '✨ Generate bounty'}
              </button>
            </div>
          )}
        </div>

        {/* Form */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.75rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>TITLE</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Build a swap UI for Arc" />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>DESCRIPTION</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the task, deliverables and requirements..." />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>CATEGORY</label>
              <select value={category} onChange={e => setCategory(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '14px', outline: 'none' }}>
                {CATEGORIES.map((c, i) => (
                  <option key={c} value={i} style={{ background: '#0a1628' }}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>REWARD (USDC)</label>
              <input type="number" value={reward} onChange={e => setReward(e.target.value)} placeholder="e.g. 10" />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>
              DEADLINE <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: '400' }}>(optional)</span>
            </label>
            <input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} style={{ colorScheme: 'dark' }} />
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '4px' }}>If set, bounty auto-refunds after this date if not approved</div>
          </div>

          <div style={{ background: 'rgba(168,85,247,0.06)', border: '0.5px solid rgba(168,85,247,0.15)', borderRadius: '8px', padding: '10px 14px', marginBottom: '1.5rem', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
            💡 USDC will be locked in the smart contract escrow until you approve a submission or cancel the bounty.
          </div>

          <button onClick={handlePost} disabled={isLoading}
            style={{ width: '100%', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', border: 'none', fontWeight: '600', padding: '11px', borderRadius: '8px', fontSize: '14px' }}>
            {isLoading ? 'Posting...' : '🔒 Lock USDC & Post Bounty'}
          </button>
        </div>
      </div>
    </div>
  )
}