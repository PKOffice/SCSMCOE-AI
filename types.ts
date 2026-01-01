export enum UserRole {
  STUDENT = 'Student',
  FACULTY = 'Faculty',
  ADMIN = 'Prime Admin',
  MAINTENANCE = 'Staff'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  graduationYear?: number;
  languagePreference?: 'English' | 'Marathi' | 'Hindi';
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  department: string;
  date: string;
  isUrgent: boolean;
  category: 'Academics' | 'Placement' | 'Events' | 'Maintenance';
}

export interface CareerOpportunity {
  id: string;
  company: string;
  role: string;
  type: 'Full-time' | 'Internship';
  sector: 'Mechanical' | 'Civil' | 'CS' | 'E&TC';
  location: string;
  region: 'Domestic' | 'Foreign';
  description: string;
  deadline: string;
}

export interface AlumniMentor {
  id: string;
  name: string;
  company: string;
  location: string;
  batch: number;
  sector: string;
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  title: string;
  category: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  timestamp: string;
}

export interface SportMatch {
  id: string;
  sport: string;
  teamA: string;
  teamB: string;
  score: string;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  venue: string;
}

export interface CanteenItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  availability: boolean;
  preparationTime: string;
}