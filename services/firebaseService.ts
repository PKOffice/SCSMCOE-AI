import { server } from '../server/mockServer';
import { User, Notice } from '../types';

export const firebaseAuth = {
  currentUser: null as User | null,
  
  signIn: async (email: string) => {
    const user = await server.auth.login(email);
    firebaseAuth.currentUser = user;
    localStorage.setItem('scsmcoe_user', JSON.stringify(user));
    return user;
  },
  
  signOut: () => {
    firebaseAuth.currentUser = null;
    localStorage.removeItem('scsmcoe_user');
  },
  
  getCurrentUser: (): User | null => {
    if (!firebaseAuth.currentUser) {
      const saved = localStorage.getItem('scsmcoe_user');
      if (saved) firebaseAuth.currentUser = JSON.parse(saved);
    }
    return firebaseAuth.currentUser;
  }
};

export const notifications = {
  sendEmail: async (email: string, subject: string, body: string) => {
    console.log(`[Email Service] Sent to ${email}: ${subject}`);
    return true;
  }
};

export const firestore = {
  getNotices: () => server.notices.getAll(),
  addNotice: (n: Notice) => server.notices.create(n),
  getJobs: () => server.jobs.getJobs()
};