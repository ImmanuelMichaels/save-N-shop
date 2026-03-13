import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    // ── Replace with real API call when backend is ready ──────────────────
    await new Promise(r => setTimeout(r, 1000));

    const mockUser = {
      name: 'Adebayo Johnson',
      email: email.trim(),
      phone: '+234 801 234 5678',
      location: 'Lagos, Nigeria',
      accountNumber: '0123456789',
      accountType: 'Savings Account',
      balance: 248500.75,
    };
    // ─────────────────────────────────────────────────────────────────────

    setLoading(false);
    onLogin(mockUser);
    navigate('/platform'); // ← goes to the platform dashboard
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                className={`form-input ${error ? 'input-error' : ''}`}
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type={showPw ? 'text' : 'password'}
                className={`form-input ${error ? 'input-error' : ''}`}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button type="button" className="toggle-password" onClick={() => setShowPw(p => !p)}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-primary btn-submit" disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Don't have an account? <Link to="/signup" className="footer-link">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
