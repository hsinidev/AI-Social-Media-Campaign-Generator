import React, { useState } from 'react';
import type { CampaignSettings } from '../types';
import { Card } from './ui/Card';
import { LoadingSpinner } from './LoadingSpinner';
import { SparkleIcon } from './icons/SparkleIcon';

interface InputFormProps {
  onGenerate: (settings: CampaignSettings) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [settings, setSettings] = useState<CampaignSettings>({
    productDescription: 'A new AI-powered app that helps you write better social media posts.',
    brandVoice: 'Witty, helpful, and slightly futuristic.',
    authorName: 'Alex Doe',
    platforms: {
      twitter: true,
      instagram: true,
      linkedin: false,
      facebook: false,
      quora: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(settings);
  };

  const handlePlatformChange = (platform: keyof CampaignSettings['platforms']) => {
    setSettings(prev => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: !prev.platforms[platform],
      },
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-300 mb-1">
            Product Description
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            rows={3}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500 transition"
            value={settings.productDescription}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="brandVoice" className="block text-sm font-medium text-gray-300 mb-1">
              Brand Voice
            </label>
            <input
              type="text"
              id="brandVoice"
              name="brandVoice"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500 transition"
              value={settings.brandVoice}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-300 mb-1">
              Author Name
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500 transition"
              value={settings.authorName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Platforms
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Object.keys(settings.platforms).map(platform => (
              <label key={platform} className="flex items-center justify-center space-x-2 cursor-pointer bg-gray-800 border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition has-[:checked]:bg-purple-600 has-[:checked]:border-purple-500">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={settings.platforms[platform as keyof typeof settings.platforms]}
                  onChange={() => handlePlatformChange(platform as keyof typeof settings.platforms)}
                />
                <span className="capitalize">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                Generating...
              </>
            ) : (
              <>
                <SparkleIcon className="w-5 h-5 mr-2" />
                Generate Campaign
              </>
            )}
          </button>
        </div>
      </form>
    </Card>
  );
};
