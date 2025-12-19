import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, DollarSign, ShoppingCart, CreditCard, Settings, LogOut, User, Bell, Search, Lock, TrendingUp, Package, Calendar, AlertCircle, Plus, ArrowRight, CheckCircle, Clock, ShoppingBag, History, UserCircle } from 'lucide-react';
import './PlatformNavbar.css';

// Mock user data
const mockUser = {
  name: "Adebayo Johnson",
  email: "adebayo.j@email.com",
  avatar: null,
  totalBalance: 125000,
  lockedSavings: 80000,
  availableToStock: 45000,
  savingsProgress: 64,
  nextStockDate: "Dec 25, 2025"
};

// Mock savings buckets
const savingsBuckets = [
  { id: 1, name: "Emergency Fund", balance: 35000, target: 50000, locked: true },
  { id: 2, name: "Groceries", balance: 28000, target: 40000, locked: false },
  { id: 3, name: "Holiday Shopping", balance: 17000, target: 30000, locked: true }
];

// Mock transactions
const recentTransactions = [
  { id: 1, type: "Locked", amount: 15000, date: "Dec 15", status: "Locked" },
  { id: 2, type: "Converted", amount: 8500, date: "Dec 12", status: "Converted" },
  { id: 3, type: "Added Funds", amount: 20000, date: "Dec 10", status: "Completed" },
  { id: 4, type: "Delivered", amount: 12000, date: "Dec 8", status: "Delivered" }
];

// Mock savings rules
const savingsRules = [
  { id: 1, name: "Weekly Auto-Save", status: "active", compliance: 95 },
  { id: 2, name: "Round-Up Savings", status: "active", compliance: 88 },
  { id: 3, name: "Monthly Lock", status: "warning", compliance: 60 }
];

// Mock notifications
const notifications = [
  { id: 1, message: "Your ₦15,000 savings has been locked", priority: "high", time: "2h ago" },
  { id: 2, message: "Stock conversion available for December", priority: "medium", time: "5h ago" },
  { id: 3, message: "Reminder: Weekly auto-save tomorrow", priority: "low", time: "1d ago" }
];

// Mock monthly trends
const monthlyTrends = [
  { month: "Jul", amount: 85 },
  { month: "Aug", amount: 92 },
  { month: "Sep", amount: 78 },
  { month: "Oct", amount: 95 },
  { month: "Nov", amount: 88 },
  { month: "Dec", amount: 100 }
];

const PlatformNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [stockAmount, setStockAmount] = useState(20000);
  const [activeBottomNav, setActiveBottomNav] = useState('dashboard');
  const [stockCategory, setStockCategory] = useState('groceries');

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/platform' },
    { icon: DollarSign, label: 'Savings', path: '/platform/savings' },
    { icon: ShoppingCart, label: 'Shopping', path: '/platform/shopping' },
    { icon: CreditCard, label: 'Transactions', path: '/platform/transactions' },
    { icon: Settings, label: 'Settings', path: '/platform/settings' },
  ];

  const bottomNavItems = [
    { icon: Home, label: 'Dashboard', key: 'dashboard' },
    { icon: DollarSign, label: 'Save', key: 'save' },
    { icon: Package, label: 'Stock', key: 'stock' },
    { icon: History, label: 'History', key: 'history' },
    { icon: UserCircle, label: 'Profile', key: 'profile' }
  ];

  const generateGroceryList = (amount, category) => {
    const lists = {
      groceries: {
        low: ["Rice (5kg)", "Beans (2kg)", "Garri (3kg)", "Vegetable Oil (1L)"],
        medium: ["Rice (10kg)", "Beans (5kg)", "Garri (5kg)", "Vegetable Oil (3L)", "Sugar (2kg)", "Salt (1kg)"],
        high: ["Rice (25kg)", "Beans (10kg)", "Garri (10kg)", "Vegetable Oil (5L)", "Tomato Paste (12 tins)", "Noodles (2 cartons)", "Sugar (5kg)", "Salt (2kg)"]
      },
      farmProduce: {
        low: ["Yam Tubers (10 pieces)", "Sweet Potatoes (5kg)", "Cassava (3 tubers)", "Plantain (1 bunch)"],
        medium: ["Yam Tubers (20 pieces)", "Sweet Potatoes (10kg)", "Cassava (10 tubers)", "Plantain (3 bunches)", "Cocoyam (5kg)", "Irish Potatoes (5kg)"],
        high: ["Yam Tubers (50 pieces)", "Sweet Potatoes (25kg)", "Cassava (25 tubers)", "Plantain (10 bunches)", "Cocoyam (15kg)", "Irish Potatoes (15kg)", "Garden Eggs (5kg)", "Okra (3kg)"]
      },
      seafoods: {
        low: ["Frozen Fish (3kg)", "Dried Crayfish (500g)", "Stockfish (2 pieces)", "Shrimps (500g)"],
        medium: ["Frozen Fish (7kg)", "Dried Crayfish (1kg)", "Stockfish (5 pieces)", "Shrimps (1.5kg)", "Catfish (5kg)", "Mackerel (12 tins)"],
        high: ["Frozen Fish (15kg)", "Dried Crayfish (3kg)", "Stockfish (15 pieces)", "Shrimps (5kg)", "Catfish (15kg)", "Mackerel (2 cartons)", "Snails (5kg)", "Periwinkle (3kg)", "Crabs (2kg)"]
      }
    };

    let tier = 'low';
    if (amount >= 20000) tier = 'high';
    else if (amount >= 10000) tier = 'medium';

    return lists[category][tier];
  };

  return (
    <div className="platform-layout">
      {/* Overlay for mobile */}
      <div 
        className={`overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${!sidebarOpen ? 'closed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            💰 Save 'n' Shop
          </div>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`menu-item ${index === 0 ? 'active' : ''}`}
              onClick={() => {
                console.log(`Navigate to ${item.path}`);
                setSidebarOpen(false);
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="logout-section">
          <button className="logout-btn" onClick={() => console.log('Logout')}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
        {/* Top Navbar */}
        <header className="top-navbar">
          <div className="nav-left">
            <button 
              className="hamburger-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="welcome-text">
              Welcome back, <span className="welcome-name">{mockUser.name.split(' ')[0]}</span>
            </h1>
          </div>

          <div className="nav-right">
            {/* Search Box */}
            <div className="search-box">
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search transactions..."
              />
            </div>

            {/* Notifications */}
            <div className="notification-wrapper" ref={notificationRef}>
              <button 
                className="icon-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                <span className="notification-badge"></span>
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <button className="mark-read">Mark all read</button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(notif => (
                      <div key={notif.id} className="notification-item">
                        <div className={`priority-badge ${notif.priority}`}></div>
                        <div className="notification-content">
                          <p>{notif.message}</p>
                          <span className="notification-time">{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="profile-section" ref={profileRef}>
              <button 
                className="profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="profile-avatar">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="profile-info">
                  <div className="profile-name">{mockUser.name}</div>
                  <div className="profile-email">{mockUser.email}</div>
                </div>
              </button>

              <div className={`profile-dropdown ${showProfileMenu ? 'show' : ''}`}>
                <button className="dropdown-item">
                  <User size={18} />
                  <span>My Profile</span>
                </button>
                <button className="dropdown-item">
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" style={{color: '#ef4444'}}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Account Summary Card */}
          <div className="account-summary-card">
            <div className="summary-header">
              <h2>Account Summary</h2>
              <div className="countdown-badge">
                <Calendar size={16} />
                <span>Next stock: {mockUser.nextStockDate}</span>
              </div>
            </div>
            
            <div className="balance-grid">
              <div className="balance-item">
                <span className="balance-label">Total Balance</span>
                <h3 className="balance-amount">₦{mockUser.totalBalance.toLocaleString()}</h3>
              </div>
              <div className="balance-item">
                <span className="balance-label">Locked Savings</span>
                <h3 className="balance-amount locked">₦{mockUser.lockedSavings.toLocaleString()}</h3>
              </div>
              <div className="balance-item">
                <span className="balance-label">Available to Stock</span>
                <h3 className="balance-amount available">₦{mockUser.availableToStock.toLocaleString()}</h3>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-header">
                <span>Savings Progress</span>
                <span className="progress-percentage">{mockUser.savingsProgress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${mockUser.savingsProgress}%`}}></div>
              </div>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="primary-actions">
            <button className="action-btn primary">
              <Plus size={20} />
              <span>Add Funds</span>
            </button>
            <button className="action-btn secondary">
              <ShoppingCart size={20} />
              <span>Convert to Groceries</span>
            </button>
            <button className="action-btn accent">
              <Lock size={20} />
              <span>Lock Savings</span>
            </button>
            <button className="action-btn disabled" disabled>
              <ArrowRight size={20} />
              <span>Withdraw</span>
            </button>
            <button className="action-btn outline">
              <Package size={20} />
              <span>View Stock List</span>
            </button>
          </div>

          {/* Savings Buckets */}
          <div className="savings-buckets">
            <h3 className="section-title">Savings Buckets</h3>
            <div className="buckets-grid">
              {savingsBuckets.map(bucket => (
                <div key={bucket.id} className="bucket-card">
                  <div className="bucket-header">
                    <h4>{bucket.name}</h4>
                    {bucket.locked && (
                      <span className="lock-badge">
                        <Lock size={14} />
                        Locked
                      </span>
                    )}
                  </div>
                  <div className="bucket-balance">
                    <span className="current">₦{bucket.balance.toLocaleString()}</span>
                    <span className="target">of ₦{bucket.target.toLocaleString()}</span>
                  </div>
                  <div className="bucket-progress">
                    <div 
                      className="bucket-progress-fill" 
                      style={{width: `${(bucket.balance / bucket.target) * 100}%`}}
                    ></div>
                  </div>
                  <div className="bucket-percentage">
                    {Math.round((bucket.balance / bucket.target) * 100)}% complete
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="two-column-layout">
            {/* Left Column */}
            <div className="left-column">
              {/* Stock Conversion Section */}
              <div className="stock-conversion-card">
                <h3 className="section-title">Convert to Stock</h3>
                
                {/* Category Selection */}
                <div className="category-selector">
                  <button 
                    className={`category-btn ${stockCategory === 'groceries' ? 'active' : ''}`}
                    onClick={() => setStockCategory('groceries')}
                  >
                    <ShoppingCart size={18} />
                    Groceries
                  </button>
                  <button 
                    className={`category-btn ${stockCategory === 'farmProduce' ? 'active' : ''}`}
                    onClick={() => setStockCategory('farmProduce')}
                  >
                    <Package size={18} />
                    Farm Produce
                  </button>
                  <button 
                    className={`category-btn ${stockCategory === 'seafoods' ? 'active' : ''}`}
                    onClick={() => setStockCategory('seafoods')}
                  >
                    <ShoppingBag size={18} />
                    Seafoods
                  </button>
                </div>

                <div className="amount-selector">
                  <label>Select Amount</label>
                  <input 
                    type="range" 
                    min="5000" 
                    max={mockUser.availableToStock} 
                    step="1000"
                    value={stockAmount}
                    onChange={(e) => setStockAmount(Number(e.target.value))}
                    className="amount-slider"
                  />
                  <div className="amount-display">₦{stockAmount.toLocaleString()}</div>
                </div>
                
                <div className="grocery-preview">
                  <div className="grocery-header">
                    <span className="vendor-label">
                      Vendor: {stockCategory === 'groceries' ? 'ShopRite' : stockCategory === 'farmProduce' ? 'Fresh Farms Market' : 'Ocean Fresh Seafoods'}
                    </span>
                    <span className="delivery-badge">
                      <CheckCircle size={14} />
                      Delivery Available
                    </span>
                  </div>
                  <div className="grocery-list">
                    <h4>Auto-Generated List:</h4>
                    <ul>
                      {generateGroceryList(stockAmount, stockCategory).map((item, index) => (
                        <li key={index}>
                          <CheckCircle size={16} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="convert-btn">
                    Convert Now
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Transactions Ledger */}
              <div className="transactions-card">
                <h3 className="section-title">Recent Transactions</h3>
                <div className="transactions-list">
                  {recentTransactions.map(transaction => (
                    <div key={transaction.id} className="transaction-item">
                      <div className="transaction-icon">
                        {transaction.status === 'Locked' && <Lock size={18} />}
                        {transaction.status === 'Converted' && <ShoppingCart size={18} />}
                        {transaction.status === 'Completed' && <CheckCircle size={18} />}
                        {transaction.status === 'Delivered' && <Package size={18} />}
                      </div>
                      <div className="transaction-details">
                        <span className="transaction-type">{transaction.type}</span>
                        <span className="transaction-date">{transaction.date}</span>
                      </div>
                      <div className="transaction-amount">
                        ₦{transaction.amount.toLocaleString()}
                      </div>
                      <span className={`transaction-status ${transaction.status.toLowerCase()}`}>
                        {transaction.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column">
              {/* Rules & Discipline Panel */}
              <div className="rules-card">
                <h3 className="section-title">Savings Rules & Discipline</h3>
                <div className="compliance-score">
                  <div className="score-circle">
                    <span className="score-value">81%</span>
                  </div>
                  <span className="score-label">Overall Compliance</span>
                </div>
                
                <div className="rules-list">
                  {savingsRules.map(rule => (
                    <div key={rule.id} className={`rule-item ${rule.status}`}>
                      <div className="rule-header">
                        <span className="rule-name">{rule.name}</span>
                        <span className="rule-compliance">{rule.compliance}%</span>
                      </div>
                      <div className="rule-progress">
                        <div 
                          className="rule-progress-fill" 
                          style={{width: `${rule.compliance}%`}}
                        ></div>
                      </div>
                      {rule.status === 'warning' && (
                        <div className="rule-warning">
                          <AlertCircle size={14} />
                          <span>Below target - needs attention</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div className="insights-card">
                <h3 className="section-title">Savings Insights</h3>
                
                <div className="trend-chart">
                  <h4>Monthly Trend</h4>
                  <div className="chart-bars">
                    {monthlyTrends.map((data, index) => (
                      <div key={index} className="chart-bar-wrapper">
                        <div className="chart-bar" style={{height: `${data.amount}%`}}>
                          <span className="bar-tooltip">₦{data.amount}k</span>
                        </div>
                        <span className="bar-label">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="insights-metrics">
                  <div className="metric-item">
                    <TrendingUp size={20} className="metric-icon green" />
                    <div className="metric-content">
                      <span className="metric-label">Inflation Protection</span>
                      <span className="metric-value">12.5% saved</span>
                    </div>
                  </div>
                  <div className="metric-item">
                    <DollarSign size={20} className="metric-icon blue" />
                    <div className="metric-content">
                      <span className="metric-label">Value Preserved</span>
                      <span className="metric-value">₦98,750</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation (Mobile) */}
        <nav className="bottom-nav">
          {bottomNavItems.map(item => (
            <button
              key={item.key}
              className={`bottom-nav-item ${activeBottomNav === item.key ? 'active' : ''}`}
              onClick={() => setActiveBottomNav(item.key)}
            >
              <item.icon size={22} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default PlatformNavbar;