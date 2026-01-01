import { Notice, User, UserRole, CareerOpportunity, Complaint, SportMatch, CanteenItem } from '../types';

class MockDatabase {
  users: User[] = [
    { id: '1', name: 'Admin User', email: 'admin@scsmcoe.ac.in', role: UserRole.ADMIN }
  ];
  
  notices: Notice[] = [
    {
      id: '1',
      title: 'Mid-Sem Exam Schedule (Nepti Campus)',
      content: 'The schedule for all Engineering departments for Oct 2024 is now out.',
      department: 'Exam Cell',
      date: '2026-01-11',
      isUrgent: true,
      category: 'Academics'
    },
    {
      id: '2',
      title: 'TATA Motors Drive - Mechanical/ENTC',
      content: 'Exclusive campus drive for Batch 2025. Pre-register on the portal.',
      department: 'Placement Cell',
      date: '2026-01-21',
      isUrgent: true,
      category: 'Placement'
    }
  ];

  jobs: CareerOpportunity[] = [
    {
      id: 'j1',
      company: 'L&T Construction',
      role: 'Graduate Engineer Trainee',
      type: 'Full-time',
      sector: 'Civil',
      location: 'Pune, India',
      region: 'Domestic',
      description: 'Major infrastructure projects across India.',
      deadline: '2026-01-05'
    },
    {
      id: 'j2',
      company: 'Mercedes-Benz',
      role: 'System Design Engineer',
      type: 'Full-time',
      sector: 'Mechanical',
      location: 'Stuttgart, Germany',
      region: 'Foreign',
      description: 'Work on next-gen EV drivetrains.',
      deadline: '2026-01-15'
    }
  ];

  matches: SportMatch[] = [
    { id: 'm1', sport: 'Cricket', teamA: 'SCSMCOE', teamB: 'COEP', score: '142/4 (18.2)', status: 'LIVE', venue: 'Main Ground' },
    { id: 'm2', sport: 'Football', teamA: 'MECH-A', teamB: 'CIVIL-B', score: '2 - 0', status: 'LIVE', venue: 'South Turf' }
  ];

  canteenItems: CanteenItem[] = [
    { id: 'c1', name: 'Pure Veg Thali', price: 60, category: 'Lunch', description: 'Complete meal', availability: true, preparationTime: '15m' },
    { id: 'c2', name: 'Special Misal Pav', price: 50, category: 'Breakfast', description: 'Spicy maharashtrian breakfast', availability: true, preparationTime: '8m' }
  ];
  
  complaints: Complaint[] = [];
}

export const db = new MockDatabase();

export const server = {
  auth: {
    login: async (email: string) => {
      if (!email.endsWith('@scsmcoe.ac.in')) throw new Error('Invalid college email');
      const user = db.users.find(u => u.email === email);
      if (user) return user;
      return { id: String(Date.now()), name: email.split('@')[0], email, role: UserRole.STUDENT };
    }
  },
  notices: {
    getAll: async () => db.notices,
    create: async (notice: Notice) => { db.notices.unshift(notice); return notice; }
  },
  jobs: {
    getJobs: async () => db.jobs
  },
  sports: {
    getMatches: async () => db.matches
  },
  canteen: {
    getItems: async () => db.canteenItems
  }
};