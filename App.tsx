import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { SkeletonLoader } from './components/SkeletonLoader';
import type { CampaignSettings, CampaignOutput } from './types';
import { generateCampaign } from './services/geminiService';
import { SparkleIcon } from './components/icons/SparkleIcon';

export const App: React.FC = () => {
  const [campaignOutput, setCampaignOutput] = useState<CampaignOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (settings: CampaignSettings) => {
    setIsLoading(true);
    setError(null);
    setCampaignOutput(null);

    try {
      const output = await generateCampaign(settings);
      setCampaignOutput(output);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SparkleIcon className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Vibe Stack Campaign Generator
            </h1>
          </div>
          <p className="text-gray-400">
            Your AI Social Media Strategist, powered by Gemini.
          </p>
        </header>

        <main>
          <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {isLoading && <SkeletonLoader />}
          
          {campaignOutput && !isLoading && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">Your Campaign is Ready!</h2>
              <OutputDisplay output={campaignOutput} />
            </div>
          )}
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Built by a Vibe Coder with Code Vibe Assistant</p>
        </footer>
      </div>
    </div>
  );
};
