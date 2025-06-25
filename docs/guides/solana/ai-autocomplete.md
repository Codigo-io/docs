---
slug: /guides/solana/ai-autocomplete
---

# Implementing Business Logic with AI Autocompletion

This guide explains how to use **Código's DevAI** to implement your instruction logic through contextual autocomplete.

You don’t need to write every line manually. Código helps you go faster by predicting and inserting relevant business logic right into your code.

---

## 1️⃣ Open Your Instruction File

Once your program has been generated, open one of the instruction files (e.g. `initialize_marketplace.rs` or `create_user.rs`).

You’ll see a comment like:

```rust
// Implement your business logic here...
```

Place your cursor near the comment or on a new line below.  
Código will detect the context and automatically suggest relevant code.

<img src="/img/autocomplete_ai.png" alt="autocomplete" style={{ width: "600px" }} />

---

## 2️⃣ Accept Autocomplete Suggestion

Once a suggestion appears, press the **`Tab`** key to accept it.  

You can also hover over the suggestion with your mouse to see additional options:
- Use the **left/right arrows** to cycle through alternative suggestions
- Click **Apply** to accept a suggestion

<img src="/img/autocomplete_ai_ux.png" alt="autocomplete" style={{ width: "600px" }} />

If you change your mind or no longer want the suggestion, simply **click anywhere outside the suggestion box** to dismiss it.

---

## 3️⃣ Start writing and finish with autocomplete
 
You can also start typing something, and DevAI will complete it based on the file context and your data model.

For example, if you type:

```rust
if marketplace.fee_bps
```

DevAI may suggest:
<img src="/img/autocomplete_ai_bps.png" alt="autocomplete" style={{ width: "600px" }} />

## ✅ Best Practices

- **Review before applying**: Always read through the suggested code to ensure it aligns with your intent.
- **Validate critical logic**: Double check sensitive areas like authority checks, token transfers, or access control.
- **Use AI as a co-pilot, not a substitute**: Autocomplete speeds you up, but your expertise ensures the code is correct.

---

## 🚀 Next Steps

👉 [Start from Prompt](./start-from-prompt.md)  
👉 [How to Build & Deploy My Program](./build-and-deploy.md)  
👉 [How to Write and Run Unit Tests](./unit-tests.md)