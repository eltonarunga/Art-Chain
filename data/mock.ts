import { User, Artwork, Transaction } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'CryptoArtist', avatarUrl: 'https://i.pravatar.cc/150?u=1', walletAddress: '0x1234...abcd' },
  { id: '2', name: 'PixelPioneer', avatarUrl: 'https://i.pravatar.cc/150?u=2', walletAddress: '0x5678...efgh' },
  { id: '3', name: 'NFTSage', avatarUrl: 'https://i.pravatar.cc/150?u=3', walletAddress: '0x9abc...ijkl' },
];

export const mockArtworks: Artwork[] = [
  {
    id: 1,
    title: 'Cosmic Dream',
    description: 'A vibrant exploration of nebulae and stellar phenomena, rendered in a psychedelic style.',
    imageUrl: 'https://picsum.photos/seed/cosmic/800/800',
    price: 2.5,
    category: 'Abstract',
    artist: mockUsers[0],
    createdAt: '2023-10-26T10:00:00Z',
    nftDetails: { tokenId: '101', contractAddress: '0xabc...def' },
  },
  {
    id: 2,
    title: 'Cybernetic Metropolis',
    description: 'A sprawling cityscape of the future, where technology and nature intertwine.',
    imageUrl: 'https://picsum.photos/seed/cyber/800/800',
    price: 5.1,
    category: 'Sci-Fi',
    artist: mockUsers[1],
    createdAt: '2023-10-25T14:30:00Z',
    nftDetails: { tokenId: '102', contractAddress: '0xabc...def' },
  },
  {
    id: 3,
    title: 'Whispering Woods',
    description: 'An enchanted forest under the light of a mystical moon, home to ancient spirits.',
    imageUrl: 'https://picsum.photos/seed/woods/800/800',
    price: 3.0,
    category: 'Fantasy',
    artist: mockUsers[2],
    createdAt: '2023-10-24T18:45:00Z',
    nftDetails: { tokenId: '103', contractAddress: '0xabc...def' },
  },
  {
    id: 4,
    title: 'Oceanic Serenity',
    description: 'The calm before the storm. A vast, tranquil ocean landscape under a dramatic sky.',
    imageUrl: 'https://picsum.photos/seed/ocean/800/800',
    price: 1.8,
    category: 'Landscape',
    artist: mockUsers[0],
    createdAt: '2023-10-23T09:15:00Z',
    nftDetails: { tokenId: '104', contractAddress: '0xabc...def' },
  },
   {
    id: 5,
    title: 'Galactic Voyager',
    description: 'A lone ship navigating through the colorful chaos of a distant galaxy.',
    imageUrl: 'https://picsum.photos/seed/galaxy/800/800',
    price: 4.2,
    category: 'Sci-Fi',
    artist: mockUsers[1],
    createdAt: '2023-10-22T11:00:00Z',
    nftDetails: { tokenId: '105', contractAddress: '0xabc...def' },
  },
  {
    id: 6,
    title: 'Ethereal Plains',
    description: 'Rolling hills bathed in an otherworldly glow, where reality seems to bend.',
    imageUrl: 'https://picsum.photos/seed/plains/800/800',
    price: 2.2,
    category: 'Fantasy',
    artist: mockUsers[2],
    createdAt: '2023-10-21T16:20:00Z',
    nftDetails: { tokenId: '106', contractAddress: '0xabc...def' },
  },
];

export const mockTransactions: Transaction[] = [
    { id: 't1', artworkId: 1, type: 'Mint', from: '0x0000...0000', to: mockUsers[0].walletAddress, price: 0, timestamp: '2023-10-26T10:00:00Z', txHash: '0xaaaa...1111' },
    { id: 't2', artworkId: 2, type: 'Mint', from: '0x0000...0000', to: mockUsers[1].walletAddress, price: 0, timestamp: '2023-10-25T14:30:00Z', txHash: '0xbbbb...2222' },
    { id: 't3', artworkId: 3, type: 'Mint', from: '0x0000...0000', to: mockUsers[2].walletAddress, price: 0, timestamp: '2023-10-24T18:45:00Z', txHash: '0xcccc...3333' },
];

export const getArtworks = (): Promise<Artwork[]> => new Promise(resolve => setTimeout(() => resolve(mockArtworks), 1000));
export const getArtworkById = (id: number): Promise<Artwork | undefined> => new Promise(resolve => setTimeout(() => resolve(mockArtworks.find(art => art.id === id)), 500));
export const getTransactionsByArtworkId = (id: number): Promise<Transaction[]> => new Promise(resolve => setTimeout(() => resolve(mockTransactions.filter(tx => tx.artworkId === id)), 500));
export const getUserById = (id: string): Promise<User | undefined> => new Promise(resolve => setTimeout(() => resolve(mockUsers.find(user => user.id === id)), 500));