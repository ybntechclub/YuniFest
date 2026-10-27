import React, { useState } from 'react';
import { FEST_FAQS } from '../../data/faqs';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#0A1B3B] relative border-t border-[#F5C451]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2345] border border-[#F5C451]/30 text-xs font-semibold text-[#F5C451] uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Everything you need to know regarding registration passes, outside college participation, campus rules, and competition schedules.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FEST_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#0D2345]/80 border border-slate-700/80 overflow-hidden transition-all duration-200 hover:border-[#F5C451]/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none focus:bg-[#112C57]/80"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-white text-sm sm:text-base pr-2">
                    {faq.question}
                  </span>
                  <div className="shrink-0 p-1 rounded-md bg-[#07152F] text-[#F5C451] border border-slate-700">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
