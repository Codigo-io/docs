---
slug: /guides/solana/nft-marketplace
---

# Create an NFT Marketplace

This step-by-step guide shows you how to create a **Solana NFT marketplace** using **Código Hub**.

> A **marketplace** is where users can list NFTs for sale, purchase them, cancel listings, and ensure royalties are distributed to creators. On Solana, this logic can be implemented with smart contracts that manage NFTs, payments, and ownership transfers. Main NFT marketplace on Solana are Tensor and MagicEden.

By the end of this guide, you'll have a complete working NFT Marketplace program with logic and unit tests.

---

## 1️⃣ Create a New Workspace

Go to [Código Hub](https://hub.codigo.ai) and:

- Create a new **workspace**
- Name your smart contract **`nft_marketplace`**

---

## 2️⃣ Prompt the AI

Use this prompt to generate the smart contract:

```bash wordWrap=true
Write a program for an NFT marketplace. 
The marketplace should allow users to list NFTs for sale, buy NFTs, cancel listings, and handle royalties for creators. 
Ensure the program handles: creating a listing (seller specifies NFT mint and price), purchasing an NFT (buyer transfers payment, NFT is transferred to buyer), canceling a listing (NFT is returned to seller), and royalty distribution (percentage of sale sent to creator's address). 
Include appropriate accounts, PDA seeds, and security checks.
```

<img src="/img/nft-marketplace-prompt.png" alt="NFT marketplace prompt" style={{ width: "600px" }} />  

DevAI will:
- Design the architecture
- Define PDA accounts
- List all instructions and fields

<img src="/img/nft-marketplace-pda.png" alt="NFT Marketplace conception" style={{ width: "600px" }} />

Once you're happy with the conception, write **"Yes, generate this with Anchor"**.

---

## 3️⃣ Project is Generated

DevAI will generate:

- Instruction files (`create_listing.rs`, `purcharse_nft.rs`, `cancel_listing.rs`, `update_marketplace.rs` )
- `listing.rs` and `marketplace.rs` for account data onchain
- `errors.rs`, `lib.rs`, and standard Anchor setup
- All required dependencies (e.g. Metaplex, SPL)

<img src="/img/nft-marketplace-files.png" alt="NFT marketplace files" style={{ width: "400px" }} />  

---

## 4️⃣ Implement Business Logic

When opening instructions files like `initialize_marketplace.rs`, `create_listing.rs`, `purcharse_nft.rs`, `cancel_listing.rs` or `update_marketplace.rs`, you’ll see skeleton handlers ready to be implemented:

```rust
pub fn handler(
	ctx: Context<CreateListing>,
	price: u64,
) -> Result<()> {
        // Implement your business logic here...

	Ok(())
}
```

### Step 1 Initiliaze Marketplace

Let’s ask the AI to **implement the first instruction initialize_marketplace** :

```bash
Implement the initialize_marketplace.rs file 
with fee_percentage must be between 0 to 100%
```

If you have specific rules or verifications, include them in the prompt.

DevAI will:
- Analyze your codebase
- Propose logic per instruction
- Include transfers, PDA validation, security checks

Suggestions will appear with ✅ ❌ buttons, or click **Review** for a diff.

When reviewing:
- **Red** = removed lines
- **Green** = proposed new lines

Click **Apply** or **Apply All** when ready.

<img src="/img/nft-marketplace-implement.png" alt="NFT logic implemented" style={{ width: "1000px" }} />  

<img src="/img/nft-marketplace-initialize-marketplace.png" alt="NFT logic initiliaze marketplace implemented" style={{ width: "800px" }} />

As you can see, the code proposed is doing :
- Initiliation of the marketplace account data
- With fee attribute and treasury wallet set by the creator

As the first instruction initialize_marketplace is implemented, let's prompt the next one !

### Step 2 Create Listing

```bash
Implement the create_listing.rs file.
It will create the listing PDA and transfer the NFT from user to the escrow.
```

As you can see, the code proposed is doing :
- Initiliation of the listing account data
- Set the desired price to sell the NFT
- NFT Transfer from user to marketplace escrow

<img src="/img/nft-marketplace-create-listing.png" alt="NFT logic create listing implemented" style={{ width: "700px" }} />

### Step 3 Purchase NFT

Let's keep prompting to implement the instructions, until they are all done.

```bash
Implement the purchase.rs file
```

As you can see, the code proposed is doing :
- NFT Transfer from escrow to user buying
- SOL Transfer from user buying to user selling

<img src="/img/nft-marketplace-purchase-nft.png" alt="NFT logic purchase nft implemented" style={{ width: "700px" }} />


Same process for the remaining instructions : `cancel_listing.rs`, `update_marketplace.rs` 

---

## 5️⃣ Build & Deploy

Once your logic is implemented:

Select your environnement and use Codigo UI to build and deploy in 1 click

<img src="/img/codigo_deploy_ui_1.png" alt="Build and Deploy UI" style={{ width: "600px" }} />

For full details 👉 See [Build & Deploy guide](/guides/solana/build-and-deploy)

---

## 6️⃣ Generate Unit Tests

Ask DevAI:

```bash
Generate unit tests in TypeScript in nft_marketplace.ts
```

<img src="/img/nft-marketplace-unit-tests.png" alt="NFT marketplace unit tests" style={{ width: "1000px" }} />  

Apply the unit test changes proposed by the AI and then run the tests:

```bash
anchor test
```

👉 See [Unit Testing guide](/guides/solana/unit-tests)

---

## 🎉 Congratulations!

You’ve built a complete **NFT Marketplace** smart contract with:

- A create_marketplace instruction to initialize the marketplace
- The ability to list NFTs for sale with a set price
- Support for users to purchase NFTs using SOL
- A method to cancel listings and return NFTs to the seller
- End-to-end unit tests generated and reviewed with AI

You're now ready to test, integrate it into a dApp, or expand the marketplace features !