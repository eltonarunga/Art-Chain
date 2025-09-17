
import React, { useState, useCallback } from 'react';
import { Button } from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../contexts/ToastContext';

const CreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const { addToast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
    if (!title || !description || !price || !imageFile) {
        addToast('Please fill all fields and upload an image.', 'error');
        return;
    }
    
    setIsMinting(true);
    addToast('Uploading to IPFS (simulated)...', 'success');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addToast('Minting NFT on the blockchain (simulated)...', 'success');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsMinting(false);
    addToast('Artwork successfully minted!', 'success');

    // Reset form
    setTitle('');
    setDescription('');
    setPrice('');
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Create New Artwork</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 focus:ring-violet-500 focus:border-violet-500" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea id="description" rows={5} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 focus:ring-violet-500 focus:border-violet-500" />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-300 mb-1">Price (ETH)</label>
            <input type="number" id="price" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 focus:ring-violet-500 focus:border-violet-500" />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300 mb-1">Artwork Image</label>
          <div className="w-full aspect-square border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center relative overflow-hidden bg-slate-900">
            {imagePreview ? (
              <img src={imagePreview} alt="Artwork preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-12 w-12"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <p className="mt-2">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
             <input type="file" onChange={handleImageChange} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
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
