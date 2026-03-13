import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowDownLeft, Lock,
  ShoppingCart, CheckCircle, Package, Search,
  Bell, LogOut, Shield, Filter, Download, X
} from 'lucide-react';
import './Dashboard.css';

const ALL_TRANSACTIONS = [
  { id: 1,  type: "Locked",      amount: 15000,  date: "Dec 15, 2025", status: "Locked",    category: "Savings"  },
  { id: 2,  type: "Converted",   amount: 8500,   date: "Dec 12, 2025", status: "Converted", category: "Shopping" },
  { id: 3,  type: "Added Funds", amount: 20000,  date: "Dec 10, 2025", status: "Completed", category: "Funding"  },
  { id: 4,  type: "Delivered",   amount: 12000,  date: "Dec 8, 2025",  status: "Delivered", category: "Shopping" },
  { id: 5,  type: "Locked",      amount: 30000,  date: "Nov 28, 2025", status: "Locked",    category: "Savings"  },
  { id: 6,  type: "Added Funds", amount: 50000,  date: "Nov 20, 2025", status: "Completed", category: "Funding"  },
  { id: 7,  type: "Converted",   amount: 22000,  date: "Nov 15, 2025", status: "Converted", category: "Shopping" },
  { id: 8,  type: "Delivered",   amount: 22000,  date: "Nov 18, 2025", status: "Delivered", category: "Shopping" },
  { id: 9,  type: "Added Funds", amount: 10000,  date: "Nov 5, 2025",  status: "Completed", category: "Funding"  },
  { id: 10, type: "Locked",      amount: 18000,  date: "Oct 30, 2025", status: "Locked",    category: "Savings"  },
  { id: 11, type: "Converted",   amount: 14000,  date: "Oct 22, 2025", status: "Converted", category: "Shopping" },
  { id: 12, type: "Delivered",   amount: 14000,  date: "Oct 25, 2025", status: "Delivered", category: "Shopping" },
];

const STATUS_ICON = {
  Locked:    <Lock size={16} />,
  Converted: <ShoppingCart size={16} />,
  Completed: <CheckCircle size={16} />,
  Delivered: <Package size={16} />,
};

const STATUS_COLOR = {
  Locked:    'status-locked',
  Converted: 'status-converted',
  Completed: 'status-completed',
  Delivered: 'status-delivered',
};

const fmt = (n) => '₦' + Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2 });

const Dashboard = ({ user, onLogout, notifications = [], unreadCount = 0, markAllRead, markOneRead }) => {
  const navigate = useNavigate();
  const [filter, setFilter]             = useState('All');
  const [search, setSearch]             = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const u = user || { name: 'Guest User', email: '—' };
  const initials = u.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const filters = ['All', 'Funding', 'Savings', 'Shopping'];

  const filtered = ALL_TRANSACTIONS.filter(tx => {
    const matchesFilter = filter === 'All' || tx.category === filter;
    const matchesSearch = tx.type.toLowerCase().includes(search.toLowerCase()) ||
                          tx.status.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalFunded    = ALL_TRANSACTIONS.filter(t => t.category === 'Funding').reduce((s, t) => s + t.amount, 0);
  const totalSaved     = ALL_TRANSACTIONS.filter(t => t.category === 'Savings').reduce((s, t) => s + t.amount, 0);
  const totalConverted = ALL_TRANSACTIONS.filter(t => t.status === 'Converted').reduce((s, t) => s + t.amount, 0);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const PRIORITY_LABEL = { high: '🔴', medium: '🟡', low: '🟢' };

  return (
    <div className="hist-root">
      {/* Topbar */}
      <header className="hist-topbar">
        <button className="hist-back-btn" onClick={() => navigate('/platform')}>
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <div className="hist-topbar-right">

          {/* ── Notification bell — same data as PlatformNavbar ── */}
          <div className="hist-notif-wrapper" ref={notifRef}>
            <button
              className="hist-icon-btn"
              onClick={() => setShowNotifications(o => !o)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="hist-badge">{unreadCount}</span>
              )}
            </button>

            {showNotifications && (
              <div className="hist-notif-dropdown">
                <div className="hist-notif-header">
                  <h3>Notifications</h3>
                  <button
                    className="hist-mark-read"
                    onClick={() => markAllRead && markAllRead()}
                  >
                    Mark all read
                  </button>
                </div>

                <div className="hist-notif-list">
                  {notifications.length === 0 ? (
                    <p className="hist-notif-empty">No notifications</p>
                  ) : notifications.map(notif => (
                    <div
                      key={notif.id}
                      className={`hist-notif-item ${notif.read ? 'read' : 'unread'}`}
                      onClick={() => markOneRead && markOneRead(notif.id)}
                    >
                      <span className="hist-notif-priority">{PRIORITY_LABEL[notif.priority]}</span>
                      <div className="hist-notif-body">
                        <p>{notif.message}</p>
                        <span>{notif.time}</span>
                      </div>
                      {!notif.read && <div className="hist-notif-dot" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hist-avatar">{initials}</div>
          <button
            className="hist-logout-btn"
            onClick={() => { onLogout(); navigate('/login'); }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="hist-content">
        {/* Page title */}
        <div className="hist-heading">
          <div>
            <h1>Transaction History</h1>
            <p>Full record of your savings, funding and conversions</p>
          </div>
          <button className="hist-export-btn">
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* Summary cards */}
        <div className="hist-summary">
          <div className="hist-summary-card blue">
            <p>Total Funded</p>
            <h3>{fmt(totalFunded)}</h3>
            <span><ArrowDownLeft size={14} /> Money added</span>
          </div>
          <div className="hist-summary-card purple">
            <p>Total Saved</p>
            <h3>{fmt(totalSaved)}</h3>
            <span><Lock size={14} /> Locked savings</span>
          </div>
          <div className="hist-summary-card green">
            <p>Total Converted</p>
            <h3>{fmt(totalConverted)}</h3>
            <span><ShoppingCart size={14} /> To stock</span>
          </div>
        </div>

        {/* Filters + Search */}
        <div className="hist-controls">
          <div className="hist-search">
            <Search size={16} className="hist-search-icon" />
            <input
              type="text"
              placeholder="Search transactions…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="hist-filters">
            <Filter size={16} style={{ color: '#9ca3af' }} />
            {filters.map(f => (
              <button
                key={f}
                className={`hist-filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* Transaction table */}
        <div className="hist-table-wrap">
          {filtered.length === 0 ? (
            <div className="hist-empty">No transactions found.</div>
          ) : (
            <table className="hist-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(tx => (
                  <tr key={tx.id}>
                    <td>
                      <div className="hist-tx-type">
                        <div className={`hist-tx-icon ${tx.status.toLowerCase()}`}>
                          {STATUS_ICON[tx.status]}
                        </div>
                        {tx.type}
                      </div>
                    </td>
                    <td><span className="hist-category">{tx.category}</span></td>
                    <td className="hist-amount">{fmt(tx.amount)}</td>
                    <td className="hist-date">{tx.date}</td>
                    <td>
                      <span className={`hist-status ${STATUS_COLOR[tx.status]}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
