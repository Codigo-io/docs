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

## 🎯 General Tips

- **Be explicit**: Describe clearly what the program should do.
- **Mention the file**: If continuing or modifying existing code, specify the file name (e.g. `lib.rs`, `initialize.rs`, `state.rs`).
- **Use concrete examples**: Provide sample values or cases.
- **Step by step**: Prefer multiple focused prompts over one large vague prompt.
- **Review each output**: Verify the generated code before moving on or combining changes.

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

## Step-by-Step Prompting

DevAI performs better when given tasks in smaller, focused steps:

### ❌ Bad Prompt (Too Much at Once)

```txt
Generate a Solana smart contract for an NFT marketplace.   
Also generate the unit tests in TypeScript, and also the frontend, 
and also verify the security of the program.
```

### ✅ Better Approach
Break it down in multiple prompts :

```txt
Prompt 1: Create the NFT marketplace program file with the PDA and instruction logic.
Prompt 2: Implement the `list_nft`, `buy_nft`, and `cancel_listing` instruction.
Prompt 3: Generate unit tests in TypeScript for `list_nft` and `buy_nft`.
Prompt 4: Generate a React component that allows listing and purchasing NFTs.
Prompt 5: Review the program’s security (authority checks, token ownership, validation).
```

This allows:
- Easier error tracking
- Faster iteration
- Clean rollback if one step fails

---

## ✅ Best Practices

- **Start simple**: Begin with a basic version of the program. Once it works, incrementally add more features.
- **Be precise about the goal**: State clearly what you want to build, test, or fix.
- **Always specify the file**: If you're modifying code, mention the file to ensure DevAI edits the right place.
- **Prompt per feature**: Ask for one instruction or behavior per prompt to avoid confusion and simplify review.
- **Review & edit**: Don't rely blindly on the output, check for missing validations, naming inconsistencies, or logic errors.
- **Use your own naming style**: DevAI adapts use your naming conventions to make results consistent across your codebase.
- **Chain prompts when needed**: It’s okay to split a complex feature across several prompts (e.g., create struct ➝ write instruction ➝ add test ➝ secure logic).

---

## 🚀 Next Steps

👉 [Check the others guides and examples](./index.md) 