---
slug: /guides/solana/start-from-prompt
---

# Start from Prompt

With Código, you can describe what you want to build in plain language, and DevAI will handle the rest.  
From a simple idea to a full program structure, prompts are the fastest way to kickstart your smart contract project.

---

## 1️⃣ Create Your Workspace

Start by creating a new workspace in [Código Hub](https://hub.codigo.ai).  
Click the green **NEW** button in the top-left corner of the dashboard.

You’ll be prompted to enter:
- A **workspace name**
- A **smart contract name**

<img src="/img/workspace_creation.png" alt="Workspace creation" style={{ width: "400px", height: "400px" }} />

---

## 2️⃣ Prompt Your Need

Once inside your workspace, tell the AI what you want to build.

You can keep it simple:

```txt
generate a counter solana program with create_counter and increment instructions
```

Or be more specific and describe:
- The list of instructions
- The on-chain data you want to store
- Business rules or logic you want enforced

<img src="/img/prompt_counter.png" alt="Prompt counter" style={{ width: "800px" }} />

---

## 3️⃣ AI Conception

The AI will respond with a detailed plan:  
- Overview of what it's going to build  
- Instructions and their roles  
- Accounts & PDAs  
- Custom errors  
- State structure and types

If something doesn’t look right, feel free to iterate:
- Ask follow-up questions
- Add or modify logic
- Change names, flows, or rules

Once you're satisfied, just reply and choose your framework: **Anchor** or **Native Rust**.
:

```txt
yes, with anchor
```

---

## 4️⃣ Wait for Generation to Complete

Código will generate the full program based on your prompt and selected framework.  
The workspace will be populated with all source files, pre-wired tests, and boilerplate.

<img src="/img/counter_code.png" alt="counter" style={{ width: "375px" }} />

---

## 5️⃣ Continue Building with AI

Your project is ready, but **the business logic inside the instructions is left empty on purpose**.

It's now your turn to guide the AI to implement each one, using natural prompts like:

```txt
Implement the file initialize_counter with basic verification
```

You can iterate, review, and apply changes with full control.

<img src="/img/counter_review.png" alt="counter" style={{ width: "450px" }} />  


Repeat this process for each instruction file.

---

## 🚀 Next Steps

👉 [How to Build & Deploy My Program](./build-and-deploy.md)  
👉 [How to Write and Run Unit Tests](./unit-tests.md)  
👉 [How to Implement Business Logic with AI Autocompletion](./ai-autocomplete.md)