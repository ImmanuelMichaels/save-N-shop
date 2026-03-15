import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Eye, EyeOff, ChevronRight, History,
  ShieldCheck, CreditCard, HeadphonesIcon, Gift,
  Star, Phone, LogOut, Bell, CheckCircle, Lock,
  AlertTriangle, User, Copy, Check, Hash,
  Smartphone, Wifi
} from 'lucide-react';
import './ProfilePage.css';

// ── Tier configuration ─────────────────────────────────────────────────────
const TIERS = [
  {
    level: 1,
    name: 'Tier 1',
    label: 'Basic',
    color: '#f59e0b',
    bg: '#fffbeb',
    border: '#fde68a',
    limit: '₦50,000 / day',
    description: 'Limited transactions. Good for getting started.',
    verified: true,
    requirement: 'NIN Verification',
    requirementIcon: Smartphone,
    perks: ['₦50,000 daily limit', 'Basic transfers', 'Airtime & Data'],
    action: 'Verified',
  },
  {
    level: 2,
    name: 'Tier 2',
    label: 'Standard',
    color: '#667eea',
    bg: '#f0f4ff',
    border: '#c7d2fe',
    limit: '₦200,000 / day',
    description: 'Higher limits unlocked after BVN verification.',
    verified: false,
    requirement: 'BVN Verification',
    requirementIcon: ShieldCheck,
    perks: ['₦200,000 daily limit', 'International transfers', 'Investment access'],
    action: 'Verify BVN',
  },
  {
    level: 3,
    name: 'Tier 3',
    label: 'Premium',
    color: '#10b981',
    bg: '#f0fdf4',
    border: '#a7f3d0',
    limit: 'Unlimited',
    description: 'Unlimited transactions with full KYC complete.',
    verified: false,
    requirement: 'Utility Bill Upload',
    requirementIcon: Wifi,
    perks: ['Unlimited transactions', 'Priority support', 'Exclusive cashback'],
    action: 'Upload Utility Bill',
  },
];

const LINKED_ACCOUNTS = [
  { id: 1, bank: 'Zenith Bank',    number: '•••• •••• 4521', type: 'Savings',  logo: 'ZB', color: '#dc2626' },
  { id: 2, bank: 'GTBank',         number: '•••• •••• 8832', type: 'Current',  logo: 'GT', color: '#f59e0b' },
];

const LINKED_CARDS = [
  { id: 1, brand: 'Visa',       number: '•••• •••• •••• 3412', expiry: '08/27', color: ['#1a1a2e', '#16213e'] },
  { id: 2, brand: 'Mastercard', number: '•••• •••• •••• 9087', expiry: '03/26', color: ['#667eea', '#764ba2'] },
];

const USSD_CODE = '*737*50#';

// ── Reusable menu row ──────────────────────────────────────────────────────
const MenuRow = ({ icon: Icon, label, sublabel, color = '#667eea', onClick, badge }) => (
  <button className="pf-menu-row" onClick={onClick}>
    <div className="pf-menu-icon" style={{ background: color + '18', color }}>
      <Icon size={20} />
    </div>
    <div className="pf-menu-text">
      <span className="pf-menu-label">{label}</span>
      {sublabel && <span className="pf-menu-sub">{sublabel}</span>}
    </div>
    {badge && <span className="pf-menu-badge">{badge}</span>}
    <ChevronRight size={18} className="pf-menu-chevron" />
  </button>
);

// ── Modals ────────────────────────────────────────────────────────────────
const TierModal = ({ tier, onClose }) => (
  <div className="pf-modal-overlay" onClick={onClose}>
    <div className="pf-modal" onClick={e => e.stopPropagation()}>
      <div className="pf-modal-header" style={{ background: tier.color }}>
        <h2>{tier.name} — {tier.label}</h2>
        <button className="pf-modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="pf-modal-body">
        <p className="pf-modal-desc">{tier.description}</p>

        <div className="pf-modal-limit">
          <span>Daily Limit</span>
          <strong style={{ color: tier.color }}>{tier.limit}</strong>
        </div>

        <h4>What you get</h4>
        <ul className="pf-tier-perks">
          {tier.perks.map(p => (
            <li key={p}><CheckCircle size={15} style={{ color: tier.color }} /> {p}</li>
          ))}
        </ul>

        {!tier.verified && (
          <>
            <div className="pf-modal-divider" />
            <div className="pf-modal-requirement">
              <tier.requirementIcon size={20} style={{ color: tier.color }} />
              <div>
                <p>To unlock {tier.name}</p>
                <strong>{tier.requirement}</strong>
              </div>
            </div>
            <button className="pf-modal-cta" style={{ background: tier.color }}>
              {tier.action}
            </button>
          </>
        )}
        {tier.verified && (
          <div className="pf-verified-badge">
            <CheckCircle size={18} /> Tier verified
          </div>
        )}
      </div>
    </div>
  </div>
);

const SecurityModal = ({ onClose }) => {
  const items = [
    { label: 'Change Password',       sub: 'Last changed 3 months ago',   icon: Lock,       color: '#667eea', done: true  },
    { label: 'Transaction PIN',       sub: '4-digit PIN for transfers',    icon: Hash,       color: '#8b5cf6', done: true  },
    { label: 'Biometric Login',       sub: 'Fingerprint / Face ID',        icon: ShieldCheck,color: '#10b981', done: false },
    { label: 'Two-Factor Auth (2FA)', sub: 'Extra login protection',       icon: Smartphone, color: '#f59e0b', done: false },
    { label: 'Login Activity',        sub: 'See recent login sessions',    icon: History,    color: '#ef4444', done: null  },
  ];

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#0f0f1a' }}>
          <h2>Security Centre</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          {items.map(({ label, sub, icon: Icon, color, done }) => (
            <div key={label} className="pf-security-row">
              <div className="pf-menu-icon" style={{ background: color + '18', color }}>
                <Icon size={18} />
              </div>
              <div className="pf-menu-text">
                <span className="pf-menu-label">{label}</span>
                <span className="pf-menu-sub">{sub}</span>
              </div>
              {done === true  && <CheckCircle size={18} color="#10b981" />}
              {done === false && <span className="pf-setup-tag">Set up</span>}
              {done === null  && <ChevronRight size={16} color="#9ca3af" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CareModal = ({ onClose }) => (
  <div className="pf-modal-overlay" onClick={onClose}>
    <div className="pf-modal" onClick={e => e.stopPropagation()}>
      <div className="pf-modal-header" style={{ background: '#667eea' }}>
        <h2>Customer Care</h2>
        <button className="pf-modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="pf-modal-body">
        <p className="pf-modal-desc" style={{ marginBottom: '1.25rem' }}>
          We're available Mon–Fri, 8am–6pm WAT. Reach us through any channel below.
        </p>
        {[
          { label: 'Call Us',        value: '0800-SAVENSHOP',        icon: Phone,         color: '#10b981' },
          { label: 'WhatsApp',       value: '+234 901 000 1234',     icon: Smartphone,    color: '#25D366' },
          { label: 'Email Support',  value: 'help@savenshop.ng',     icon: HeadphonesIcon,color: '#667eea' },
          { label: 'USSD Helpline',  value: USSD_CODE,               icon: Hash,          color: '#f59e0b' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="pf-security-row">
            <div className="pf-menu-icon" style={{ background: color + '18', color }}>
              <Icon size={18} />
            </div>
            <div className="pf-menu-text">
              <span className="pf-menu-label">{label}</span>
              <span className="pf-menu-sub">{value}</span>
            </div>
            <ChevronRight size={16} color="#9ca3af" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InviteModal = ({ user, onClose }) => {
  const [copied, setCopied] = useState(false);
  const code = (user?.name?.split(' ')[0] || 'USER').toUpperCase() + '2024';

  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header pf-invite-header">
          <h2>Invite Friends</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body pf-invite-body">
          <div className="pf-invite-emoji">🎁</div>
          <h3>Earn ₦500 per referral!</h3>
          <p>Share your code. When your friend opens an account and funds it, you both get ₦500.</p>

          <div className="pf-invite-code">
            <span>{code}</span>
            <button onClick={copy} className="pf-copy-btn">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="pf-invite-stats">
            <div><strong>3</strong><span>Friends invited</span></div>
            <div><strong>₦1,500</strong><span>Total earned</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const USSDModal = ({ onClose }) => {
  const shortcuts = [
    { action: 'Check Balance',    code: '*737*0#'   },
    { action: 'Add Funds',        code: '*737*1#'   },
    { action: 'Lock Savings',     code: '*737*2#'   },
    { action: 'Convert to Stock', code: '*737*3#'   },
    { action: 'Mini Statement',   code: '*737*4#'   },
    { action: 'Customer Care',    code: '*737*9#'   },
  ];

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#0f3460' }}>
          <h2>USSD Banking</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body">
          <div className="pf-ussd-hero">
            <span className="pf-ussd-code">{USSD_CODE}</span>
            <p>Dial from any network. No internet needed.</p>
          </div>
          <h4 style={{ margin: '1rem 0 0.75rem', fontSize: '0.85rem', color: '#6b7280' }}>QUICK SHORTCUTS</h4>
          {shortcuts.map(({ action, code }) => (
            <div key={code} className="pf-ussd-row">
              <span>{action}</span>
              <code>{code}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RateModal = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover,  setHover]  = useState(0);
  const [sent,   setSent]   = useState(false);
  const [comment, setComment] = useState('');

  const submit = () => { if (rating > 0) setSent(true); };

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal" onClick={e => e.stopPropagation()}>
        <div className="pf-modal-header" style={{ background: '#f59e0b' }}>
          <h2>Rate Save 'n' Shop</h2>
          <button className="pf-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pf-modal-body pf-invite-body">
          {sent ? (
            <>
              <div className="pf-invite-emoji">🙏</div>
              <h3>Thank you!</h3>
              <p>Your feedback helps us serve you better.</p>
            </>
          ) : (
            <>
              <div className="pf-invite-emoji">⭐</div>
              <h3>How are we doing?</h3>
              <p>Tap a star to rate your experience</p>

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

              <textarea
                className="pf-rate-comment"
                placeholder="Tell us more (optional)…"
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={3}
              />

              <button
                className="pf-modal-cta"
                style={{ background: '#f59e0b', opacity: rating ? 1 : 0.4 }}
                onClick={submit}
              >
                Submit Rating
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main ProfilePage ───────────────────────────────────────────────────────
const ProfilePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showBVN, setShowBVN]   = useState(false);
  const [modal, setModal]       = useState(null); // 'tier1'|'tier2'|'tier3'|'security'|'care'|'invite'|'ussd'|'rate'

  const u = user || {
    name: 'Adebayo Johnson',
    email: 'adebayo.j@email.com',
    phone: '+234 801 234 5678',
    location: 'Lagos, Nigeria',
    accountNumber: '0123456789',
    accountType: 'Savings Account',
    bvn: '22345678901',
    currentTier: 1,
  };

  const initials  = u.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const firstName = u.name.split(' ')[0];
  const maskedBVN = u.bvn ? u.bvn.replace(/(\d{3})\d{5}(\d{3})/, '$1•••••$2') : '•••••••••••';
  const currentTier = TIERS.find(t => t.level === (u.currentTier || 1));

  const handleLogout = () => { onLogout(); navigate('/login'); };

  const open  = (key) => setModal(key);
  const close = () => setModal(null);

  return (
    <div className="pf-root">

      {/* ── Topbar ─────────────────────────────────────────────────── */}
      <header className="pf-topbar">
        <button className="pf-back-btn" onClick={() => navigate('/platform')}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="pf-topbar-title">My Profile</h1>
        <button className="pf-logout-btn" onClick={handleLogout} title="Logout">
          <LogOut size={20} />
        </button>
      </header>

      <div className="pf-scroll">

        {/* ── Hero card ──────────────────────────────────────────────── */}
        <div className="pf-hero">
          <div className="pf-hero-bg" />
          <div className="pf-hero-avatar">{initials}</div>
          <h2 className="pf-hero-name">{u.name}</h2>
          <p className="pf-hero-email">{u.email}</p>
          <p className="pf-hero-phone">{u.phone}</p>

          {/* Tier badge */}
          <div
            className="pf-hero-tier"
            style={{ background: currentTier.color + '22', color: currentTier.color, border: `1px solid ${currentTier.color}55` }}
          >
            <ShieldCheck size={14} /> {currentTier.name} — {currentTier.label}
          </div>
        </div>

        {/* ── BVN ────────────────────────────────────────────────────── */}
        <div className="pf-section-card">
          <p className="pf-card-label">Bank Verification Number (BVN)</p>
          <div className="pf-bvn-row">
            <span className="pf-bvn-number">{showBVN ? u.bvn : maskedBVN}</span>
            <button className="pf-bvn-toggle" onClick={() => setShowBVN(s => !s)}>
              {showBVN ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="pf-card-hint">
            <AlertTriangle size={12} color="#f59e0b" /> Keep this confidential. Never share with anyone.
          </p>
        </div>

        {/* ── Menu sections ──────────────────────────────────────────── */}
        <div className="pf-menu-section">
          <p className="pf-section-label">ACCOUNT</p>

          <MenuRow
            icon={History}
            label="Transaction History"
            sublabel="View all your savings and orders"
            color="#667eea"
            onClick={() => navigate('/dashboard')}
          />

          <MenuRow
            icon={ShieldCheck}
            label="Account Limits"
            sublabel={`You're on ${currentTier.name} · ${currentTier.limit}`}
            color="#8b5cf6"
            onClick={() => open('limits')}
            badge="Upgrade"
          />

          <MenuRow
            icon={CreditCard}
            label="Bank Accounts & Cards"
            sublabel={`${LINKED_ACCOUNTS.length} accounts · ${LINKED_CARDS.length} cards linked`}
            color="#10b981"
            onClick={() => open('cards')}
          />
        </div>

        <div className="pf-menu-section">
          <p className="pf-section-label">SECURITY & SUPPORT</p>

          <MenuRow
            icon={ShieldCheck}
            label="Security Centre"
            sublabel="Password, PIN, biometrics & 2FA"
            color="#ef4444"
            onClick={() => open('security')}
          />

          <MenuRow
            icon={HeadphonesIcon}
            label="Customer Care"
            sublabel="Call, WhatsApp or email us"
            color="#06b6d4"
            onClick={() => open('care')}
          />
        </div>

        <div className="pf-menu-section">
          <p className="pf-section-label">MORE</p>

          <MenuRow
            icon={Gift}
            label="Invite Friends"
            sublabel="Earn ₦500 for every referral"
            color="#f59e0b"
            onClick={() => open('invite')}
            badge="₦500"
          />

          <MenuRow
            icon={Hash}
            label="Our USSD Code"
            sublabel={`Dial ${USSD_CODE} — no internet needed`}
            color="#0f3460"
            onClick={() => open('ussd')}
          />

          <MenuRow
            icon={Star}
            label="Rate Us"
            sublabel="Tell us how we're doing"
            color="#f59e0b"
            onClick={() => open('rate')}
          />
        </div>

        {/* ── Logout row ─────────────────────────────────────────────── */}
        <div className="pf-menu-section">
          <button className="pf-menu-row pf-logout-row" onClick={handleLogout}>
            <div className="pf-menu-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
              <LogOut size={20} />
            </div>
            <div className="pf-menu-text">
              <span className="pf-menu-label" style={{ color: '#ef4444' }}>Log Out</span>
              <span className="pf-menu-sub">Sign out of your account</span>
            </div>
          </button>
        </div>

        <p className="pf-version">Save 'n' Shop v1.0.0 · © 2025</p>
      </div>

      {/* ── Modals ─────────────────────────────────────────────────── */}

      {/* Account Limits / Tier selector */}
      {modal === 'limits' && (
        <div className="pf-modal-overlay" onClick={close}>
          <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
            <div className="pf-modal-header" style={{ background: '#0f0f1a' }}>
              <h2>Account Limits & Tiers</h2>
              <button className="pf-modal-close" onClick={close}>✕</button>
            </div>
            <div className="pf-modal-body">
              <p className="pf-modal-desc">
                Upgrade your tier to unlock higher transaction limits and more features.
              </p>
              {TIERS.map(tier => (
                <div
                  key={tier.level}
                  className="pf-tier-card"
                  style={{ background: tier.bg, border: `1.5px solid ${tier.border}` }}
                  onClick={() => { close(); setTimeout(() => open('tier' + tier.level), 50); }}
                >
                  <div className="pf-tier-top">
                    <div>
                      <div className="pf-tier-name" style={{ color: tier.color }}>
                        {tier.level === u.currentTier && <span className="pf-current-chip">Current</span>}
                        {tier.name}
                      </div>
                      <div className="pf-tier-label">{tier.label}</div>
                    </div>
                    <div className="pf-tier-limit" style={{ color: tier.color }}>{tier.limit}</div>
                  </div>
                  <div className="pf-tier-req">
                    <tier.requirementIcon size={14} style={{ color: tier.color }} />
                    <span>{tier.requirement}</span>
                    {tier.verified
                      ? <CheckCircle size={14} color="#10b981" />
                      : <span className="pf-setup-tag" style={{ background: tier.color + '22', color: tier.color }}>Unlock</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {TIERS.map(tier => modal === 'tier' + tier.level && (
        <TierModal key={tier.level} tier={tier} onClose={close} />
      ))}

      {/* Cards & Accounts */}
      {modal === 'cards' && (
        <div className="pf-modal-overlay" onClick={close}>
          <div className="pf-modal pf-wide" onClick={e => e.stopPropagation()}>
            <div className="pf-modal-header" style={{ background: '#10b981' }}>
              <h2>Bank Accounts & Cards</h2>
              <button className="pf-modal-close" onClick={close}>✕</button>
            </div>
            <div className="pf-modal-body">

              <h4 className="pf-modal-section-title">Linked Bank Accounts</h4>
              {LINKED_ACCOUNTS.map(acc => (
                <div key={acc.id} className="pf-bank-row">
                  <div className="pf-bank-logo" style={{ background: acc.color }}>
                    {acc.logo}
                  </div>
                  <div className="pf-menu-text">
                    <span className="pf-menu-label">{acc.bank}</span>
                    <span className="pf-menu-sub">{acc.number} · {acc.type}</span>
                  </div>
                  <CheckCircle size={18} color="#10b981" />
                </div>
              ))}
              <button className="pf-add-btn">+ Add Bank Account</button>

              <h4 className="pf-modal-section-title" style={{ marginTop: '1.5rem' }}>Linked Cards</h4>
              {LINKED_CARDS.map(card => (
                <div
                  key={card.id}
                  className="pf-card-chip"
                  style={{ background: `linear-gradient(135deg, ${card.color[0]}, ${card.color[1]})` }}
                >
                  <div className="pf-card-chip-top">
                    <span className="pf-card-brand">{card.brand}</span>
                    <div className="pf-card-circles">
                      <div /><div />
                    </div>
                  </div>
                  <span className="pf-card-num">{card.number}</span>
                  <span className="pf-card-exp">Expires {card.expiry}</span>
                </div>
              ))}
              <button className="pf-add-btn">+ Add New Card</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'security' && <SecurityModal onClose={close} />}
      {modal === 'care'     && <CareModal     onClose={close} />}
      {modal === 'invite'   && <InviteModal   user={u} onClose={close} />}
      {modal === 'ussd'     && <USSDModal     onClose={close} />}
      {modal === 'rate'     && <RateModal     onClose={close} />}
    </div>
  );
};

export default ProfilePage;
