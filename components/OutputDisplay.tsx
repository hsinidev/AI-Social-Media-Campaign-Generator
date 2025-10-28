import React from 'react';
import type { CampaignOutput } from '../types';
import { ContentCard } from './ContentCard';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { QuoraIcon } from './icons/QuoraIcon';

interface OutputDisplayProps {
  output: CampaignOutput;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  return (
    <div className="space-y-6">
      {output.tweets?.length > 0 && (
        <div className="space-y-4">
          {output.tweets.map((tweet, index) => (
            <ContentCard
              key={`tweet-${index}`}
              icon={<TwitterIcon className="w-6 h-6 text-sky-400" />}
              title={`Tweet ${index + 1}`}
              content={tweet}
            />
          ))}
        </div>
      )}

      {output.instagram_posts?.length > 0 && (
        <div className="space-y-4">
          {output.instagram_posts.map((post, index) => (
            <ContentCard
              key={`insta-${index}`}
              icon={<InstagramIcon className="w-6 h-6 text-pink-500" />}
              title={`Instagram Post ${index + 1}`}
              content={
                <>
                  <p className="whitespace-pre-wrap">{post.caption}</p>
                  <p className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
                    <strong>Image Idea:</strong> {post.image_idea}
                  </p>
                </>
              }
              copyText={post.caption}
            />
          ))}
        </div>
      )}

      {output.linkedin_post && (
        <ContentCard
          icon={<LinkedInIcon className="w-6 h-6 text-blue-500" />}
          title="LinkedIn Post"
          content={output.linkedin_post}
        />
      )}

      {output.facebook_post && (
        <ContentCard
          icon={<FacebookIcon className="w-6 h-6 text-blue-600" />}
          title="Facebook Post"
          content={output.facebook_post}
        />
      )}

      {output.quora_answer && (
        <ContentCard
          icon={<QuoraIcon className="w-6 h-6 text-red-600" />}
          title="Quora Answer"
          content={output.quora_answer}
        />
      )}
      
      <div className="text-center text-xs text-gray-500 pt-4">
        <p>Author: {output.author}</p>
        <p>Powered by: {output.poweredBy}</p>
      </div>
    </div>
  );
};
