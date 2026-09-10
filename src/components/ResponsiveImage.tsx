import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '16/10' | '21/9' | '3/2' | 'auto';
  sizes?: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fallbackIcon?: React.ReactNode;
}

/**
 * Builds responsive Unsplash srcSet if the URL is an Unsplash image.
 * If not Unsplash, returns undefined so browser uses default src.
 */
function buildSrcSet(url: string): string | undefined {
  if (!url || !url.includes('images.unsplash.com')) {
    return undefined;
  }
  const widths = [360, 480, 640, 768, 1024, 1280, 1600];
  const baseUrl = url.split('?')[0];

  return widths
    .map(w => `${baseUrl}?auto=format&fit=crop&w=${w}&q=80 ${w}w`)
    .join(', ');
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className = '',
  containerClassName = '',
  priority = false,
  fallbackIcon,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClassMap: Record<string, string> = {
    '16/9': 'aspect-video',
    '16/10': 'aspect-[16/10]',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
    '21/9': 'aspect-[21/9]',
    'auto': ''
  };

  const aspectClass = aspectClassMap[aspectRatio] || 'aspect-video';
  const srcSet = buildSrcSet(src);

  if (hasError) {
    return (
      <div
        className={`w-full ${aspectClass} bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-4 rounded-xl border border-slate-200/80 ${containerClassName}`}
      >
        {fallbackIcon || <ImageIcon className="w-8 h-8 stroke-1 text-slate-400 mb-1" />}
        <span className="text-[11px] font-geometric-mono text-slate-400 text-center truncate max-w-full px-2">
          {alt || 'Image preview'}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden w-full ${aspectClass} bg-slate-100 ${containerClassName}`}
    >
      {/* Loading Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-slate-200/70 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-slate-300 animate-bounce" />
        </div>
      )}

      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } ${className}`}
        {...rest}
      />
    </div>
  );
};
