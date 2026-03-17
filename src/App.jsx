import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import PlatformNavbar from './components/Pages/PlatformNavbar';
import Dashboard from './components/Pages/Dashboard';
import ProfilePage from './components/Pages/ProfilePage'; 
import SettingsPage from './components/Pages/SettingsPage';
import './App.css';

// ── Shared notifications live here so both pages see the same data ──────────
const INITIAL_NOTIFICATIONS = [
  { id: 1, message: "Your ₦15,000 savings has been locked", priority: "high",   time: "2h ago", read: false },
  { id: 2, message: "Stock conversion available for December", priority: "medium", time: "5h ago", read: false },
  { id: 3, message: "Reminder: Weekly auto-save tomorrow",   priority: "low",    time: "1d ago", read: false },
];

const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fintech_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Shared notification state — passed to BOTH PlatformNavbar and Dashboard
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const markOneRead = (id) =>
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const handleLogin = (userData) => {
    localStorage.setItem('fintech_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('fintech_user');
    setUser(null);
  };

  const notificationProps = { notifications, unreadCount, markAllRead, markOneRead };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />

        <Route path="/signup" element={
          user ? <Navigate to="/platform" replace /> : <><Navbar /><SignUp /><Footer /></>
        } />

        <Route path="/login" element={
          user
            ? <Navigate to="/platform" replace />
            : <><Navbar /><Login onLogin={handleLogin} /><Footer /></>
        } />

        {/* Platform — main app, receives shared notifications */}
        <Route path="/platform/*" element={
          <ProtectedRoute user={user}>
            <PlatformNavbar user={user} onLogout={handleLogout} {...notificationProps} />
          </ProtectedRoute>
        } />

        {/* Dashboard — history page, receives SAME shared notifications */}
        <Route path="/dashboard" element={
          <ProtectedRoute user={user}>
            <Dashboard user={user} onLogout={handleLogout} {...notificationProps} />
          </ProtectedRoute>
        } />
        
         {/* User profile page */}
        <Route path="/profile" element={
          <ProtectedRoute user={user}>
            <ProfilePage user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />

        {/* Settings page */}
        <Route path="/settings" element={
          <ProtectedRoute user={user}>
            <SettingsPage user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to={user ? "/platform" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
