---
slug: /guides/github/connect-terminal-to-github
---

# Connect Your Terminal to GitHub via SSH

You built an amazing project on **Código** and want to push it to **GitHub**?  

This guide walks you through setting up a **GitHub connection from the terminal** using SSH keys.  
Once completed, you’ll be able to push and pull from your GitHub repository without logging in each time.

---

## 1️⃣ Generate an SSH Key

In your terminal, run:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- Press **Enter** to accept the default file path.
- Optionally, set a passphrase for extra security.

---

## 2️⃣ Start the SSH Agent and Add Your Key

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

---

## 3️⃣ Add Your Public Key to GitHub

Display your public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the output, then:

1. Go to **[GitHub.com](https://github.com)** **→ Settings → SSH and GPG Keys → New SSH Key**  
2. Paste your key and save.

---

## 4️⃣ Verify the Connection

Test your setup with:

```bash
ssh -T git@github.com
```

You should see:

```
Hi <your-username>! You've successfully authenticated, but GitHub does not provide shell access.
```

✅ This confirms your terminal is connected to GitHub via SSH.

---

## 5️⃣ Initialize Git in Your Project

Go to your **project root**:

```bash
cd /path/to/your/project
git init
git branch -M main
```

---

## 6️⃣ Set Your Git Identity

```bash
git config user.name "Your Name"
git config user.email "your_email@example.com"
```

---

## 7️⃣ Add Your GitHub Repository as a Remote

Create a repository on **GitHub**.  
Then add it in your terminal:

```bash
git remote add origin git@github.com:your-username/your-repo.git
```
> ⚠️ **Important:** Make sure you copy the **SSH URL** from GitHub (it starts with `git@github.com:`),  
> not the HTTPS URL, otherwise the SSH key you created won’t be used.

---

## 8️⃣ Commit Your Files

```bash
git add .
git commit -m "Initial commit"
```

---

## 9️⃣ Push to GitHub

```bash
git push -u origin main
```

---

## ✅ You’re Connected!

Your local project is now connected to GitHub over SSH.  

From now on, you can update your repository with the standard Git workflow:

```bash
git add .
git commit -m "Describe your changes"
git push
```

Your commits will be sent securely using your SSH key — no extra login required.
