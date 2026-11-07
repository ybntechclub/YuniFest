export interface FAQItem {
  question: string;
  answer: string;
  category: 'registration' | 'eligibility' | 'logistics' | 'general';
}

export const FEST_FAQS: FAQItem[] = [
  {
    category: "registration",
    question: "What is the registration fee for YUNIFEST 2026?",
    answer: "The entry pass fee is ₹399 for internal YBN University students and ₹499 for visiting college scholars. Complete your registration form, transfer via UPI QR, and submit your UTR ID for desk verification to receive your confirmed digital pass.",
  },
  {
    category: "eligibility",
    question: "Can students from other colleges or universities participate?",
    answer: "Yes! Students from external colleges and universities are warmly welcomed to participate in designated open competitions: Dance Competition, Singing Competition, Quiz Competition, Model Representation, Poster Making, Reel Competition, Mimicry Competition, Stand-up Comedy, Gaming Tournament (Free Fire & BGMI), Creative Craft Workshop, and Face Painting & Tattoo Making. (Note: Treasure Hunting, Food Fest, and Ramp Walk are restricted to YBN University students).",
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
    answer: "Treasure Hunting has a strictly capped capacity of 6 teams (5 members per team, 30 max participants) on a first-come, first-served basis. Once the quota is reached, registrations for this event will automatically close.",
  },
  {
    category: "general",
    question: "How will I receive my confirmation and entry badge?",
    answer: "Upon successful form submission, the portal generates an official Registration Code (e.g. YUNI-2026-XXXX) with a scannable verification QR badge. You can save, screenshot, or print this pass for instant campus check-in.",
  },
  {
    category: "general",
    question: "Who can I contact for registration inquiries, pass verification, or campus help?",
    answer: "You can directly reach our official festival helpline at +91 90312 74903, message us on WhatsApp at 90312 74903, or connect via Instagram @yunifest2026.official. The inquiry desk is active to assist all delegates.",
  },
];
