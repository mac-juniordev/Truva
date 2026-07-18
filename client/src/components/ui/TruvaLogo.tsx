import React from 'react';
import { cn } from '../../utils/cn';

interface TruvaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const TruvaLogo: React.FC<TruvaLogoProps> = ({
  className,
  size = 'md',
  showText = true,
}) => {
  const sizes = {
    sm: { svg: 'w-8 h-8', text: 'text-lg' },
    md: { svg: 'w-10 h-10', text: 'text-xl' },
    lg: { svg: 'w-14 h-14', text: 'text-2xl' },
    xl: { svg: 'w-20 h-20', text: 'text-3xl' },
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className={cn(sizes[size].svg, 'flex-shrink-0')}
      >
        <defs>
          <linearGradient id="truvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#047857" stopOpacity="1" />
          </linearGradient>
        </defs>
        
        {/* Background Circle */}
        <circle cx="100" cy="100" r="95" fill="#0a0a0a" stroke="url(#truvaGrad)" strokeWidth="4"/>
        
        {/* Shield */}
        <path 
          d="M100 35 L55 60 L55 105 C55 135 72 155 100 168 C128 155 145 135 145 105 L145 60 L100 35 Z" 
          fill="url(#truvaGrad)"
        />
        
        {/* "T" Letter */}
        <path d="M75 75 L125 75" stroke="white" strokeWidth="9" strokeLinecap="round"/>
        <path d="M100 75 L100 125" stroke="white" strokeWidth="9" strokeLinecap="round"/>
        
        {/* Decorative Sparkles */}
        <circle cx="160" cy="55" r="5" fill="#34d399" opacity="0.6"/>
        <circle cx="40" cy="145" r="5" fill="#34d399" opacity="0.6"/>
      </svg>
      
      {showText && (
        <span className={cn(
          'font-bold text-white tracking-tight',
          sizes[size].text
        )}>
          Truva
        </span>
      )}
    </div>
  );
};