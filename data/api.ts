import { User, Artwork, Transaction } from '../types';
import { mockUsers, mockArtworks, mockTransactions } from './initialData';

const DB_KEY = 'artchain_db';

const initDatabase = () => {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify({
      users: mockUsers,
      artworks: mockArtworks,
      transactions: mockTransactions,
      nextArtworkId: mockArtworks.length + 1,
      nextTxId: mockTransactions.length + 1,
    }));
  }
};

initDatabase();

const getDb = () => {
  const dbString = localStorage.getItem(DB_KEY);
  if (!dbString) {
    initDatabase();
    return JSON.parse(localStorage.getItem(DB_KEY)!);
  }
  return JSON.parse(dbString);
};

const saveDb = (db: any) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- API Functions ---

export const getArtworks = async (): Promise<Artwork[]> => {
  await simulateDelay(500);
  const db = getDb();
  return db.artworks;
};

export const getArtworkById = async (id: number): Promise<Artwork | undefined> => {
  await simulateDelay(300);
  const db = getDb();
  return db.artworks.find((art: Artwork) => art.id === id);
};

export const getTransactionsByArtworkId = async (artworkId: number): Promise<Transaction[]> => {
  await simulateDelay(300);
  const db = getDb();
  return db.transactions.filter((tx: Transaction) => tx.artworkId === artworkId);
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  await simulateDelay(300);
  const db = getDb();
  return db.users.find((user: User) => user.id === id);
};

export const getCurrentUser = async (): Promise<User> => {
  await simulateDelay(50);
  // For simulation, the "logged in" user is always the first user.
  const db = getDb();
  return db.users[0];
};

export const addArtwork = async (
  data: { title: string; description: string; price: number; imageUrl: string, category: Artwork['category'] },
  artist: User
): Promise<Artwork> => {
  await simulateDelay(1500); // Simulate minting process
  const db = getDb();
  
  const newArtwork: Artwork = {
    id: db.nextArtworkId,
    title: data.title,
    description: data.description,
    price: data.price,
    imageUrl: data.imageUrl,
    category: data.category,
    artist: artist,
    owner: artist,
    createdAt: new Date().toISOString(),
    nftDetails: {
      tokenId: (100 + db.nextArtworkId).toString(),
      contractAddress: '0xabc...def',
    },
  };
  
  const mintTransaction: Transaction = {
    id: `t${db.nextTxId}`,
    artworkId: newArtwork.id,
    type: 'Mint',
    from: '0x0000...0000',
    to: artist.walletAddress,
    price: 0,
    timestamp: new Date().toISOString(),
    txHash: `0x${Math.random().toString(16).slice(2, 12)}...${Math.random().toString(16).slice(2, 6)}`,
  };

  db.artworks.push(newArtwork);
  db.transactions.push(mintTransaction);
  db.nextArtworkId++;
  db.nextTxId++;
  
  saveDb(db);
  return newArtwork;
};

export const purchaseArtwork = async (artworkId: number, buyer: User): Promise<void> => {
    await simulateDelay(2500); // Simulate blockchain transaction
    const db = getDb();

    const artworkIndex = db.artworks.findIndex((art: Artwork) => art.id === artworkId);
    if (artworkIndex === -1) {
        throw new Error("Artwork not found");
    }

    const artwork = db.artworks[artworkIndex];
    const seller = artwork.owner;

    // Create sale transaction
    const saleTransaction: Transaction = {
        id: `t${db.nextTxId}`,
        artworkId: artworkId,
        type: 'Sale',
        from: seller.walletAddress,
        to: buyer.walletAddress,
        price: artwork.price,
        timestamp: new Date().toISOString(),
        txHash: `0x${Math.random().toString(16).slice(2, 12)}...${Math.random().toString(16).slice(2, 6)}`,
    };

    // Update artwork owner
    db.artworks[artworkIndex].owner = buyer;
    db.transactions.push(saleTransaction);
    db.nextTxId++;

    saveDb(db);
};
