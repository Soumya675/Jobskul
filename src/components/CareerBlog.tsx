import React, { useState } from 'react';
import { CareerArticle } from '../types';
import { BookOpen, Clock, ArrowRight, User, Search, X, Calendar, Tag, Share2, Check } from 'lucide-react';
import { ResponsiveImage } from './ResponsiveImage';

interface CareerBlogProps {
  articles: CareerArticle[];
}

export const CareerBlog: React.FC<CareerBlogProps> = ({ articles }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingArticle, setReadingArticle] = useState<CareerArticle | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Skill Development', 'Interview Preparation', 'Career Advice', 'Career Tips', 'HR Insights', 'Industry News'];

  const filtered = articles.filter(a => {
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const matches =
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      if (!matches) return false;
    }
    if (selectedCategory !== 'All' && a.category !== selectedCategory) return false;
    return true;
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="bg-[#0F172A] rounded-2xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-geometric-mono font-bold uppercase tracking-wider border border-blue-400/30">
            Jobskül Career & HR Intelligence
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Career Playbooks & HR Advisory
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Essential playbooks on upskilling, interview mastery, ATS formatting, soft skills, lateral hiring versus fresher pipelines, and statutory POSH compliance.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles, topics..."
            className="w-full pl-10 pr-8 py-2.5 bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-400 shadow-inner"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-3 text-slate-400 hover:text-white p-0.5"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-white text-[#475569] hover:bg-slate-100 border border-[#E2E8F0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-slate-800 font-bold text-sm">No articles match &ldquo;{search}&rdquo;</p>
          <button
            onClick={() => { setSearch(''); setSelectedCategory('All'); }}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            Reset filter and search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <article
              key={article.id}
              onClick={() => setReadingArticle(article)}
              className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs hover:border-[#2563EB]/50 hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative overflow-hidden">
                  <ResponsiveImage
                    src={article.coverImage}
                    alt={article.title}
                    aspectRatio="16/10"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-900/85 backdrop-blur-xs text-sky-300 text-[10px] font-geometric-mono font-bold uppercase border border-slate-700/80 shadow-2xs">
                    {article.category}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                    <span>{article.date}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-[#0F172A] text-base group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#64748B] line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs border-t border-slate-100 mt-4">
                <div className="flex items-center space-x-2 text-[#475569]">
                  <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white font-bold flex items-center justify-center text-[10px]">
                    {article.author.charAt(0)}
                  </div>
                  <span className="font-semibold text-[11px] truncate max-w-[140px]">{article.author}</span>
                </div>

                <span className="font-bold text-[#2563EB] flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Full Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E2E8F0] space-y-6">
            <div className="relative overflow-hidden">
              <ResponsiveImage
                src={readingArticle.coverImage}
                alt={readingArticle.title}
                aspectRatio="16/9"
                priority={true}
                sizes="(max-width: 1024px) 95vw, 768px"
              />
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-950 text-white rounded-full p-2 text-xs font-bold transition-colors cursor-pointer shadow-lg border border-slate-700"
                title="Close article"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 sm:px-8 pb-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded bg-blue-100 text-[#2563EB] text-xs font-bold font-geometric-mono">
                    {readingArticle.category}
                  </span>
                  <span className="text-xs text-[#64748B] flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{readingArticle.readTime}</span>
                  </span>
                  <span className="text-xs text-[#64748B]">• {readingArticle.date}</span>
                </div>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] p-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied' : 'Share'}</span>
                </button>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-tight">
                  {readingArticle.title}
                </h1>
                <p className="text-xs font-semibold text-[#64748B]">
                  By {readingArticle.author}
                </p>
              </div>

              <div className="text-xs sm:text-sm text-[#334155] leading-relaxed whitespace-pre-line space-y-4">
                {readingArticle.content}
              </div>

              {readingArticle.tags && (
                <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {readingArticle.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-geometric-mono"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
