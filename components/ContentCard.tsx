import React, { useState } from 'react';
import { Card } from './ui/Card';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ContentCardProps {
  icon: React.ReactNode;
  title: string;
  content: string | React.ReactNode;
  copyText?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({ icon, title, content, copyText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = copyText || (typeof content === 'string' ? content : '');
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Copy content"
          disabled={!copyText && typeof content !== 'string'}
        >
          {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
        </button>
      </div>
      <div className="mt-4 text-gray-300 prose prose-invert prose-sm max-w-none">
        {typeof content === 'string' ? <p className="whitespace-pre-wrap">{content}</p> : content}
      </div>
    </Card>
  );
};
