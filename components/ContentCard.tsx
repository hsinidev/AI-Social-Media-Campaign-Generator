import React, { useState, useRef } from 'react';

interface ContentCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export const ContentCard: React.FC<ContentCardProps> = ({ icon, title, children }) => {
  const [copied, setCopied] = useState(false);
  // Fix: Use a ref to get the rendered text content of the children, which is safer and more reliable than introspecting props. This resolves the TypeScript errors.
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (contentRef.current) {
        navigator.clipboard.writeText(contentRef.current.innerText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-slate-700/50 border-b border-slate-700">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-bold text-slate-200">{title}</h3>
        </div>
        <button 
            onClick={handleCopy}
            className="text-xs bg-slate-600 hover:bg-slate-500 text-slate-300 font-semibold py-1 px-3 rounded-md transition-colors"
        >
            {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-5" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};
