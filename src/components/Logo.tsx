import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', showTagline = true }) => {
  const scale = size === 'sm' ? 'scale-75' : size === 'lg' ? 'scale-125' : 'scale-100';

  return (
    <div className={`inline-flex flex-col items-start select-none cursor-pointer ${scale} origin-left ${className}`}>
      {/* Brand Name */}
      <div className="flex items-baseline font-black tracking-tight leading-none text-[#0266cc]">
        <span className="text-3xl font-extrabold font-sans">Jobsk</span>
        {/* 'u' with two distinct red dots above it */}
        <span className="relative inline-block text-3xl font-extrabold font-sans">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#eb1c24] inline-block shadow-sm animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#eb1c24] inline-block shadow-sm animate-pulse" />
          </span>
          u
        </span>
        <span className="text-3xl font-extrabold font-sans">l</span>
      </div>

      {/* Sub-bar with "Hire • Train • Deploy" */}
      {showTagline && (
        <div className="mt-0.5 bg-[#0266cc] text-white px-2 py-0.5 rounded-xs w-full flex items-center justify-between text-[8px] font-bold uppercase tracking-wider shadow-xs">
          <span>Hire</span>
          <span className="text-blue-200">•</span>
          <span>Train</span>
          <span className="text-blue-200">•</span>
          <span>Deploy</span>
        </div>
      )}
    </div>
  );
};
