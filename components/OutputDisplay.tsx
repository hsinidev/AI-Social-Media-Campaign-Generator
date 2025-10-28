// File: components/OutputDisplay.tsx
// This component renders the final AI-generated results.

import React from 'react';
import { CampaignOutput } from '../services/geminiService'; // Import the main output type

// Import your UI Card
import { ContentCard } from './ContentCard';

// Import all your icons (based on your file tree)
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { QuoraIcon } from './icons/QuoraIcon';

// Define the props it receives from App.tsx
type OutputDisplayProps = {
  results: CampaignOutput;
};

// Helper component to format text with line breaks
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="whitespace-pre-wrap text-white">
      {text.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
};

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ results }) => {
  return (
    <div className="space-y-6">
      
      {/* --- Render Tweets --- */}
      {results.tweets && results.tweets.length > 0 && (
        <div className="space-y-4">
          {results.tweets.map((tweet, index) => (
            <ContentCard
              key={`tweet-${index}`}
              icon={<TwitterIcon />}
              title={`Tweet ${index + 1}`}
            >
              <FormattedText text={tweet} />
            </ContentCard>
          ))}
        </div>
      )}

      {/* --- Render Instagram Posts --- */}
      {results.instagram_posts && results.instagram_posts.length > 0 && (
        <div className="space-y-4">
          {results.instagram_posts.map((post, index) => (
            <ContentCard
              key={`insta-${index}`}
              icon={<InstagramIcon />}
              title={`Instagram Post ${index + 1}`}
            >
              <h3 className="font-bold text-gray-300">Image Idea:</h3>
              <p className="text-sm text-gray-400 mb-2 italic">{post.image_idea}</p>
              <h3 className="font-bold text-gray-300 mt-2">Caption:</h3>
              <FormattedText text={post.caption} />
            </ContentCard>
          ))}
        </div>
      )}

      {/* --- Render LinkedIn Post (if it exists) --- */}
      {results.linkedin_post && (
        <ContentCard
          icon={<LinkedInIcon />}
          title="LinkedIn Post"
        >
          <FormattedText text={results.linkedin_post} />
        </ContentCard>
      )}

      {/* --- Render Facebook Post (if it exists) --- */}
      {results.facebook_post && (
        <ContentCard
          icon={<FacebookIcon />}
          title="Facebook Post"
        >
          <FormattedText text={results.facebook_post} />
        </ContentCard>
      )}

      {/* --- Render Quora Answer (if it exists) --- */}
      {results.quora_answer && (
        <ContentCard
          icon={<QuoraIcon />}
          title="Quora Answer"
        >
          <FormattedText text={results.quora_answer} />
        </ContentCard>
      )}
    </div>
  );
};