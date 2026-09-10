import React, { useState, useMemo } from 'react';
import { FAQS_DATA, FAQItem } from '../data/jobskulContent';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, ArrowRight } from 'lucide-react';

interface FAQSectionProps {
  onContactClick?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onContactClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true
  });

  const categories = ['All', 'General', 'For Candidates', 'For Corporates', 'For Institutions'];

  const toggleFAQ = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter(item => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-[#2563EB] text-xs font-geometric-mono font-bold uppercase tracking-wider">
          Knowledge Base & Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto">
          Find clear answers regarding candidate applications, hiring programs, institutional JILP integration, and statutory compliance.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions by keyword (e.g. CMT, JILP, POSH, free resume)..."
          className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-[#CBD5E1] text-xs sm:text-sm focus:outline-none focus:border-[#2563EB] shadow-xs"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-white text-[#475569] hover:bg-slate-100 border border-[#E2E8F0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center space-y-2">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-[#0F172A]">No matching questions found</h3>
            <p className="text-xs text-[#64748B]">Try searching with different terms or selecting another category.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-geometric-mono font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="text-[#64748B] shrink-0 p-1">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* CTA Box */}
      <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-extrabold text-white">Still have questions?</h3>
          <p className="text-xs text-slate-300">
            Our talent and institutional placement advisors are available Monday to Saturday.
          </p>
        </div>
        <button
          onClick={onContactClick}
          className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Our Team</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
