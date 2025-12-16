---
slug: /guides/github/connect-terminal-to-github
---

# Export your code to GitHub

<iframe
  width="100%"
  height="550"
  src="https://www.youtube.com/embed/puKNYxlYoKk?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&loop=1&playlist=puKNYxlYoKk&showinfo=0&disablekb=1&iv_load_policy=3&playsinline=1&enablejsapi=0&vq=hd1080"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
  allowFullScreen
  style={{ marginTop: '1rem', marginBottom: '2rem', maxWidth: '1200px' }}
></iframe>

You built an amazing project on **Código** and want to push it to **GitHub**?  

This guide walks you through setting up a **GitHub connection from the terminal** using SSH keys.  
Once completed, you'll be able to push and pull from your GitHub repository without logging in each time.

:::tip Quick Alternative: Download as ZIP
If you just want to download your code without setting up Git, you can simply **right-click on any folder in the file explorer on the left**, then click **"Download"**. This will download the code as a ZIP file to your local computer. Simple as that! Note: it may take a few minutes if your repository is large.
:::

---

## 1️⃣ Generate an SSH Key

In a Codigo **terminal**, run:

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
