import React from 'react';

/**
 * A reusable card component for consistent UI layout.
 */
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-slate-800 rounded-lg shadow-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

/**
 * The header section for a Card component.
 */
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-5 border-b border-slate-700 ${className}`}>
    {children}
  </div>
);

/**
 * The main content area for a Card component.
 */
export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);
