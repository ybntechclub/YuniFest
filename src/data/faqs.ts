export interface FAQItem {
  question: string;
  answer: string;
  category: 'registration' | 'eligibility' | 'logistics' | 'general';
}

export const FEST_FAQS: FAQItem[] = [
  {
    category: "registration",
    question: "What is the registration fee for YUNIFEST 2026?",
    answer: "Registration is completely ₹0 (Free) for all eligible events in accordance with the official festival brochure. You must submit your registration via this official portal to receive your verified digital pass.",
  },
  {
    category: "eligibility",
    question: "Can students from other colleges or universities participate?",
    answer: "Yes! Students from external colleges and universities are warmly welcomed to participate in designated inter-college competitions: Dance Competition, Singing Competition, Quiz Competition, Poster Making, Reel Competition, Mimicry Competition, Stand-up Comedy, Gaming Tournament (Free Fire & BGMI), and Treasure Hunting.",
  },
  {
    category: "eligibility",
    question: "Is carrying a physical College ID card mandatory?",
    answer: "Yes, without exception. Every registered participant (both YBN University students and visiting college participants) must carry a valid physical institutional ID card at physical security and registration verification desks.",
  },
  {
    category: "registration",
    question: "Can I register for multiple events?",
    answer: "Yes. To ensure data accuracy and avoid scheduling overlaps, please submit one event registration per form submission. You can register for another eligible event immediately afterward using the same participant credentials.",
  },
  {
    category: "logistics",
    question: "Where is the festival venue located?",
    answer: "YUNIFEST 2026 is hosted at the main campus of YBN University, Rajaulatu, Namkum, Ranchi, Jharkhand — 834010, India.",
  },
  {
    category: "registration",
    question: "What is the registration limit for Treasure Hunting?",
    answer: "Treasure Hunting has a strictly capped capacity of 25 team entries on a first-come, first-served basis. Once the quota is reached, registrations for this event will automatically close or transition to a waitlist.",
  },
  {
    category: "general",
    question: "How will I receive my confirmation and entry badge?",
    answer: "Upon successful form submission, the portal generates an official Registration Code (e.g. YUNI-2026-XXXX) with a scannable verification QR badge. You can save, screenshot, or print this pass for instant campus check-in.",
  },
];
