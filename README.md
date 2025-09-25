# Hello and Welcome to the Barker Quantitative Trading Club Frontend

If you want to help with development, please read through this file to set up your machine and get started contributing.

---
## Quick Setup (TL;DR)
1. Clone the repo (see below)
2. Run `yarn`
3. Start dev server: `yarn dev`

## Detailed Setup

### Step 1
--
**Set up Git** (if you haven’t already) to interact with GitHub.

<details>
  <summary>Git Setup</summary>
  
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


### Step 2
**Clone the repository** onto your machine.

<details>
  <summary>Cloning</summary>
  
  Run:
  ```bash
  git clone git@github.com:Barker-Quantitative-Trading/Frontend.git
  ```
[How to clone repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

</details>

### Step 3
** Install Node.js + yarn **
1. Install Node [Node.js](https://nodejs.org/en/)
2. Verify 
```bash
node -v
npm -v
```
3. Install yarn
```bash
npm install --global yarn
```

### Step 4
** Install Dependencies **
```bash
yarn install
```

### Step 5
** Start dev server **
```bash 
yarn dev
```

### Step 6
Learn How to contribute by reading this document [Contributing Guidelines](./docs/CONTRIBUTING.md) or going to this link https://barker-quantitative-trading.github.io/Frontend/ and reading the contribution section.

