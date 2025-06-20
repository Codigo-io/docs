---
slug: /guides/solana/build-and-deploy
---

# How to Build & Deploy

This guide walks you through the process of building and deploying your smart contract using **Código**, whether you chose the **Anchor** or **Native** Solana framework.

---

## 🧱 Prerequisites

Make sure you’ve:
- Created a workspace on [Código Hub](https://hub.codigo.ai)
- Generated your program with DevAI (via prompt or template)
- Implemented the logic in your instruction files

If you haven’t done these steps yet, start with [Start from Prompt](./start-from-prompt.md).


---
## 1️⃣ Build Your Program

Open a terminal in Código Hub.

### For Anchor Programs

```bash
cd program
anchor build
```

This command compiles your Anchor smart contract and generates the IDL and `.so` file under the `target/` folder.

---

### For Native Programs

```bash
cd program
cargo build-sbf
```

This compiles your native Solana program using the standard Solana SDK toolchain.

---

## 2️⃣ Select Your Environment


Before deploying, choose the Solana cluster you want to target:

```bash
solana config get
solana config set --url <environment>
```

You can use predefined aliases or full RPC URLs:

- `devnet` → `https://api.devnet.solana.com`
- `mainnet-beta` → `https://api.mainnet-beta.solana.com`
- `localhost` → `http://127.0.0.1:8899`
- Or any custom RPC endpoint (e.g. from Triton, Helius, QuickNode)

💡 Example command
```bash
solana config set --url devnet
# or
solana config set --url https://api.helius.xyz/?api-key=YOUR_API_KEY
```

> ℹ️ Código uses a preconfigured local validator by default when working inside the IDE.

---

## 3️⃣ Deploy Your Program

Once built, you can deploy to your chosen Solana cluster.
Código will use the wallet and network selected via `solana config`.

### For Anchor Programs

```bash
anchor deploy
```
---

### For Native Programs

1. Make sure your validator is running (for local):

```bash
solana-test-validator
```

2. Then deploy your `.so` file:

```bash
solana program deploy target/deploy/<your_program>.so
```

Replace `your_program.so` with the actual name if different.

---

## ✅ Deployment Success

Once deployed, you’ll get a **Program ID**. You can now:

- Interact with it via the Código test interface
- Build a frontend
- Start writing integration tests or unit tests

## ⚡ Quick Deploy Example

If you want to deploy your program faster with fine tuned settings (e.g. on mainnet), here’s a sample command using QUIC, higher compute unit price, and custom RPC:

```bash
solana program deploy ./target/deploy/<your_program>.so
  --max-sign-attempts 1000
  --use-quic
  --with-compute-unit-price 10000
  --url <your_rpc>
  --program-id ./target/deploy/<keypair>.json