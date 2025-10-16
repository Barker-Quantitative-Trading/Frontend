# Barker Quantitative Trading Club
# Frontend
If you want to help with development, please read through this file to set up your machine and get started contributing.

---
## Quick Setup (TL;DR)
1. Clone the repo (see below)
2. Run `yarn`
3. Start dev server: `yarn dev`

## Detailed Setup

### Step 1 — Git Setup
If you don’t already have Git configured to interact with GitHub, follow the instructions down below or here:
👉 [Set up Git](https://docs.github.com/en/get-started/git-basics/set-up-git)
*(Recommended: use the HTTPS method.)*

<details>
  <summary>Git HTTPS Setup</summary>
  
  1. Make sure Git is installed:  
     - `git --version`  

  2. Configure your Git username and email:  
     - `git config --global user.name "Your Name"`  
     - `git config --global user.email "your_email@example.com"`  

  3. If prompted, log in with your GitHub username and password or use a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) instead of a password.  
</details>
<details>
  <summary>Git SSH Setup</summary>
  
  1. Generate a new SSH key:
     ```bash
     ssh-keygen -t ed25519 -C "your_email@example.com"
     ```
     Press enter for all prompts.
  
  2. Copy your public key:
     ```bash
     pbcopy < ~/.ssh/id_ed25519.pub
     ```
  
  3. Add the SSH key to GitHub:
     - Go to [GitHub SSH Keys](https://github.com/settings/keys)  
     - Click **"New SSH Key"**, paste the copied key, and save.
  
  4. Verify the connection:
     ```bash
     ssh -T git@github.com
     ```
</details>


### Step 2 — Clone the repository

If you do not know how to clone yet please follow the command below or use the link to learn how to clone.

<details>
  <summary>Cloning</summary>
  
  Run:
  ```bash
  git clone git@github.com:Barker-Quantitative-Trading/Frontend.git
  ```
[How to clone repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

</details>

### Step 3 — Install Node.js + yarn 
1. Install Node [Node.js](https://nodejs.org/en/)
2. Verify installation
```bash
node -v
npm -v
```
3. Install yarn (Recommended to also install eslint and prettier eslint)
```bash
npm install --global yarn
```

### Step 4 — Install Dependencies
```bash
yarn install
```

### Step 5 — Start dev server
```bash 
yarn dev
```

### Step 6 — Contribute
Learn How to contribute by reading this document [Contributing Guidelines](./docs/CONTRIBUTING.md) or going to this link https://barker-quantitative-trading.github.io/Frontend/ and reading the contribution section.

