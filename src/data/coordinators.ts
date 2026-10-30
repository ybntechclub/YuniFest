export interface CoordinatorPair {
  id: string;
  event: string;
  studentCoordinator: string;
  studentPhone: string;
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
    studentPhone: "62997 61602",
    facultyCoordinator: "Dr. Sheetal Oraon",
    roleNote: "Solo, Duo & Group Staging",
  },
  {
    id: "singing",
    divisionNumber: 2,
    event: "Singing Competition",
    studentCoordinator: "Varshana Chatterjee",
    studentPhone: "74880 06140",
    facultyCoordinator: "Dr. Madhumati Mam",
    roleNote: "Classical, Bollywood & Acoustic Vocals",
  },
  {
    id: "treasure-hunting",
    divisionNumber: 3,
    event: "Treasure Hunting",
    studentCoordinator: "Agrani Shrivastava",
    studentPhone: "90312 74903",
    facultyCoordinator: "Dr. Sapna Kasari",
    roleNote: "Campus-Wide Expedition & Clue Tracking",
  },
  {
    id: "food-fest",
    divisionNumber: 4,
    event: "Food Fest",
    studentCoordinator: "Meenu Mahato",
    studentPhone: "62969 82899",
    facultyCoordinator: "Dr. Rachna Kumari",
    roleNote: "Student Culinary Stalls & Hospitality",
  },
  {
    id: "gaming",
    divisionNumber: 5,
    event: "Gaming (BGMI & Free Fire)",
    studentCoordinator: "Rounak Dubey",
    studentPhone: "99551 02674",
    facultyCoordinator: "Neha Lakra Mam",
    roleNote: "Tactical LAN Esports & Stream Management",
  },
  {
    id: "mimicry-standup",
    divisionNumber: 6,
    event: "Mimicry & Standup Comedy",
    studentCoordinator: "Astha Kachhap",
    studentPhone: "62044 01267",
    facultyCoordinator: "Abhilasha Mam",
    roleNote: "Theatrical Voice Impressions & Mic Comedy",
  },
  {
    id: "model-poster",
    divisionNumber: 7,
    event: "Model Presentation & Poster Making",
    studentCoordinator: "Aryan Sharma",
    studentPhone: "91536 36142",
    facultyCoordinator: "Dr. Asha Puran Mam",
    roleNote: "Working Technical Models & Visual Advocacy",
  },
  {
    id: "ramp-walk",
    divisionNumber: 8,
    event: "Ramp Walk",
    studentCoordinator: "Megha Kumari",
    studentPhone: "95705 07109",
    facultyCoordinator: "Namrata Mam",
    roleNote: "Haute Couture, Heritage & Runway Direction",
  },
  {
    id: "face-painting",
    divisionNumber: 9,
    event: "Face Painting",
    studentCoordinator: "Shreya Shukla",
    studentPhone: "98355 38299",
    facultyCoordinator: "Mrs. Pinky Kumari",
    roleNote: "Live Body Art & Thematic Expressions",
  },
  {
    id: "craft-workshop",
    divisionNumber: 10,
    event: "Creative craft workshop",
    studentCoordinator: "Sanjana Kumari",
    studentPhone: "81145 19243",
    facultyCoordinator: "Preeti Soni Mam",
    roleNote: "Sustainable Arts & Design Masterclasses",
  },
  {
    id: "quiz",
    divisionNumber: 11,
    event: "Quiz Competition",
    studentCoordinator: "Kamil Hussain",
    studentPhone: "99341 21209",
    facultyCoordinator: "Dr. Subhashish Sinha",
    roleNote: "General Intellect, Tech & Culture Buzzer Battles",
  },
];
