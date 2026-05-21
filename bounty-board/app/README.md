# 🏆 BountyBoard

A trustless on-chain bounty board built on Arc Testnet. Post tasks with USDC rewards locked in escrow. Solvers submit work, the poster approves, and USDC releases automatically via smart contract — no middleman required.

🔗 **Live at:** [bounty-board-nine.vercel.app](https://bounty-board-nine.vercel.app)

## How it works

1. **Post a bounty** — Describe the task and lock your USDC reward into the smart contract escrow
2. **Solver submits work** — Anyone can pick up the bounty and submit a link to their completed work
3. **Approve & pay** — Review the work and approve it. USDC is released instantly to the solver

## Features

- 🔒 Trustless escrow — USDC locked in smart contract, no middleman
- ⚡ Instant payouts — Sub-second finality on Arc Testnet
- 💵 USDC native — Stable payments, no price volatility
- 🌍 Permissionless — Anyone can post or solve bounties
- 📡 On-chain events — BountyPosted, WorkSubmitted, BountyCompleted, BountyCancelled

## Smart Contract

Deployed on Arc Testnet:
0x9b22577a97300326562D52D520CD6AaDE6506c72

Events emitted:
- BountyPosted(id, poster, title, reward)
- WorkSubmitted(id, solver, submissionUrl)
- BountyCompleted(id, solver, reward)
- BountyCancelled(id)

## Tech Stack

- **Smart Contract** — Solidity 0.8.20
- **Frontend** — Next.js + wagmi + viem
- **Network** — Arc Testnet (Chain ID: 5042002)
- **Hosting** — Vercel

## Getting Started

### Prerequisites
- Node.js v18+
- MetaMask wallet
- Arc Testnet added to MetaMask (Chain ID: 5042002, RPC: https://rpc.testnet.arc.network)
- Test USDC from faucet.circle.com

### Run locally

git clone https://github.com/Castro336488/bounty-board.git
cd bounty-board
npm install
npm run dev

Open http://localhost:3000 in your browser.

## Network Details

| | |
|---|---|
| Network | Arc Testnet |
| Chain ID | 5042002 |
| RPC URL | https://rpc.testnet.arc.network |
| Explorer | https://testnet.arcscan.app |
| Faucet | https://faucet.circle.com |

## Roadmap

- [x] Smart contract with escrow logic
- [x] Frontend with wallet connect
- [x] Landing page
- [ ] Mobile responsive design
- [ ] Bounty search and filter
- [ ] Deadline field
- [ ] Stats dashboard
- [ ] The Graph indexer
- [ ] Arc Mainnet deployment

## Built by

@Castro336488 — Built on Arc Testnet 🏆