import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/jobskulContent';
import { Calendar, X, Sparkles, MapPin, ZoomIn } from 'lucide-react';
import { ResponsiveImage } from './ResponsiveImage';

export const GallerySection: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const tags = ['All', 'HR Conclave', 'Hackathon', 'Campus Drive', 'Workshop', 'Placement Day'];

  const filteredItems = selectedTag === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedTag);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItem(null);
    };
    if (activeItem) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200/70 text-xs font-geometric-mono font-bold uppercase tracking-wider">
          Events & Institutional Engagements
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Jobskül Moments & Conclaves
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          High-impact moments from our flagship HR conclaves, statewide student hackathons, pool campus placement drives, and live industry masterclasses.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTag === tag
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/90'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="relative overflow-hidden">
              <ResponsiveImage
                src={item.image}
                alt={item.title}
                aspectRatio="16/9"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-geometric-mono font-bold text-sky-300 border border-slate-700/80 shadow-xs">
                {item.category}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
                <span className="bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-md inline-flex items-center space-x-1 shadow-sm">
                  <ZoomIn className="w-3.5 h-3.5 text-blue-600" />
                  <span>Preview</span>
                </span>
              </div>
            </div>

            <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-geometric-mono">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                <span>View Event Details</span>
                <span>&rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Details Modal */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <ResponsiveImage
                src={activeItem.image}
                alt={activeItem.title}
                aspectRatio="16/10"
                priority={true}
                sizes="(max-width: 1024px) 95vw, 768px"
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-3 right-3 bg-slate-900/80 hover:bg-slate-950 text-white rounded-full p-2 text-xs font-bold transition-colors cursor-pointer shadow-lg border border-slate-700/80"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs px-3 py-1 rounded-lg text-xs font-geometric-mono font-bold text-sky-300 border border-slate-700">
                {activeItem.category}
              </div>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between text-xs font-geometric-mono border-b border-slate-100 pb-3">
                <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200 font-bold">
                  {activeItem.category}
                </span>
                <span className="text-slate-500 flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{activeItem.date}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {activeItem.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeItem.description}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-geometric-mono text-slate-400">
                  Jobskül Institutional Milestone
                </span>
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
