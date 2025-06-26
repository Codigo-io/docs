# Anchor

Welcome to your first Solana Anchor smart contract experience using the Código platform.  

---

## 1️⃣ Create a Workspace

**Step 1:** Open [Código Hub](https://hub.codigo.ai)  
**Step 2:** Click the green **NEW** button to create a new workspace.  
You’ll be asked to enter:
- A **workspace name** (e.g. `my-first-workspace`)
- A **smart contract name** (e.g. `counter`)

**Step 3:** Wait a few seconds while Código initializes everything for you.

<img src="/img/workspace_creation.png" alt="Workspace creation" style={{ width: "400px", height: "400px" }} />
---

## 2️⃣ Prompt Your Idea

Once inside your workspace, tell the AI what you want to build.

```txt
generate a counter solana program with create_counter and increment instructions
```

<img src="/img/prompt_counter.png" alt="Prompt counter" style={{ width: "800px" }} />

Código will respond with a full plan and architecture.  
If you're happy with the proposed structure, confirm and choose between **native** or **Anchor** framework :

```txt
yes generate this code with anchor
```

<img src="/img/yes_anchor.png" alt="Anchor selection" style={{ width: "375px" }} />

Once selected, your program is ready with all the files generated! 🎉

<img src="/img/counter_code.png" alt="counter" style={{ width: "375px" }} />

---

## 3️⃣ Implement the Instructions

The generated files come with scaffolding, but the instruction logic is left for you to implement.

```txt
implement the file create_counter.rs
```

Review the AI implementation by clicking on the **Review** button.   
If it looks good, just click **Apply** and it will automatically update your file code with the new changes.

Repeat this process for each instruction file.

<img src="/img/counter_review.png" alt="counter" style={{ width: "500px" }} />


---

## 4️⃣ Build & Deploy

Once all your logic is implemented, build and deploy your smart contract:

Open a terminal and do :
```bash
cd <repo_name>
anchor build
anchor deploy
```

> ✅ Código already sets up a local `solana-test-validator` and provides you with a preconfigured wallet keypair.

---

## ✅ Next Steps

🎉 Congratulations! You just built and deployed your first Solana program with Código.  

To recap, you've learned how to:
- Set up a new project with zero config  
- Prompt the AI to generate your smart contract  
- Customize business logic instruction by instruction  
- Build and deploy using the terminal

---

## 🚀 Ready to Go Further?

👉 [Browse Features](../development-suite/features)  
👉 [Check Guides and Examples](../guides)