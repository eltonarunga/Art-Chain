
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  walletAddress: string;
}

export interface Artwork {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: 'Abstract' | 'Sci-Fi' | 'Fantasy' | 'Landscape';
  artist: User; // The creator
  owner: User; // The current owner
  createdAt: string;
  nftDetails: {
    tokenId: string;
    contractAddress: string;
  };
}

export interface Transaction {
  id: string;
  artworkId: number;
  type: 'Mint' | 'Sale' | 'Bid';
  from: string;
  to: string;
  price: number;
  timestamp: string;
  txHash: string;
}