---
slug: /guides/prompt-engineering
---

# Prompt Engineering Basics & Tips

This guide will help you craft better prompts to get high-quality results from **DevAI**, Código’s AI assistant.

A well-written prompt helps you:
- Generate more accurate smart contracts
- Avoid missing instructions, accounts, or constraints
- Improve code readability and structure

Let’s explore how to write good prompts, avoid common mistakes, and unlock DevAI’s full potential.

---

## ⚡ Prompt Quick‑Start

Use this skeleton to kick off strong prompts:

```txt
generate a solana program that:
- Goal: <what this program enables>
- Users: <who interacts and their roles>
- Actions: <what each role can do>
- Success: <what good looks like>
- Constraints: <fees, time limits, rules, token/NFT logic>
```

Keep it to 5–10 clear sentences. Add technical details only if you already know them (instructions, PDAs, state accounts, seeds).

---

## 🚀 Your First Prompt Matters

Your very first prompt sets the architecture, naming, and mental model for the whole project. Invest a minute to make it crisp.

### Do this
- Start with “generate a solana program that:” and describe the core use case in 5–10 sentences.
- Define roles, actions, success criteria, and constraints (fees, time, authorities, token/NFT rules).
- Call out novelty and edge cases (e.g., dispute windows, slashing, upgrade paths).
- State on‑chain vs off‑chain responsibilities to avoid bloated state.
- Provide 1 sample user flow with concrete values.

### Avoid this
- Vague goals like “make a marketplace” without roles, flows, or constraints.
- Mixing too many deliverables in the first ask (program + tests + frontend + audit).
- Leaving authorities/ownership unspecified.

### Example: weak vs strong first prompt

**Weak**

```txt
Generate an NFT marketplace.
```

**Strong**

```txt
generate a solana program that:
Creators list NFTs for sale; buyers purchase with a payment token. Roles: creator, buyer, platform.
Actions: list_nft, buy_nft, cancel_listing; royalties to creator on sale; platform takes 2% fee.
Success: buyers receive NFT instantly; creators receive proceeds; listings are cancelable only by owner.
Constraints: verify token ownership; prevent double sale; PDA listing keyed by [b"listing", mint].
On‑chain: listing state, escrow handling, fee transfers. Off‑chain: search/sort UI.
Sample: buyer pays 10 USDC for mint X; royalty 5%, fee 2%.
```

Use this strong prompt as the foundation; then add features in small follow‑ups.

---

## 📦 Prompt Examples (click to expand)

<details>
<summary>Social Reputation & Badging System</summary>

```txt
generate a solana program that:
Users can earn reputation badges by completing on-chain actions (e.g. publishing content, votes, or contributing to DAO).
Each badge is an NFT that qualifies the user for privileges (e.g. voting weight, access, rewards).
Creators or DAOs can define “missions” or tasks users complete to earn badges.
Users can stake their badges to boost reputation or rewards.
Badges can be upgraded (level up) by combining or achieving thresholds.
Users may lose badge privileges if violating rules or inactivity.
DAOs can revoke or freeze badges under governance conditions.
Success means active users with meaningful reputation, and DAOs adopt badge logic in voting.
Fees or costs apply when minting or upgrading badges.
```

</details>

<details>
<summary>On‑Chain Subscriptions</summary>

```txt
generate a solana program that:
Creators or DAOs set up subscription tiers (e.g. Bronze, Silver, Gold) with recurring payments in a token.
Users can subscribe to a tier paying each epoch (e.g. monthly) automatically via program logic.
If a user fails payment, membership is revoked until reactivated.
Members gain access to gated content, token airdrops, or voting power while subscribed.
Creators get a share, and the system takes a small fee.
Support pause, cancel, or change tiers mid-cycle.
Ensure minimal on-chain state overhead (using PDAs, snapshots).
Success is stable recurring revenue and active membership retention.
Constraints: must prevent double payments, expired states, and reentrancy.
```

</details>

<details>
<summary>GameFi Time Capsule Locks</summary>

```txt
generate a solana program that:
Users can lock tokens in “time capsules” that mature after a predetermined time (e.g. 3, 6, 12 months).
When matured, they receive the original plus bonus yield or NFT reward.
If unlocking early, there is a penalty (partial penalty or forfeiture).
Users can stack multiple capsules with different durations.
Creators define reward schedules and total reward pool.
Users can view upcoming unlocks and yields.
Success is users locking funds long-term and incentivizing retention.
Constraints include safe handling of penalties, slashing edge cases, and gas efficiency.
```

</details>

<details>
<summary>Prediction Markets</summary>

```txt
generate a solana program that:
Any user can create an event market with multiple choices (e.g. event outcome options).
Users bet or stake tokens on an option until the market’s cutoff.
After the event, the creator or a trusted oracle (maybe multisig) resolves the outcome.
Winning bettors claim proportional rewards; losers lose staked tokens.
The platform takes a fee on bet volume.
Support dispute resolution or challenge windows.
Success is active markets, liquidity, and claimable rewards used.
Constraints: oracle reliability, slashing frauds, tie resolution, minimal overhead.
```

</details>

<details>
<summary>NFT Leasing</summary>

```txt
generate a solana program that:
NFT holders can lease their NFTs to others for a period (in exchange for rent payments).
The lessee gets usage rights (e.g. to display, stake, use in-game), but not full ownership.
At lease expiry, NFT returns to owner automatically.
Creator may define cooldown, allowed usage, and max rent terms.
Lessee can “extend” lease, subject to conditions.
If lessee misbehaves, owner can terminate lease early (with penalty).
Success is NFT liquidity and hands-off leasing.
Constraints: rights enforcement, security, fractional splits, dispute logic.
```

</details>

<details>
<summary>DAO Quests & Achievements</summary>

```txt
generate a solana program that:
Communities (DAOs) can define on-chain “quests” or tasks (e.g. vote, contribute, create content).
Members completing quests receive tokens, NFTs, or levels.
Quests can have dependencies or tiers (must finish Q1 before Q2).
Members can propose custom quests and community votes to add them.
Rewards are drawn from community pool or sponsored funds.
Members can stake their quest tokens to boost rewards.
Success is vibrant engagement and sustained contributions.
Constraints: gas optimization, quest expiry, gaming/cheating prevention.
```

</details>

---

## 🎯 Core Prompting Principles

- **Be explicit about goal, scope, and constraints**.
- **Reference exact files and specify program/frontend** (e.g., "program: programs/marketplace/src/instructions/buy_nft.rs" or "frontend: app/components/BuyButton.tsx").
- **Use concrete examples with real values** to ground behavior.
- **Work step‑by‑step**: one feature/instruction per prompt.
- **Review each output** for validations, authorities, and edge cases.
- **Keep naming consistent** across prompts and files.
- **Start simple, then iterate**; chain prompts as needed.
---

## 📐 Prompting Style

There are two effective styles:

### 1. Technical / Structured Prompt
Designed to instruct DevAI on exactly what accounts, instructions, types, and logic are needed.

Example:

```txt
Generate a Solana smart contract named informal_lender. This contract enables informal lenders to lend money using SOL tokens. It should define two main account types: Broker (a singleton that stores the lender’s funds, fee, and revenue) and Loan (multiple per client, storing loan details including amount, fee, payed, and KYC URL).

The contract should include seeds for both Broker and Loan, where Loan is seeded using the client public key and a loan index.

Define the following instructions:

create_broker: Initializes a Broker account with a delegate (authorized account), initial capital, and a fee. Only one broker should exist.

add_capital_to_broker: Lets anyone add more SOL to the broker's capital. Requires delegate as signer.

request_loan: Lets a client request a loan by creating a Loan account. Includes KYC URL and desired amount.

approve_loan: Allows the delegate to approve a loan, transferring funds from broker to client.

pay_loan: Allows the client to repay part of the loan. Applies fee, moves SOL from client to broker.

Ensure types are strongly typed (u64, u128, bool, etc.), include descriptions for all fields and methods, and apply relevant Solana-specific annotations like sol:init, sol:writable, and sol:account<T, seeds.X>. The kyc_url field should have a cap=96 attribute.
```

---

### 2. Functional / Workflow Prompt
Focuses on what the user should be able to do, DevAI will infer the program design.

Example:

```txt
Write a program for an NFT marketplace. 
The marketplace should allow users to : 
list NFTs for sale, buy NFTs, cancel listings, and handle royalties for creators. 

Ensure the program handles: 
- creating a listing (seller specifies NFT mint and price)
- purchasing an NFT (buyer transfers payment, NFT is transferred to buyer)
- canceling a listing (NFT is returned to seller)
- and royalty distribution (percentage of sale sent to creator's address).
```

---

## Iteration Process

Ask the AI for one specific task at a time — not everything at once. This gives you time to review changes and course‑correct before moving on. When you want to update a specific file, add relevant context and explicitly name the file path or file name so the edit lands in the right place.

### ❌ Anti‑pattern (Too Much at Once)

```txt
Build the full NFT marketplace, plus tests, frontend, and a full security audit in one go.
```

### ✅ Iterative Approach (One Task at a Time)

When editing, include file context and the exact file path so changes land in the right place.

```txt
Step 1 — Program skeleton:
Create the program module and PDAs in src/programs/marketplace/lib.rs with base structs and errors.

Step 2 — Focused instruction:
In src/programs/marketplace/instructions/list_nft.rs, implement `list_nft` with authority checks and royalty config.

Step 3 — Tests:
Add tests for `list_nft` in tests/marketplace_list_nft.test.ts using a real mint and payer.

Step 4 — Next instruction:
Implement `buy_nft` in src/programs/marketplace/instructions/buy_nft.rs; update state transitions accordingly.

Step 5 — Review:
Security checklist: ownership/auth checks, decimals/overflow, PDA seeds, fee math, account closes.
```

This enables:
- Easier review and correction between steps
- Faster iteration
- Clean rollback if one step fails

---

## 🤖 AI Agents & Targeting

DevAI uses specialized agents for different tasks. The usual workflow follows this sequence: **SolanaArchitect** (planning) → **SolanaExpert** (CIDL generation) → **SolanaEngineer** (implementation). By default, the orchestrator routes your prompt to the right agent, but you can also target agents directly when needed.

### Available Agents

<details>
<summary>

#### SolanaArchitect

Creates high-level architecture plans and designs for Solana programs.

</summary>

The **Solana Architect** creates high-level architecture plans and designs for Solana programs. Use this agent when you need:
- Account structures and PDA derivations
- Instruction and signer flow design
- Security and dependency analysis
- A complete architecture blueprint before implementation
- Exploring or reviewing existing code to understand structure and logic

The Architect provides **technical blueprints** and may reference existing code snippets for explanation, but does not write or modify new code.

</details>

<details>
<summary>

#### SolanaExpert

Translates architecture designs into CIDL and generates Solana programs.

</summary>

The **Solana Expert** translates architecture designs into CIDL (Código Interface Description Language) and generates Solana programs. Use this agent when you:
- Have a plan or architecture design ready
- Need to generate CIDL from account and instruction structures
- Want to validate or correct existing CIDL files
- Need to execute program generation from a plan

The Solana Expert **generates source code** by converting architecture-level descriptions into CIDL and then producing the Solana program.

</details>

<details>
<summary>

#### SolanaEngineer

Implements full-stack features across frontend, backend, and on-chain layers.

</summary>

The **Solana Engineer** implements full-stack features across frontend, backend, and on-chain layers. Use this agent when you need to:
- Write or modify Solana program code (Rust/Anchor)
- Implement or update business logic that interacts with the blockchain
- Build or modify frontend components integrated with Solana programs
- Create tests, documentation, or utility scripts

The Solana Engineer **writes and modifies source code** to help you build a complete decentralized application (dApp).

</details>

### Targeting Agents Directly

You can explicitly request a specific agent in your prompts. This is useful when:
- You have a complete technical plan and want to skip the architecture phase
- You need to pass a plan directly to the Solana Expert without modifications
- You want to ensure a specific agent handles your request

#### Example: Using Solana Expert

When you have a complete plan and want to generate code directly:

```txt
Ask the Solana Expert to create a prediction market based on the following plan. 
The Solana Expert must generate all the specified fields for each account and must not drift from this plan, otherwise it will break the user program.

Accounts:
Market
  creator: Pubkey
  question: String
  start_ts: i64
  end_ts: i64
  status: u8
  total_pot: u64
  yes_votes: u64
  no_votes: u64
  winner: Option<u8>
  platform_fee_taken: u64
  creator_fee_taken: u64
  bump: u8

Bet
  market: Pubkey
  user: Pubkey
  option: u8
  amount: u64
  claimed: bool
  bump: u8

Instructions:
  create_market
  place_bet
  resolve_market
  claim_winnings

Do not enhance the prompt, pass it as is to the Solana Expert.
```

**What to customize:**
- Replace `prediction market` with your project name
- Update the account structures (add/remove fields, change types)
- Modify instruction names and their parameters
- Adjust field names and data types to match your requirements

**What to keep:**
- The instruction format: "Ask the Solana Expert to create..."
- The warning about not drifting from the plan
- The "Do not enhance the prompt" instruction at the end

#### Example: Ensuring Consistency After Architecture Planning

After the SolanaArchitect creates a technical plan, if you want to ensure the result matches exactly and specify the framework, you can use prompt :

```txt
Yes, with anchor. And pass the plan as is to the solana expert, don't do any modification.
```

This ensures:
- The plan is passed unchanged to the Solana Expert
- No modifications or enhancements are made to the architecture

### When to Target Agents

- **Use SolanaArchitect** when starting from scratch or needing a high-level design review
- **Use SolanaExpert** when you have a complete technical specification and want to generate code directly
- **Use SolanaEngineer** when implementing features, modifying existing code, or building frontend components
- **Let the orchestrator decide** when your request is clear but you're not sure which agent fits best

---

## 🚀 Next Steps

👉 [Check the others guides and examples](./index.md) 