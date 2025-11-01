import React from 'react';

interface IconProps {
  className?: string;
}

interface AnimatedIconProps extends IconProps {
  animated?: boolean;
}


export const IconPhoto: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="15" y1="8" x2="15.01" y2="8"></line>
    <rect x="4" y="4" width="16" height="16" rx="3"></rect>
    <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5"></path>
    <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2"></path>
  </svg>
);

export const IconLoader: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1="12" y1="6" x2="12" y2="3"></line>
        <line x1="16.25" y1="7.75" x2="18.4" y2="5.6"></line>
        <line x1="18" y1="12" x2="21" y2="12"></line>
        <line x1="16.25" y1="16.25" x2="18.4" y2="18.4"></line>
        <line x1="12" y1="18" x2="12" y2="21"></line>
        <line x1="7.75" y1="16.25" x2="5.6" y2="18.4"></line>
        <line x1="6" y1="12" x2="3" y2="12"></line>
        <line x1="7.75" y1="7.75" x2="5.6" y2="5.6"></line>
    </svg>
);

export const IconCircleCheck: React.FC<AnimatedIconProps> = ({ className, animated = false }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 12l2 2l4 -4" className={animated ? 'checkmark-draw' : ''}></path>
    </svg>
);

export const IconAlertCircle: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="12" cy="12" r="9"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);

export const IconX: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const IconGoogle: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
        <path d="M1 1h22v22H1z" fill="none"></path>
    </svg>
);