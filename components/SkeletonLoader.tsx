import React from 'react';
import { Card } from './ui/Card';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';

export const SkeletonLoader: React.FC = () => {
  const SkeletonBar = ({ width = 'w-full' }: { width?: string }) => (
    <div className={`h-4 bg-gray-700 rounded-md animate-pulse ${width}`}></div>
  );

  const SkeletonCard = ({ children }: { children: React.ReactNode }) => (
    <Card>
      {children}
    </Card>
  );

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-500 animate-pulse">
        Generating your campaign...
      </h2>
      <SkeletonCard>
        <div className="flex items-center gap-3">
          <TwitterIcon className="w-6 h-6 text-gray-600" />
          <div className="h-6 w-24 bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <div className="mt-4 space-y-2">
          <SkeletonBar />
          <SkeletonBar width="w-5/6" />
        </div>
      </SkeletonCard>
      <SkeletonCard>
        <div className="flex items-center gap-3">
          <InstagramIcon className="w-6 h-6 text-gray-600" />
          <div className="h-6 w-32 bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <div className="mt-4 space-y-2">
          <SkeletonBar />
          <SkeletonBar width="w-full" />
          <SkeletonBar width="w-4/6" />
          <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
            <SkeletonBar width="w-1/4" />
            <SkeletonBar width="w-3/4" />
          </div>
        </div>
      </SkeletonCard>
    </div>
  );
};
