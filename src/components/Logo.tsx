import React, { useState } from 'react';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'banner' | 'square';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  variant = 'banner',
}) => {
  const [imageError, setImageError] = useState(false);

  // Exact aspect ratio of the official Jobskül logo image (1563:546 ~ 2.86:1)
  const bannerSizes = {
    sm: { height: 32, width: 92 },
    md: { height: 44, width: 126 },
    lg: { height: 60, width: 172 },
    xl: { height: 76, width: 218 },
  }[size];

  const squareSizes = {
    sm: { height: 36, width: 36 },
    md: { height: 48, width: 48 },
    lg: { height: 64, width: 64 },
    xl: { height: 84, width: 84 },
  }[size];

  const targetDim = variant === 'square' ? squareSizes : bannerSizes;
  const imageSrc = variant === 'square' ? '/jobskul-square.png' : '/jobskul-logo.png';

  return (
    <div
      className={`inline-flex items-center select-none cursor-pointer transition-transform hover:opacity-95 active:scale-98 ${className}`}
      style={{ height: targetDim.height }}
      title="Jobskül - Hire • Train • Deploy"
      role="img"
      aria-label="Jobskül - Hire • Train • Deploy Official Logo"
    >
      {!imageError ? (
        <img
          src={imageSrc}
          alt="Jobskül - Hire • Train • Deploy"
          style={{ height: targetDim.height, width: 'auto', objectFit: 'contain' }}
          className="h-full w-auto max-w-none block"
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Vector fallback if image fails to load */
        <svg
          viewBox="0 0 780 260"
          style={{ height: targetDim.height, width: targetDim.width }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@900&family=Plus+Jakarta+Sans:wght@800&display=swap');
              .jsk-text { font-family: 'Nunito', sans-serif; font-weight: 900; fill: #0070C1; }
              .jsk-banner { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; fill: #FFFFFF; letter-spacing: 4px; }
            `}</style>
          </defs>
          <text x="30" y="165" fontSize="172" className="jsk-text">Jobs</text>
          <text x="430" y="165" fontSize="172" className="jsk-text">k</text>
          <text x="525" y="165" fontSize="172" className="jsk-text">u</text>
          <circle cx="560" cy="40" r="18" fill="#F80205" />
          <circle cx="620" cy="40" r="18" fill="#F80205" />
          <text x="640" y="165" fontSize="172" className="jsk-text">l</text>
          <rect x="25" y="196" width="715" height="48" rx="3" fill="#0070C1" />
          <text x="145" y="228" fontSize="24" textAnchor="middle" className="jsk-banner">Hire</text>
          <line x1="265" y1="202" x2="265" y2="238" stroke="#FFFFFF" strokeWidth="2" />
          <text x="382" y="228" fontSize="24" textAnchor="middle" className="jsk-banner">Train</text>
          <line x1="500" y1="202" x2="500" y2="238" stroke="#FFFFFF" strokeWidth="2" />
          <text x="618" y="228" fontSize="24" textAnchor="middle" className="jsk-banner">Deploy</text>
        </svg>
      )}
    </div>
  );
};


