import React from 'react';
import { BlogPost } from '../types';
import { BookOpen, Clock, ArrowRight, User } from 'lucide-react';

interface CareerBlogProps {
  articles: BlogPost[];
}

export const CareerBlog: React.FC<CareerBlogProps> = ({ articles }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
          Jobskül Career Insights
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
          Engineering Career Playbooks & Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
          Actionable tactics for cracking technical interviews, optimizing ATS resumes, and showcasing hands-on code to hiring managers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-bold text-blue-600 uppercase">{article.category}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-base line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between text-xs border-t border-slate-100 mt-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {article.author.charAt(0)}
                </div>
                <span className="font-medium text-[11px]">{article.author}</span>
              </div>

              <button className="font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
