// File: components/InputForm.tsx
// This is your user-facing form.

import React, { useState } from 'react';
import { CampaignSettings } from '../services/geminiService'; // Import the type
import { LoadingSpinner } from './LoadingSpinner'; // Import the spinner
import { CardContent } from './ui/Card'; // Import your UI component

// Define the props this component needs
type InputFormProps = {
  onGenerate: (settings: CampaignSettings) => Promise<void>; // The function to call on submit
  isLoading: boolean;
};

// We rename it to InputForm to match your file
export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  // Use state to store all the form inputs
  const [productDescription, setProductDescription] = useState('');
  const [brandVoice, setBrandVoice] = useState('');
  const [authorName, setAuthorName] = useState('HSINI MOHAMED');
  
  // State for all checkboxes
  const [genTwitter, setGenTwitter] = useState(true);
  const [genInstagram, setGenInstagram] = useState(true);
  const [genLinkedIn, setGenLinkedIn] = useState(true);
  const [genFacebook, setGenFacebook] = useState(false);
  const [genQuora, setGenQuora] = useState(false);

  // This function runs when the user clicks the "Generate" button
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Stop the page from reloading
    
    onGenerate({
      product_description: productDescription,
      brand_voice: brandVoice,
      author_name: authorName,
      gen_twitter: genTwitter,
      gen_instagram: genInstagram,
      gen_linkedin: genLinkedIn,
      gen_facebook: genFacebook,
      gen_quora: genQuora,
    });
  };

  return (
    // We use CardContent as the wrapper
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Description */}
        <div>
          <label htmlFor="product" className="block text-sm font-medium text-white mb-1">Product Description</label>
          <textarea
            id="product"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="e.g., A new line of noise-canceling headphones..."
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            rows={4}
            required
          />
        </div>

        {/* Brand Voice */}
        <div>
          <label htmlFor="brandVoice" className="block text-sm font-medium text-white mb-1">Brand Voice</label>
          <input
            id="brandVoice"
            type="text"
            value={brandVoice}
            onChange={(e) => setBrandVoice(e.target.value)}
            placeholder="e.g., Confident, professional, and slightly exclusive"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
        </div>

        {/* Author Name */}
        <div>
          <label htmlFor="authorName" className="block text-sm font-medium text-white mb-1">Author</label>
          <input
            id="authorName"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-2 gap-4 pt-2 text-white">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={genTwitter} onChange={(e) => setGenTwitter(e.target.checked)} className="form-checkbox bg-gray-700 border-gray-600" />
            <span>Twitter / X</span>
          {/* FIX: Corrected closing tag from </el> to </label> */}
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={genInstagram} onChange={(e) => setGenInstagram(e.target.checked)} className="form-checkbox bg-gray-700 border-gray-600" />
            <span>Instagram</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={genLinkedIn} onChange={(e) => setGenLinkedIn(e.target.checked)} className="form-checkbox bg-gray-700 border-gray-600" />
            <span>LinkedIn</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={genFacebook} onChange={(e) => setGenFacebook(e.target.checked)} className="form-checkbox bg-gray-700 border-gray-600" />
            <span>Facebook</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={genQuora} onChange={(e) => setGenQuora(e.target.checked)} className="form-checkbox bg-gray-700 border-gray-600" />
            <span>Quora</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded mt-4 hover:bg-blue-700 disabled:bg-gray-500 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : 'Generate Campaign'}
        </button>
      </form>
    </CardContent>
  );
};