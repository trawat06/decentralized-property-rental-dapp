# Decentralized Property Rental System

A full-stack Ethereum dApp where landlords list properties and tenants rent them by paying first month rent + security deposit through a smart contract.

## Project Overview

This project demonstrates a beginner-friendly but professional decentralized rental workflow:

- Landlords list properties on-chain.
- Tenants browse available properties and rent them with ETH.
- Wallet addresses are used as identity.
- Property status updates are handled by smart contract rules.

## Features

- MetaMask wallet connection
- Landlord property listing with title, location, rent, deposit
- View all properties in card layout
- Rent property with payable transaction
- Show availability status (Available / Rented)
- Landlord-only listing management (`markPropertyAvailable`)
- Contract events for listing, renting, and updates
- Responsive React + Tailwind UI with loading and alert states

## Tech Stack

- Frontend: React + Vite
- Styling: Tailwind CSS
- Blockchain: Ethereum
- Smart Contract: Solidity
- Development Framework: Hardhat
- Web3: Ethers.js
- Wallet: MetaMask

## Folder Structure

```text
property-rental-dapp/
  contracts/
    PropertyRental.sol
  scripts/
    deploy.js
  test/
  frontend/
    src/
      blockchain/
      components/
      utils/
  hardhat.config.js
  .env.example
  README.md
```

## Setup Instructions

### 1) Install root dependencies

```bash
npm install
```

### 2) Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

## Run Locally (Hardhat Network)

### 1) Start local Hardhat node

```bash
npm run node
```

### 2) Deploy contract (new terminal)

```bash
npm run deploy:local
```

After deployment, this script:

- Prints contract address in terminal
- Automatically updates `frontend/src/blockchain/contractConfig.js` with:
  - deployed contract address
  - contract ABI

### 3) Run frontend (new terminal)

```bash
cd frontend
npm run dev
```

Open the local Vite URL shown in terminal.

## MetaMask Setup (Localhost)

1. Open MetaMask
2. Add/import one account from Hardhat private keys shown in `npm run node` output
3. Add network:
   - Network name: Hardhat Localhost
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency: ETH
4. Connect wallet in the dApp

## Sepolia Deployment (Optional)

1. Copy `.env.example` to `.env`
2. Fill values:
   - `SEPOLIA_RPC_URL`
   - `PRIVATE_KEY`
3. Run:

```bash
npm run deploy:sepolia
```

Then update frontend config if needed.

## How Blockchain Is Used

- Property data is stored on-chain in `mapping(uint => Property)`.
- Renting requires an on-chain payable transaction.
- Contract enforces:
  - property exists
  - only landlord manages own listing
  - property must be available to rent
  - enough ETH is sent (`rent + deposit`)
- Funds are transferred from tenant to landlord by contract logic.

## Future Improvements

- Add rental period and lease expiration
- Add monthly rent payment cycle
- Add security deposit refund workflow
- Add property images and metadata
- Add unit tests and coverage for edge cases
##  🎥 Demo Video

▶️ Watch here:  
https://github.com/trawat06/decentralized-property-rental-dapp/releases/download/v1.0/Tanvi.mp4
