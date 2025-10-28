// File: App.tsx
// This is the main "controller" for your whole application.

import React, { useState } from 'react';
import { InputForm } from './components/InputForm'; // Use InputForm
import { OutputDisplay } from './components/OutputDisplay'; // Use OutputDisplay
import { Card, CardHeader, CardContent } from './components/ui/Card'; // Your base UI card
import { generateCampaign, CampaignSettings, CampaignOutput } from './services/geminiService';

// This is the main App component
export const App: React.FC = () => {
  // State to hold the AI's response
  const [results, setResults] = useState<CampaignOutput | null>(null);
  // State to show the loading spinner
  const [isLoading, setIsLoading] = useState(false);
  // State to show any errors
  const [error, setError] = useState<string | null>(null);

  // This is the function that the form will call
  const handleGenerateCampaign = async (settings: CampaignSettings) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      // Call your "Waiter" service
      const output = await generateCampaign(settings);
      setResults(output); // Save the results
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.'); // Save any errors
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    // Main app container
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">AI Social Media Campaign Generator</h1>
        <p className="text-lg text-gray-400">by Code Vibe Assistant</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* Left Side: The Form */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-white">Campaign Brief</h2>
          </CardHeader>
          {/* We pass props to InputForm, which now includes CardContent */}
          <InputForm 
            onGenerate={handleGenerateCampaign} 
            isLoading={isLoading} 
          />
        </Card>

        {/* Right Side: The Results */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-white">Generated Content</h2>
          </CardHeader>
          <CardContent>
            {/* Show loading spinner, error, or the results */}
            {isLoading && (
              <div className="flex flex-col justify-center items-center h-64">
                <p className="text-lg">Generating your campaign... this may take a moment.</p>
              </div>
            )}
            {error && (
              <div className="flex justify-center items-center h-64">
                <p className="text-lg text-red-400">Error: {error}</p>
              </div>
            )}
            {results && !isLoading && !error && (
              <OutputDisplay results={results} />
            )}
            {!results && !isLoading && !error && (
              <div className="flex justify-center items-center h-64">
                <p className="text-lg text-gray-500">Your results will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Powered By Footer */}
      <footer className="text-center mt-8 text-gray-500">
        {results?.poweredBy || "POWERED BY HSINI MOHAMED"}
      </footer>
    </div>
  );
};