# ArtChain - Digital Art Marketplace

ArtChain is a sophisticated simulation of a digital art marketplace for creating, discovering, and trading unique artworks as Non-Fungible Tokens (NFTs). This application provides a complete user experience, including simulated Web3 wallet connectivity, gas price tracking, and blockchain transaction history, all running entirely on the client-side.

## Features

-   **Explore a Rich Marketplace:** Browse a dynamic gallery of digital artworks with infinite scroll.
-   **Detailed Artwork View:** Inspect high-resolution images, read artist descriptions, and view current pricing and ownership details.
-   **Simulated NFT Minting:** Create your own digital artworks by uploading an image, adding a title/description, and setting a price. The application simulates the IPFS upload and blockchain minting process.
-   **Buy & Sell (Simulated):** Purchase artworks from other artists. Ownership is transferred and a transaction is recorded on the simulated ledger.
-   **User Profiles:** View artist profiles, showcasing their created works and personal collection of NFTs.
-   **Web3 Wallet Simulation:** Connect a simulated wallet to interact with the marketplace, providing a realistic dApp experience.
-   **Real-time Gas Tracking:** A header component simulates real-time gas price fluctuations, a key aspect of blockchain interactions.
-   **Persistent State:** The application uses the browser's `localStorage` to simulate a serverless database, ensuring all artworks, transactions, and user data persist between sessions.

## Tech Stack

-   **Frontend:** React 19, TypeScript
-   **Styling:** Tailwind CSS
-   **Routing:** React Router
-   **State Management:** React Hooks (useState, useEffect, useContext)
-   **Backend (Simulated):** A custom API layer built on top of browser `localStorage` to mimic a persistent, serverless database.

## Project Structure

The project is organized into a logical and scalable structure:

```
/
├── components/     # Reusable React components (Button, ArtworkCard, etc.)
├── contexts/       # React Context providers (e.g., ToastContext)
├── data/           # Data simulation layer (api.ts, initialData.ts)
├── hooks/          # Custom React hooks (useWallet, useGasPrice)
├── pages/          # Top-level page components for each route
├── App.tsx         # Main application component with routing setup
├── index.html      # The main HTML entry point
├── index.tsx       # React application entry point
└── README.md       # This file
```

## Getting Started

This project is designed to run directly in the browser with no build step required.

1.  Ensure all the project files are in the same directory.
2.  Open the `index.html` file in a modern web browser that supports ES6 modules (e.g., Chrome, Firefox, Safari, Edge).

The application will initialize its simulated database on the first load.

## Security Enhancements

As part of a recent review, the following security improvements were implemented:

-   **Input Validation:** The "Create Artwork" form now includes robust client-side validation for all fields (e.g., checking for empty inputs, valid price numbers, and reasonable text length). This helps prevent invalid data entry and protects against basic injection attempts.
-   **DOM Security:** By leveraging React's JSX, all dynamic content is automatically escaped before being rendered, providing strong protection against Cross-Site Scripting (XSS) attacks. `dangerouslySetInnerHTML` is not used.
-   **No Server-Side Vulnerabilities:** Since the application is fully client-side and simulates its backend, there are no server-related security risks such as database attacks or insecure API endpoints.
