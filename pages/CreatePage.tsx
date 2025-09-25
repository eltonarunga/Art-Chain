
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../contexts/ToastContext';
import { addArtwork, getCurrentUser } from '../data/api';
import { Artwork } from '../types';

const CreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<Artwork['category']>('Abstract');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
          addToast("Image size cannot exceed 10MB.", "error");
          return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const priceValue = parseFloat(price);
    if (!title || !description || !price || !imageFile || !imagePreview) {
        addToast('Please fill all fields and upload an image.', 'error');
        return;
    }
    if (isNaN(priceValue) || priceValue <= 0) {
        addToast('Please enter a valid, positive price.', 'error');
        return;
    }
     if (title.length > 100) {
        addToast('Title must be less than 100 characters.', 'error');
        return;
    }
    if (description.length > 1000) {
        addToast('Description must be less than 1000 characters.', 'error');
        return;
    }
    
    setIsMinting(true);
    addToast('Uploading to IPFS (simulated)...', 'success');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addToast('Minting NFT on the blockchain (simulated)...', 'success');
    try {
        const currentUser = await getCurrentUser();
        const newArtwork = await addArtwork({
            title,
            description,
            price: priceValue,
            imageUrl: imagePreview,
            category
        }, currentUser);
        
        addToast('Artwork successfully minted!', 'success');
        navigate(`/artwork/${newArtwork.id}`);
    } catch (error) {
        addToast('An error occurred during minting.', 'error');
        setIsMinting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Create New Artwork</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 focus:ring-violet-500 focus:border-violet-500" maxLength={100} />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea id="description" rows={5} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 focus:ring-violet-500 focus:border-violet-500" maxLength={1000} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-300 mb-1">Price (ETH)</label>
                <input type="number" id="price" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 focus:ring-violet-500 focus:border-violet-500" />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                <select id="category" value={category} onChange={e => setCategory(e.target.value as Artwork['category'])} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 focus:ring-violet-500 focus:border-violet-500">
                    <option>Abstract</option>
                    <option>Sci-Fi</option>
                    <option>Fantasy</option>
                    <option>Landscape</option>
                </select>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300 mb-1">Artwork Image</label>
          <div className="w-full aspect-square border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center relative overflow-hidden bg-slate-900">
            {imagePreview ? (
              <img src={imagePreview} alt="Artwork preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-12 w-12"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <p className="mt-2">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
             <input type="file" onChange={handleImageChange} accept="image/png, image/jpeg, image/gif" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" aria-label="Upload artwork image" />
          </div>
           <Button type="submit" disabled={isMinting} className="w-full py-3 text-lg">
                {isMinting ? <><LoadingSpinner className="mr-2" />Minting...</> : 'Mint Artwork'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;