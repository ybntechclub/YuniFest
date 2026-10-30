export interface CoordinatorPair {
  id: string;
  event: string;
  studentCoordinator: string;
  facultyCoordinator: string;
  divisionNumber: number;
  roleNote?: string;
}

export const OFFICIAL_COORDINATORS: CoordinatorPair[] = [
  {
    id: "dance",
    divisionNumber: 1,
    event: "Dance Competition",
    studentCoordinator: "Antara Chakraborty",
    facultyCoordinator: "Dr. Sheetal Oraon",
    roleNote: "Solo, Duo & Group Staging",
  },
  {
    id: "singing",
    divisionNumber: 2,
    event: "Singing Competition",
    studentCoordinator: "Varshana Chatterjee",
    facultyCoordinator: "Dr. Madhumati Mam",
    roleNote: "Classical, Bollywood & Acoustic Vocals",
  },
  {
    id: "treasure-hunting",
    divisionNumber: 3,
    event: "Treasure Hunting",
    studentCoordinator: "Agrani Sriwastava",
    facultyCoordinator: "Dr. Sapna Kasari",
    roleNote: "Campus-Wide Expedition & Clue Tracking",
  },
  {
    id: "food-fest",
    divisionNumber: 4,
    event: "Food Fest",
    studentCoordinator: "Meenu Mahto",
    facultyCoordinator: "Dr. Rachna Kumari",
    roleNote: "Student Culinary Stalls & Hospitality",
  },
  {
    id: "gaming",
    divisionNumber: 5,
    event: "Gaming (BGMI & Free Fire)",
    studentCoordinator: "Rounak Dubey",
    facultyCoordinator: "Neha Lakra Mam",
    roleNote: "Tactical LAN Esports & Stream Management",
  },
  {
    id: "mimicry-standup",
    divisionNumber: 6,
    event: "Mimicry & Standup Comedy",
    studentCoordinator: "Astha Kachhap",
    facultyCoordinator: "Abhilasha Mam",
    roleNote: "Theatrical Voice Impressions & Mic Comedy",
  },
  {
    id: "model-poster",
    divisionNumber: 7,
    event: "Model Presentation & Poster Making",
    studentCoordinator: "Aryan Sharma",
    facultyCoordinator: "Dr. Asha Puran Mam",
    roleNote: "Working Technical Models & Visual Advocacy",
  },
  {
    id: "ramp-walk",
    divisionNumber: 8,
    event: "Ramp Walk",
    studentCoordinator: "Megha Kumari",
    facultyCoordinator: "Namrata Mam",
    roleNote: "Haute Couture, Heritage & Runway Direction",
  },
  {
    id: "face-painting",
    divisionNumber: 9,
    event: "Face Painting",
    studentCoordinator: "Shreya Shukla",
    facultyCoordinator: "Mrs. Pinky Kumari",
    roleNote: "Live Body Art & Thematic Expressions",
  },
  {
    id: "craft-workshop",
    divisionNumber: 10,
    event: "Creative craft workshop",
    studentCoordinator: "Sanjana Kumari",
    facultyCoordinator: "Preeti Soni Mam",
    roleNote: "Sustainable Arts & Design Masterclasses",
  },
  {
    id: "quiz",
    divisionNumber: 11,
    event: "Quiz Competition",
    studentCoordinator: "Kamil husan",
    facultyCoordinator: "Dr. Subhashish Sinha",
    roleNote: "General Intellect, Tech & Culture Buzzer Battles",
  },
];
