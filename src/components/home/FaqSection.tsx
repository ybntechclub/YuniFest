import React, { useState } from 'react';
import { FEST_FAQS } from '../../data/faqs';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F6F7F9] relative border-t-[1.5px] border-slate-900/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-[1.5px] border-slate-900 font-mono text-xs font-bold text-slate-900 mb-3 shadow-sm">
            <span>[ 06 // CLARIFICATIONS &amp; FAQ ]</span>
          </div>
          <h2 className="font-headline font-black text-3xl sm:text-5xl text-slate-950 uppercase tracking-tight">
            FREQUENTLY ASKED <span className="text-[#2B59FF]">QUESTIONS</span>
          </h2>
          <p className="font-display text-slate-600 text-sm mt-3 leading-relaxed">
            Essential queries regarding free registration passes, visiting college entry, ID cards, and campus protocols.
          </p>
        </div>

        {/* Minimalist Accordion */}
        <div className="space-y-4">
          {FEST_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-3xl border-[1.5px] border-slate-900 bg-white overflow-hidden shadow-sm hover:shadow-solid-pop transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-headline font-bold text-slate-950 text-base sm:text-lg pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-[1.5px] border-slate-900 transition-colors ${
                    isOpen ? 'bg-[#FEF08A] text-slate-950' : 'bg-[#F6F7F9] text-slate-700'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed font-display border-t border-slate-100 animate-fadeIn">
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
