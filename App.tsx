import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Notices } from './pages/Notices';
import { Career } from './pages/Career';
import { Admin } from './pages/Admin';
import { Auth } from './pages/Auth';
import { Academics } from './pages/Academics';
import { Events } from './pages/Events';
import { Canteen } from './pages/Canteen';
import { Support } from './pages/Support';
import { Sports } from './pages/Sports';
import { firebaseAuth } from './services/firebaseService';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = firebaseAuth.getCurrentUser();
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/notices" element={<ProtectedRoute><Layout><Notices /></Layout></ProtectedRoute>} />
        <Route path="/career" element={<ProtectedRoute><Layout><Career /></Layout></ProtectedRoute>} />
        <Route path="/academics" element={<ProtectedRoute><Layout><Academics /></Layout></ProtectedRoute>} />
        <Route path="/canteen" element={<ProtectedRoute><Layout><Canteen /></Layout></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Layout><Events /></Layout></ProtectedRoute>} />
        <Route path="/sports" element={<ProtectedRoute><Layout><Sports /></Layout></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><Layout><Support /></Layout></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Layout><Admin /></Layout></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;