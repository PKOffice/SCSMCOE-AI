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