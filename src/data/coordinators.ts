export interface CoordinatorPair {
  id: string;
  event: string;
  studentCoordinator: string;
  facultyCoordinator: string;
  roleNote?: string;
}

export const OFFICIAL_COORDINATORS: CoordinatorPair[] = [
  {
    id: "dance",
    event: "Dance Competition",
    studentCoordinator: "Antara Chakraborty",
    facultyCoordinator: "Sheetal Sir",
  },
  {
    id: "singing",
    event: "Singing Competition",
    studentCoordinator: "Varshana Chatterjee",
    facultyCoordinator: "Dr. Madhumati Mam",
  },
  {
    id: "treasure-hunting",
    event: "Treasure Hunting",
    studentCoordinator: "Agrani Shrivastava",
    facultyCoordinator: "Dr. Sapna Kasari",
  },
  {
    id: "food-stall",
    event: "Food Stall & Flea Market",
    studentCoordinator: "Meenu Mahato",
    facultyCoordinator: "Dr. Rachna Kumari",
  },
  {
    id: "gaming",
    event: "Gaming Tournament (Free Fire & BGMI)",
    studentCoordinator: "Rounak Dubey",
    facultyCoordinator: "Neha Lakra Mam",
  },
  {
    id: "mimicry-standup",
    event: "Mimicry & Stand-up Comedy",
    studentCoordinator: "Astha Kachhap",
    facultyCoordinator: "Abhilasha Mam",
  },
  {
    id: "model-poster",
    event: "Model Presentation & Poster Making",
    studentCoordinator: "Aryan Sharma",
    facultyCoordinator: "Dr. Asha Puran Mam",
  },
  {
    id: "ramp-walk",
    event: "Ramp Walk / Fashion Show",
    studentCoordinator: "Megha Kumari",
    facultyCoordinator: "Namrata Mam",
  },
  {
    id: "face-painting",
    event: "Face Painting Competition",
    studentCoordinator: "Anmol Kumar",
    facultyCoordinator: "Dr. Chinnmaya Mam",
  },
];
