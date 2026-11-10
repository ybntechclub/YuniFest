import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Sparkles, ArrowUpRight, ShieldCheck, GraduationCap } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const plans = [
    {
      id: 'internal',
      name: 'Internal Student',
      tag: 'YBN CAMPUS',
      tagBg: 'bg-[#FEF08A] text-slate-950 border-slate-900',
      description: 'For bonafide YBN University students across all faculties and academic departments.',
      price: '₹399',
      period: '/ 3-day pass',
      buttonText: 'Register Now',
      buttonClass: 'bg-white hover:bg-[#FEF08A] text-slate-950 border-[1.5px] border-slate-900 shadow-xs hover:shadow-solid-pop',
      isPopular: false,
      icon: GraduationCap,
      features: [
        'Full 3-Day Festival Access (Dec 10, 11 & 12)',
        'Eligible for all 15+ Flagship Competitions',
        'Free Entry to Grand Fashion Runway',
        'Free Access to Open-Air Mega EDM DJ Night',
        'Official Verified Festival Entry Token',
        'Physical YBN Student ID Card Required',
      ],
    },
    {
      id: 'visitor',
      name: 'Visitor Pass',
      tag: 'OPEN NATIONWIDE',
      tagBg: 'bg-[#FEF08A] text-slate-950 border-slate-900',
      description: 'For visiting scholars and students representing recognized colleges & universities across India.',
      price: '₹499',
      period: '/ 3-day pass',
      buttonText: 'Register Now',
      buttonClass: 'bg-[#FEF08A] hover:bg-white text-slate-950 border-[1.5px] border-slate-900 shadow-solid-pop hover:scale-[1.02]',
      isPopular: true,
      icon: Sparkles,
      features: [
        'Full 3-Day Festival Access (Dec 10, 11 & 12)',
        'Eligible for 9 Flagship Open Competitions',
        'Free Entry to Grand Fashion Runway',
        'Free Access to Open-Air Mega EDM DJ Night',
        'Official Verified Festival Entry Token',
        'Physical College/University ID Card Required',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#F6F7F9] relative border-t-[1.5px] border-slate-900/15 scroll-mt-20">
      
      {/* Decorative ambient glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#2B59FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FEF08A]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Heading matching reference UI: Plans and pricing */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-[1.5px] border-slate-900 font-mono text-xs font-bold text-slate-900 mb-3.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2B59FF]" />
            <span>[ FESTIVAL ADMISSION TIERS ]</span>
          </div>
          
          <h2 className="font-headline font-black text-3xl sm:text-5xl md:text-6xl text-slate-950 uppercase tracking-tight">
            Plans and pricing
          </h2>
          
          <p className="mt-3 font-display text-sm sm:text-base text-slate-600">
            Choose the right option for your festival journey and experience YUNIFEST 2026.
          </p>

          {/* Toggle pill matching reference screenshot style */}
          <div className="mt-6 inline-flex items-center p-1 bg-white rounded-full border-[1.5px] border-slate-900 shadow-xs font-mono text-xs font-bold">
            <span className="px-4 py-1.5 rounded-full bg-[#2B59FF] text-white">
              Pay Once
            </span>
            <span className="px-4 py-1.5 text-slate-700">
              Full 3 Days All-Access (Dec 10-12)
            </span>
          </div>
        </div>

        {/* 2-Card Grid (Internal and Visitor) */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-8 items-stretch">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-[30px] border-[1.5px] border-slate-900 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group ${
                  plan.isPopular
                    ? 'bg-[#2B59FF] text-white shadow-solid-pop-lg md:-translate-y-3'
                    : 'bg-white text-slate-950 shadow-solid-pop hover:-translate-y-1'
                }`}
              >
                {/* Popular Pill Tag on Center Card */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#FEF08A] text-slate-950 border-[1.5px] border-slate-900 font-mono text-[10px] font-black uppercase tracking-wider shadow-xs">
                    ★ MOST POPULAR PASS
                  </div>
                )}

                <div>
                  {/* Top Row: Plan Name & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className={`font-headline font-black text-2xl uppercase tracking-tight ${
                      plan.isPopular ? 'text-white' : 'text-slate-950'
                    }`}>
                      {plan.name}
                    </h3>

                    <span className={`font-mono text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${plan.tagBg}`}>
                      {plan.tag}
                    </span>
                  </div>

                  {/* Subtitle Description */}
                  <p className={`font-display text-xs leading-relaxed min-h-[36px] ${
                    plan.isPopular ? 'text-blue-100' : 'text-slate-600'
                  }`}>
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-1.5 my-6 pb-6 border-b border-current/15">
                    <span className={`font-headline font-black text-4xl sm:text-5xl tracking-tight ${
                      plan.isPopular ? 'text-white' : 'text-slate-950'
                    }`}>
                      {plan.price}
                    </span>
                    <span className={`font-mono text-xs font-bold uppercase tracking-wider ${
                      plan.isPopular ? 'text-blue-200' : 'text-slate-500'
                    }`}>
                      {plan.period}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to="/register"
                    className={`w-full py-3 px-5 rounded-2xl font-display text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${plan.buttonClass}`}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  {/* Checklist of Features */}
                  <div className="mt-8 space-y-3">
                    <span className={`font-mono text-[11px] font-bold uppercase tracking-wider block mb-2 ${
                      plan.isPopular ? 'text-blue-200' : 'text-slate-500'
                    }`}>
                      WHAT'S INCLUDED:
                    </span>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                          plan.isPopular
                            ? 'bg-white/20 border-white/40 text-[#FEF08A]'
                            : 'bg-emerald-50 border-emerald-300 text-emerald-600'
                        }`}>
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className={`font-display leading-tight ${
                          plan.isPopular ? 'text-blue-50' : 'text-slate-700'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer guarantee / note */}
                <div className={`pt-6 mt-6 border-t font-mono text-[11px] flex items-center justify-between ${
                  plan.isPopular ? 'border-white/20 text-blue-200' : 'border-slate-200 text-slate-500'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Instant Token Verification</span>
                  </span>
                  <Link to="/regulations" className="hover:underline font-bold">
                    Rules &gt;
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
