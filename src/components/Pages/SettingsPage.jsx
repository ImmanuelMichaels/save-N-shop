import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ChevronRight, LogOut, User, CreditCard,
  Lock, Bell, Home, ShieldCheck, MessageSquare, Clipboard,
  Moon, Sun, HelpCircle, Trash2, Info, PiggyBank,
  Hash, CheckCircle, Eye, EyeOff, AlertTriangle,
  Smartphone, Monitor, Star, X, Check, ToggleLeft,
  Key, Settings, Palette
} from 'lucide-react';
import './SettingsPage.css';

// ─── Reusable toggle switch ───────────────────────────────────────────────
const Toggle = ({ on, onChange }) => (
  <button
    className={`st-toggle ${on ? 'on' : 'off'}`}
    onClick={() => onChange(!on)}
  >
    <span className="st-toggle-thumb" />
  </button>
);

// ─── Reusable menu row ────────────────────────────────────────────────────
const Row = ({ icon: Icon, color = '#667eea', label, sublabel, onClick, rightEl, danger }) => (
  <button
    className={`pf-menu-row${danger ? ' st-danger-row' : ''}`}
    onClick={onClick}
  >
    <div className="pf-menu-icon" style={{ background: color + '18', color }}>
      <Icon size={19} />
    </div>
    <div className="pf-menu-text">
      <span className="pf-menu-label" style={danger ? { color: '#ef4444' } : {}}>{label}</span>
      {sublabel && <span className="pf-menu-sub">{sublabel}</span>}
    </div>
    <div className="st-row-right">
      {rightEl !== undefined ? rightEl : <ChevronRight size={17} className="pf-menu-chevron" />}
    </div>
  </button>
);

// ─── PIN keypad modal (Change / Create) ───────────────────────────────────
const PinModal = ({ mode, onClose }) => {
  const steps = mode === 'change'
    ? ['Enter Current PIN', 'Enter New PIN', 'Confirm New PIN']
    : ['Enter New PIN', 'Confirm New PIN'];

  const [step, setStep]   = useState(0);
  const [pins, setPins]   = useState(steps.map(() => ''));
  const [err, setErr]     = useState('');
  const [done, setDone]   = useState(false);

  const current = pins[step] ?? '';

  const tap = (val) => {
    setErr('');
    if (val === '⌫') {
      const u = [...pins]; u[step] = current.slice(0, -1); setPins(u);
    } else if (current.length < 4) {
      const u = [...pins]; u[step] = current + val; setPins(u);
    }
  };

  const next = () => {
    if (current.length < 4) { setErr('Enter all 4 digits'); return; }
    if (step === steps.length - 1) {
      const confirmPin = current;
      const newPin = pins[mode === 'change' ? 1 : 0];
      if (confirmPin !== newPin) { setErr('PINs do not match. Try again'); setPins(p => { const u = [...p]; u[step] = ''; return u; }); return; }
      setDone(true);
    } else {
      setStep(s => s + 1);
    }
  };

  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫'];

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#0f0f1a' }}>
          <h2>{mode === 'change' ? 'Change PIN' : 'Create PIN'}</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          {done ? (
            <div className="st-done-screen">
              <div className="st-done-circle"><CheckCircle size={36} color="#10b981" /></div>
              <h3>PIN {mode === 'change' ? 'Changed' : 'Created'}!</h3>
              <p>Your 4-digit transaction PIN has been {mode === 'change' ? 'updated' : 'set'} successfully.</p>
              <button className="pf-modal-cta" style={{ background: '#10b981', marginTop: '1.5rem' }} onClick={onClose}>Done</button>
            </div>
          ) : (
            <>
              {/* Step pills */}
              <div className="st-steps">
                {steps.map((s, i) => (
                  <div key={i} className={`st-step ${i === step ? 'active' : i < step ? 'past' : ''}`}>
                    <div className="st-step-dot">
                      {i < step ? <Check size={11} /> : i + 1}
                    </div>
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              <p className="st-pin-label">{steps[step]}</p>

              {/* PIN dots */}
              <div className="st-pin-dots">
                {[0,1,2,3].map(i => (
                  <div key={i} className={`st-pin-dot ${i < current.length ? 'filled' : ''}`} />
                ))}
              </div>

              {err && <p className="st-err">{err}</p>}

              {/* Keypad */}
              <div className="st-keypad">
                {keys.map((k, i) => (
                  <button
                    key={i}
                    className={`st-key ${k === '' ? 'st-key-blank' : ''} ${k === '⌫' ? 'st-key-del' : ''}`}
                    onClick={() => k && tap(k)}
                    disabled={k === ''}
                  >
                    {k}
                  </button>
                ))}
              </div>

              <button
                className="pf-modal-cta"
                style={{ background: current.length === 4 ? '#667eea' : '#d1d5db', marginTop: '1rem' }}
                onClick={next}
                disabled={current.length < 4}
              >
                {step === steps.length - 1 ? (mode === 'change' ? 'Change PIN' : 'Create PIN') : 'Next'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Payment Settings modal ───────────────────────────────────────────────
const PaymentModal = ({ onClose }) => {
  const [autoDebit, setAutoDebit]     = useState(true);
  const [saveCards, setSaveCards]     = useState(true);
  const [defaultMethod, setDefault]   = useState('bank');

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#10b981' }}>
          <h2>Payment Settings</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          <p className="pf-modal-desc">Manage how you fund and pay on Save 'n' Shop.</p>

          <h4 className="pf-modal-section-title">DEFAULT PAYMENT METHOD</h4>
          {[
            { id: 'bank',  label: 'Bank Transfer',      sub: 'Free · Instant–10 mins' },
            { id: 'card',  label: 'Debit/Credit Card',  sub: '₦50 + 1.5% fee · Instant' },
            { id: 'ussd',  label: 'USSD (*737#)',        sub: 'Free · Any network'      },
          ].map(m => (
            <div key={m.id} className="pf-security-row" style={{ cursor: 'pointer' }} onClick={() => setDefault(m.id)}>
              <div className="pf-menu-text">
                <span className="pf-menu-label">{m.label}</span>
                <span className="pf-menu-sub">{m.sub}</span>
              </div>
              <div className={`st-radio ${defaultMethod === m.id ? 'selected' : ''}`} />
            </div>
          ))}

          <div className="pf-modal-divider" />
          <h4 className="pf-modal-section-title">PREFERENCES</h4>

          <div className="pf-security-row">
            <div className="pf-menu-text">
              <span className="pf-menu-label">Auto-Debit for Savings</span>
              <span className="pf-menu-sub">Auto-fund your wallet on schedule</span>
            </div>
            <Toggle on={autoDebit} onChange={setAutoDebit} />
          </div>
          <div className="pf-security-row">
            <div className="pf-menu-text">
              <span className="pf-menu-label">Save Card Details</span>
              <span className="pf-menu-sub">Securely store cards for faster checkout</span>
            </div>
            <Toggle on={saveCards} onChange={setSaveCards} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Login Settings modal ─────────────────────────────────────────────────
const LoginModal = ({ onClose }) => {
  const [biometric, setBiometric]   = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [timeout, setTimeout_]      = useState('15');

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#8b5cf6' }}>
          <h2>Login Settings</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          <div className="pf-security-row">
            <div className="pf-menu-icon" style={{ background: '#8b5cf618', color: '#8b5cf6' }}>
              <Smartphone size={18} />
            </div>
            <div className="pf-menu-text">
              <span className="pf-menu-label">Biometric Login</span>
              <span className="pf-menu-sub">Fingerprint or Face ID</span>
            </div>
            <Toggle on={biometric} onChange={setBiometric} />
          </div>
          <div className="pf-security-row">
            <div className="pf-menu-icon" style={{ background: '#667eea18', color: '#667eea' }}>
              <Eye size={18} />
            </div>
            <div className="pf-menu-text">
              <span className="pf-menu-label">Remember Me</span>
              <span className="pf-menu-sub">Stay logged in for 30 days</span>
            </div>
            <Toggle on={rememberMe} onChange={setRememberMe} />
          </div>

          <div className="pf-modal-divider" />
          <h4 className="pf-modal-section-title">SESSION TIMEOUT</h4>
          {['5', '15', '30', '60'].map(t => (
            <div key={t} className="pf-security-row" style={{ cursor: 'pointer' }} onClick={() => setTimeout_(t)}>
              <div className="pf-menu-text">
                <span className="pf-menu-label">{t} minutes of inactivity</span>
              </div>
              <div className={`st-radio ${timeout === t ? 'selected' : ''}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Savings Settings modal ───────────────────────────────────────────────
const SavingsModal = ({ onClose }) => {
  const [autoSave, setAutoSave]       = useState(true);
  const [lockAlert, setLockAlert]     = useState(true);
  const [frequency, setFrequency]     = useState('weekly');
  const [goalAmount, setGoalAmount]   = useState('100000');

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#f59e0b' }}>
          <h2>Savings Settings</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          <div className="pf-security-row">
            <div className="pf-menu-text">
              <span className="pf-menu-label">Auto-Save</span>
              <span className="pf-menu-sub">Automatically fund your savings on schedule</span>
            </div>
            <Toggle on={autoSave} onChange={setAutoSave} />
          </div>
          <div className="pf-security-row">
            <div className="pf-menu-text">
              <span className="pf-menu-label">Lock Reminder Alerts</span>
              <span className="pf-menu-sub">Notify me before savings lock expires</span>
            </div>
            <Toggle on={lockAlert} onChange={setLockAlert} />
          </div>

          <div className="pf-modal-divider" />
          <h4 className="pf-modal-section-title">AUTO-SAVE FREQUENCY</h4>
          {['daily', 'weekly', 'monthly'].map(f => (
            <div key={f} className="pf-security-row" style={{ cursor: 'pointer' }} onClick={() => setFrequency(f)}>
              <div className="pf-menu-text">
                <span className="pf-menu-label" style={{ textTransform: 'capitalize' }}>{f}</span>
              </div>
              <div className={`st-radio ${frequency === f ? 'selected' : ''}`} />
            </div>
          ))}

          <div className="pf-modal-divider" />
          <h4 className="pf-modal-section-title">SAVINGS GOAL</h4>
          <div className="st-input-wrap">
            <span className="st-naira">₦</span>
            <input
              type="number"
              className="st-input"
              value={goalAmount}
              onChange={e => setGoalAmount(e.target.value)}
              placeholder="Enter target amount"
            />
          </div>
          <button className="pf-modal-cta" style={{ background: '#f59e0b', marginTop: '1.25rem' }} onClick={onClose}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Homepage Settings modal ──────────────────────────────────────────────
const HomepageModal = ({ onClose }) => {
  const [widgets, setWidgets] = useState({
    balance:      true,
    quickActions: true,
    transactions: true,
    savingsBuckets: true,
    analytics:    false,
    stockList:    false,
  });

  const labels = {
    balance: 'Balance Card',
    quickActions: 'Quick Actions',
    transactions: 'Recent Transactions',
    savingsBuckets: 'Savings Buckets',
    analytics: 'Analytics Chart',
    stockList: 'Stock List Preview',
  };

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#06b6d4' }}>
          <h2>Homepage Settings</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          <p className="pf-modal-desc">Choose which widgets appear on your dashboard homepage.</p>
          {Object.entries(widgets).map(([key, val]) => (
            <div key={key} className="pf-security-row">
              <div className="pf-menu-text">
                <span className="pf-menu-label">{labels[key]}</span>
              </div>
              <Toggle on={val} onChange={v => setWidgets(w => ({ ...w, [key]: v }))} />
            </div>
          ))}
          <button className="pf-modal-cta" style={{ background: '#06b6d4', marginTop: '1.25rem' }} onClick={onClose}>
            Save Layout
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Security Questions modal ─────────────────────────────────────────────
const SecurityQModal = ({ onClose }) => {
  const questions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What city were you born in?",
    "What is your oldest sibling's middle name?",
    "What was the make of your first car?",
  ];
  const [q1, setQ1] = useState(questions[0]);
  const [a1, setA1] = useState('');
  const [q2, setQ2] = useState(questions[2]);
  const [a2, setA2] = useState('');
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (!a1.trim() || !a2.trim()) return;
    setSaved(true);
  };

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#ef4444' }}>
          <h2>Security Questions</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          {saved ? (
            <div className="st-done-screen">
              <div className="st-done-circle"><CheckCircle size={36} color="#10b981" /></div>
              <h3>Questions Saved!</h3>
              <p>Your security questions have been set successfully.</p>
              <button className="pf-modal-cta" style={{ background: '#10b981', marginTop: '1.5rem' }} onClick={onClose}>Done</button>
            </div>
          ) : (
            <>
              <p className="pf-modal-desc">Set two security questions used to verify your identity if you ever forget your password.</p>

              <h4 className="pf-modal-section-title">QUESTION 1</h4>
              <select className="st-select" value={q1} onChange={e => setQ1(e.target.value)}>
                {questions.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
              <input className="st-input st-input-full" placeholder="Your answer" value={a1} onChange={e => setA1(e.target.value)} />

              <h4 className="pf-modal-section-title" style={{ marginTop: '1.25rem' }}>QUESTION 2</h4>
              <select className="st-select" value={q2} onChange={e => setQ2(e.target.value)}>
                {questions.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
              <input className="st-input st-input-full" placeholder="Your answer" value={a2} onChange={e => setA2(e.target.value)} />

              <button
                className="pf-modal-cta"
                style={{ background: a1.trim() && a2.trim() ? '#ef4444' : '#d1d5db', marginTop: '1.25rem' }}
                onClick={save}
                disabled={!a1.trim() || !a2.trim()}
              >
                Save Questions
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── SMS Alert Settings modal ─────────────────────────────────────────────
const SmsModal = ({ onClose }) => {
  const [alerts, setAlerts] = useState({
    transactions: true,
    loginActivity: true,
    savingsLock: true,
    promotions: false,
    conversion: true,
    delivery: true,
  });

  const labels = {
    transactions: 'Transaction Alerts',
    loginActivity: 'Login Activity',
    savingsLock: 'Savings Lock/Unlock',
    promotions: 'Promotions & Offers',
    conversion: 'Stock Conversion',
    delivery: 'Delivery Updates',
  };

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#667eea' }}>
          <h2>SMS Alert Settings</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          <p className="pf-modal-desc">Choose which events send you an SMS to +234 801 234 5678.</p>
          {Object.entries(alerts).map(([key, val]) => (
            <div key={key} className="pf-security-row">
              <div className="pf-menu-text">
                <span className="pf-menu-label">{labels[key]}</span>
              </div>
              <Toggle on={val} onChange={v => setAlerts(a => ({ ...a, [key]: v }))} />
            </div>
          ))}
          <button className="pf-modal-cta" style={{ background: '#667eea', marginTop: '1.25rem' }} onClick={onClose}>
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Themes modal ─────────────────────────────────────────────────────────
const ThemeModal = ({ onClose }) => {
  const [theme, setTheme] = useState('light');
  const [accent, setAccent] = useState('#667eea');

  const themes = [
    { id: 'light',  label: 'Light',  icon: Sun  },
    { id: 'dark',   label: 'Dark',   icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  const accents = ['#667eea','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)' }}>
          <h2>Themes</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          <h4 className="pf-modal-section-title">APP APPEARANCE</h4>
          <div className="st-theme-grid">
            {themes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`st-theme-card ${theme === id ? 'active' : ''}`}
                onClick={() => setTheme(id)}
              >
                <Icon size={24} color={theme === id ? '#667eea' : '#9ca3af'} />
                <span>{label}</span>
                {theme === id && <div className="st-theme-check"><Check size={10} /></div>}
              </button>
            ))}
          </div>

          <div className="pf-modal-divider" />
          <h4 className="pf-modal-section-title">ACCENT COLOUR</h4>
          <div className="st-accent-row">
            {accents.map(c => (
              <button
                key={c}
                className={`st-accent-dot ${accent === c ? 'active' : ''}`}
                style={{ background: c }}
                onClick={() => setAccent(c)}
              >
                {accent === c && <Check size={12} color="#fff" />}
              </button>
            ))}
          </div>

          <button className="pf-modal-cta" style={{ background: accent, marginTop: '1.5rem' }} onClick={onClose}>
            Apply Theme
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Security Center modal ────────────────────────────────────────────────
const SecurityCenterModal = ({ onClose }) => {
  const items = [
    { label: 'Change Password',       sub: 'Last changed 3 months ago',   icon: Key,         color: '#667eea', status: 'done'   },
    { label: 'Transaction PIN',       sub: '4-digit PIN active',          icon: Hash,        color: '#8b5cf6', status: 'done'   },
    { label: 'Biometric Login',       sub: 'Fingerprint / Face ID',       icon: Smartphone,  color: '#10b981', status: 'setup'  },
    { label: 'Two-Factor Auth (2FA)', sub: 'Extra login protection',      icon: ShieldCheck, color: '#f59e0b', status: 'setup'  },
    { label: 'Security Questions',    sub: 'Identity recovery backup',    icon: HelpCircle,  color: '#ef4444', status: 'setup'  },
    { label: 'Active Sessions',       sub: '1 device logged in',          icon: Monitor,     color: '#06b6d4', status: 'arrow'  },
  ];

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#0f0f1a' }}>
          <h2>Security Centre</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          <div className="st-score-bar">
            <div className="st-score-info">
              <span>Security Score</span>
              <strong style={{ color: '#f59e0b' }}>Medium — 60%</strong>
            </div>
            <div className="st-score-track">
              <div className="st-score-fill" style={{ width: '60%', background: '#f59e0b' }} />
            </div>
            <p className="st-score-tip">Set up biometrics and 2FA to reach High.</p>
          </div>

          <div className="pf-modal-divider" />

          {items.map(({ label, sub, icon: Icon, color, status }) => (
            <div key={label} className="pf-security-row">
              <div className="pf-menu-icon" style={{ background: color + '18', color }}>
                <Icon size={18} />
              </div>
              <div className="pf-menu-text">
                <span className="pf-menu-label">{label}</span>
                <span className="pf-menu-sub">{sub}</span>
              </div>
              {status === 'done'  && <CheckCircle size={18} color="#10b981" />}
              {status === 'setup' && <span className="pf-setup-tag">Set up</span>}
              {status === 'arrow' && <ChevronRight size={16} color="#9ca3af" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Feedback modal ───────────────────────────────────────────────────────
const FeedbackModal = ({ onClose }) => {
  const [type, setType]       = useState('suggestion');
  const [msg, setMsg]         = useState('');
  const [rating, setRating]   = useState(0);
  const [hover, setHover]     = useState(0);
  const [sent, setSent]       = useState(false);

  const submit = () => { if (msg.trim()) setSent(true); };

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#667eea' }}>
          <h2>Feedback & Suggestions</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          {sent ? (
            <div className="st-done-screen">
              <div className="st-done-circle"><CheckCircle size={36} color="#10b981" /></div>
              <h3>Thank you! 🙏</h3>
              <p>Your feedback has been sent to our team. We read everything!</p>
              <button className="pf-modal-cta" style={{ background: '#667eea', marginTop: '1.5rem' }} onClick={onClose}>Done</button>
            </div>
          ) : (
            <>
              <h4 className="pf-modal-section-title">TYPE</h4>
              <div className="st-type-tabs">
                {['suggestion', 'bug', 'complaint', 'compliment'].map(t => (
                  <button
                    key={t}
                    className={`st-type-tab ${type === t ? 'active' : ''}`}
                    onClick={() => setType(t)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              <h4 className="pf-modal-section-title" style={{ marginTop: '1.25rem' }}>RATE YOUR EXPERIENCE</h4>
              <div className="pf-stars">
                {[1,2,3,4,5].map(n => (
                  <button
                    key={n}
                    className={`pf-star ${(hover || rating) >= n ? 'active' : ''}`}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(n)}
                  >★</button>
                ))}
              </div>

              <h4 className="pf-modal-section-title" style={{ marginTop: '1rem' }}>YOUR MESSAGE</h4>
              <textarea
                className="pf-rate-comment"
                placeholder="Tell us what's on your mind…"
                rows={4}
                value={msg}
                onChange={e => setMsg(e.target.value)}
              />

              <button
                className="pf-modal-cta"
                style={{ background: msg.trim() ? '#667eea' : '#d1d5db' }}
                onClick={submit}
                disabled={!msg.trim()}
              >
                Send Feedback
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── About modal ──────────────────────────────────────────────────────────
const AboutModal = ({ onClose }) => (
  <div className="pf-modal-overlay" onClick={onClose}>
    <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
      <div className="pf-modal-header" style={{ background: 'linear-gradient(135deg, #1a1a2e, #0f3460)' }}>
        <h2>About Save 'n' Shop</h2>
        <button className="pf-modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="pf-modal-body">
        <div className="st-about-logo">💰</div>
        <h3 className="st-about-name">Save 'n' Shop</h3>
        <p className="st-about-version">Version 1.0.0 · Build 20251215</p>

        <div className="pf-modal-divider" />

        {[
          { label: 'App Version',    value: '1.0.0'         },
          { label: 'Build Number',   value: '20251215'      },
          { label: 'Platform',       value: 'Web / Mobile'  },
          { label: 'Developer',      value: 'Save n Shop Ltd' },
          { label: 'Support Email',  value: 'help@savenshop.ng' },
          { label: 'Privacy Policy', value: 'View →'        },
          { label: 'Terms of Use',   value: 'View →'        },
          { label: 'Licences',       value: 'Open Source →' },
        ].map(({ label, value }) => (
          <div key={label} className="pf-security-row">
            <div className="pf-menu-text">
              <span className="pf-menu-label">{label}</span>
            </div>
            <span className="st-about-val">{value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Close Account modal ──────────────────────────────────────────────────
const CloseAccountModal = ({ onClose, onLogout }) => {
  const [step, setStep]     = useState(1);
  const [reason, setReason] = useState('');
  const [confirm, setConfirm] = useState('');
  const WORD = 'DELETE';

  const reasons = [
    'I no longer need this account',
    'I have a duplicate account',
    'I have privacy concerns',
    'The service does not meet my needs',
    'Other',
  ];

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#ef4444' }}>
          <h2>Close Account</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          {step === 1 && (
            <>
              <div className="st-warning-box">
                <AlertTriangle size={20} color="#ef4444" />
                <div>
                  <strong>This action is permanent</strong>
                  <p>Closing your account will delete all your data, savings history, and linked cards. Any locked savings will be forfeited.</p>
                </div>
              </div>

              <h4 className="pf-modal-section-title" style={{ marginTop: '1.25rem' }}>REASON FOR CLOSING</h4>
              {reasons.map(r => (
                <div key={r} className="pf-security-row" style={{ cursor: 'pointer' }} onClick={() => setReason(r)}>
                  <div className="pf-menu-text">
                    <span className="pf-menu-label">{r}</span>
                  </div>
                  <div className={`st-radio ${reason === r ? 'selected' : ''}`} />
                </div>
              ))}

              <button
                className="pf-modal-cta"
                style={{ background: reason ? '#ef4444' : '#d1d5db', marginTop: '1.25rem' }}
                disabled={!reason}
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="pf-modal-desc">
                To confirm, type <strong style={{ color: '#ef4444' }}>{WORD}</strong> in the box below.
              </p>
              <input
                className="st-input st-input-full"
                placeholder={`Type ${WORD} to confirm`}
                value={confirm}
                onChange={e => setConfirm(e.target.value.toUpperCase())}
              />
              <button
                className="pf-modal-cta"
                style={{ background: confirm === WORD ? '#ef4444' : '#d1d5db', marginTop: '1rem' }}
                disabled={confirm !== WORD}
                onClick={() => { onLogout && onLogout(); onClose(); }}
              >
                Permanently Close Account
              </button>
              <button className="st-cancel-link" onClick={() => setStep(1)}>← Go back</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Sign Out confirmation ────────────────────────────────────────────────
const SignOutModal = ({ onClose, onLogout }) => {
  const navigate = useNavigate();

  const confirm = () => {
    onLogout && onLogout();
    navigate('/login');
  };

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#0f0f1a' }}>
          <h2>Sign Out</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body st-signout-body">
          <div className="st-done-circle" style={{ background: '#fee2e2' }}>
            <LogOut size={28} color="#ef4444" />
          </div>
          <h3>Sign out of Save 'n' Shop?</h3>
          <p>You'll need to log back in to access your account.</p>
          <div className="st-signout-btns">
            <button className="st-cancel-btn" onClick={onClose}>Cancel</button>
            <button className="st-confirm-btn" onClick={confirm}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Settings Page ───────────────────────────────────────────────────
const SettingsPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [modal, setModal]             = useState(null);
  const [clipboardAccess, setClipboard] = useState(true);

  const u = user || { name: 'Adebayo Johnson', email: 'adebayo.j@email.com' };

  const open  = (key) => setModal(key);
  const close = () => setModal(null);

  return (
    <div className="pf-root">

      {/* ── Topbar ────────────────────────────────────────────── */}
      <header className="pf-topbar">
        <button className="pf-back-btn" onClick={() => navigate('/platform')}>
          <ArrowLeft size={20} /> <span>Back</span>
        </button>
        <h1 className="pf-topbar-title">Settings</h1>
        <div style={{ width: 36 }} />
      </header>

      <div className="pf-scroll">

        {/* ── User mini-card ──────────────────────────────────── */}
        <div className="st-user-card">
          <div className="st-user-avatar">
            {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="st-user-name">{u.name}</p>
            <p className="st-user-email">{u.email}</p>
          </div>
        </div>

        {/* ════════ SECTION 1 — ACCOUNT ════════════════════════ */}
        <div className="pf-menu-section">
          <p className="pf-section-label">ACCOUNT</p>

          <Row icon={Hash}      color="#667eea" label="Change PIN"       sublabel="Update your 4-digit transaction PIN"      onClick={() => open('changePin')} />
          <Row icon={Key}       color="#8b5cf6" label="Create PIN"       sublabel="Set a new PIN if you don't have one"      onClick={() => open('createPin')} />
          <Row icon={User}      color="#10b981" label="My Profile"       sublabel="Edit personal info, BVN & tiers"          onClick={() => navigate('/profile')} />
          <Row icon={CreditCard}color="#f59e0b" label="Payment Settings" sublabel="Default method, auto-debit & saved cards"  onClick={() => open('payment')} />
          <Row icon={Lock}      color="#0f3460" label="Login Settings"   sublabel="Biometrics, session & remember me"        onClick={() => open('login')} />
          <Row icon={PiggyBank} color="#06b6d4" label="Savings Settings" sublabel="Auto-save, goal amount & frequency"       onClick={() => open('savings')} />
        </div>

        {/* ════════ SECTION 2 — PREFERENCES ═══════════════════ */}
        <div className="pf-menu-section">
          <p className="pf-section-label">PREFERENCES</p>

          <Row icon={Home}         color="#667eea" label="Homepage Settings"    sublabel="Show or hide dashboard widgets"         onClick={() => open('homepage')} />
          <Row icon={HelpCircle}   color="#ef4444" label="Security Questions"   sublabel="Set identity recovery questions"        onClick={() => open('securityQ')} />
          <Row icon={Bell}         color="#f59e0b" label="SMS Alert Settings"   sublabel="Control which events send you an SMS"   onClick={() => open('sms')} />
          <Row
            icon={Clipboard}
            color="#8b5cf6"
            label="Access to Clipboard"
            sublabel={clipboardAccess ? 'App can read your clipboard' : 'Clipboard access off'}
            rightEl={<Toggle on={clipboardAccess} onChange={setClipboard} />}
          />
          <Row icon={Palette}      color="#06b6d4" label="Themes"               sublabel="Light, dark or system · Accent colour" onClick={() => open('theme')} />
        </div>

        {/* ════════ SECTION 3 — SECURITY & LEGAL ══════════════ */}
        <div className="pf-menu-section">
          <p className="pf-section-label">SECURITY & LEGAL</p>

          <Row icon={ShieldCheck}  color="#10b981" label="Security Centre"        sublabel="Score, 2FA, sessions & biometrics"  onClick={() => open('security')} />
          <Row icon={MessageSquare}color="#667eea" label="Feedback & Suggestions" sublabel="Tell us what you think"             onClick={() => open('feedback')} />
          <Row icon={Info}         color="#0f3460" label="About"                  sublabel="App version, policies & licences"   onClick={() => open('about')} />
          <Row icon={Trash2}       color="#ef4444" label="Close Account"          sublabel="Permanently delete your account"    onClick={() => open('close')} danger />
        </div>

        {/* ════════ SIGN OUT ════════════════════════════════════ */}
        <div className="pf-menu-section">
          <button className="pf-menu-row st-signout-row" onClick={() => open('signout')}>
            <div className="pf-menu-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
              <LogOut size={20} />
            </div>
            <div className="pf-menu-text">
              <span className="pf-menu-label" style={{ color: '#ef4444' }}>Sign Out</span>
              <span className="pf-menu-sub">Securely log out of your account</span>
            </div>
          </button>
        </div>

        <p className="pf-version">Save 'n' Shop v1.0.0 · © 2025 Save n Shop Ltd</p>
      </div>

      {/* ── Modals ────────────────────────────────────────────── */}
      {modal === 'changePin'  && <PinModal              mode="change"  onClose={close} />}
      {modal === 'createPin'  && <PinModal              mode="create"  onClose={close} />}
      {modal === 'payment'    && <PaymentModal                         onClose={close} />}
      {modal === 'login'      && <LoginModal                           onClose={close} />}
      {modal === 'savings'    && <SavingsModal                         onClose={close} />}
      {modal === 'homepage'   && <HomepageModal                        onClose={close} />}
      {modal === 'securityQ'  && <SecurityQModal                       onClose={close} />}
      {modal === 'sms'        && <SmsModal                             onClose={close} />}
      {modal === 'theme'      && <ThemeModal                           onClose={close} />}
      {modal === 'security'   && <SecurityCenterModal                  onClose={close} />}
      {modal === 'feedback'   && <FeedbackModal                        onClose={close} />}
      {modal === 'about'      && <AboutModal                           onClose={close} />}
      {modal === 'close'      && <CloseAccountModal   onLogout={onLogout} onClose={close} />}
      {modal === 'signout'    && <SignOutModal         onLogout={onLogout} onClose={close} />}
    </div>
  );
};

export default SettingsPage;
