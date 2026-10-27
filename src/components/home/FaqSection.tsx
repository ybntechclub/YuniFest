import React, { useState } from 'react';
import { FEST_FAQS } from '../../data/faqs';
import { Plus, Minus } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#040814] relative border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-[#F5C451] mb-3">
            [ 06 // CLARIFICATIONS & FAQ ]
          </div>
          <h2 className="font-headline font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            FREQUENTLY ASKED <span className="gold-gradient-text">QUESTIONS</span>
          </h2>
          <p className="font-display text-slate-400 text-sm mt-3 leading-relaxed">
            Essential queries regarding free registration passes, visiting college entry, ID cards, and campus protocols.
          </p>
        </div>

        {/* Minimalist Accordion */}
        <div className="space-y-3">
          {FEST_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="mdnt-card rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-headline font-bold text-white text-base sm:text-lg pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#F5C451] text-[#03060E]' : 'bg-white/5 text-slate-300 border border-white/10'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-display border-t border-white/5 animate-fadeIn">
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
