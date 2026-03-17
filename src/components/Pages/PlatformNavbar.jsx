import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Home, DollarSign, ShoppingCart, CreditCard, Settings, LogOut, User, Bell, Search, Lock, TrendingUp, Package, Calendar, AlertCircle, Plus, ArrowRight, CheckCircle, Clock, ShoppingBag, History, UserCircle, BarChart2 } from 'lucide-react';
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

const PlatformNavbar = ({ user: propUser, onLogout, notifications: propNotifications, unreadCount, markAllRead, markOneRead }) => {
  const navigate = useNavigate();

  // Use real logged-in user if available, fall back to mock
  const displayUser = propUser || mockUser;
  const notifList = propNotifications || notifications;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [stockAmount, setStockAmount] = useState(20000);
  const [activeBottomNav, setActiveBottomNav] = useState('dashboard');
  const [stockCategory, setStockCategory] = useState('groceries');
  const [showConversionSummary, setShowConversionSummary] = useState(false);
  const [, setShowFundingSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showCardDetailsModal, setShowCardDetailsModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [showStockListModal, setShowStockListModal] = useState(false);
  const [convertCategory, setConvertCategory] = useState('groceries');
  const [convertAmount, setConvertAmount] = useState(5000);
  const [lockBucket, setLockBucket] = useState('');
  const [lockDuration, setLockDuration] = useState('');
  const [lockPin, setLockPin] = useState('');
  const [lockConfirmPin, setLockConfirmPin] = useState('');
  const [lockSuccess, setLockSuccess] = useState(false);
  const [lockAmountInput, setLockAmountInput] = useState('');
  const [buckets, setBuckets] = useState(savingsBuckets);
  const [lockAmount, setLockAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [fundAmount, setFundAmount] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(900);
  const [conversionData, setConversionData] = useState(null);
  const [user, setUser] = useState(mockUser);
  const [transactions, setTransactions] = useState(recentTransactions);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [processingPayment, setProcessingPayment] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const otpRefs = useRef([]);
  const timerRef = useRef(null);

  const paymentMethods = [
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Transfer from your bank account',
      fee: 'Free',
      processingTime: 'Instant - 10 minutes'
    },
    {
      id: 'card',
      name: 'Debit/Credit Card',
      icon: '💳',
      description: 'Visa, Mastercard, Verve',
      fee: '₦50 + 1.5%',
      processingTime: 'Instant'
    },
    {
      id: 'ussd',
      name: 'USSD Code',
      icon: '📞',
      description: 'Dial *737# to fund',
      fee: 'Free',
      processingTime: 'Instant'
    }
  ];

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

  // Countdown timer for conversion with proper cleanup
  useEffect(() => {
    if (showConversionSummary && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setShowConversionSummary(false);
            alert('Price lock expired. Please try again.');
            return 900;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [showConversionSummary, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getConversionRate = (category) => {
    const rates = {
      groceries: 0.95,
      farmProduce: 0.92,
      seafoods: 0.90
    };
    return rates[category];
  };

  const handleConvertNow = () => {
    if (stockAmount > user.availableToStock) {
      alert(`Insufficient balance. You have ₦${user.availableToStock.toLocaleString()} available to convert.`);
      return;
    }
    if (stockAmount < 5000) {
      alert('Minimum conversion amount is ₦5,000');
      return;
    }

    // Store conversion data
    setConversionData({
      amount: stockAmount,
      category: stockCategory,
      items: generateGroceryList(stockAmount, stockCategory),
      vendor: getVendorName(stockCategory)
    });

    setTimeRemaining(900);
    setShowConversionSummary(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmConversion = () => {
     const amount = conversionData.amount;

      setUser(prev => ({
        ...prev,
        availableToStock: prev.availableToStock - amount,
        totalBalance: prev.totalBalance - amount
      }));

      setTransactions(prev => ([
        {
          id: Date.now(),
          type: "Converted",
          amount,
          date: new Date().toLocaleDateString(),
          status: "Converted"
        },
        ...prev
      ]));
    
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    clearInterval(timerRef.current);
    setShowConversionSummary(false);
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
      setConversionData(null);
    }, 5000);
  };

  const cancelConversion = () => {
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setShowConversionSummary(false);
    setTimeRemaining(900);
    setConversionData(null);
  };

  const handleAddFunds = () => {
    setShowAddFundsModal(true);
    setSelectedPaymentMethod(null);
    setFundAmount('');
  };

  const closeAddFundsModal = () => {
    setShowAddFundsModal(false);
    setSelectedPaymentMethod(null);
    setFundAmount('');
  };

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
  };

  const proceedToPayment = () => {
    if (!fundAmount || !selectedPaymentMethod) {
      alert('Please enter an amount and select a payment method');
      return;
    }

    const amount = parseFloat(fundAmount);
    if (amount < 100) {
      alert('Minimum amount is ₦100');
      return;
    }

    if (selectedPaymentMethod === 'card') {
      setShowCardDetailsModal(true);
      return;
    }

    // Update live balances
    setUser(prev => ({
      ...prev,
      totalBalance: prev.totalBalance + amount,
      availableToStock: prev.availableToStock + amount,
    }));
    setTransactions(prev => [{
      id: Date.now(),
      type: 'Added Funds',
      amount,
      date: new Date().toLocaleDateString('en-NG'),
      status: 'Completed'
    }, ...prev]);

    closeAddFundsModal();
    setShowFundingSuccess(true);
    setTimeout(() => setShowFundingSuccess(false), 5000);
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
      formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') || formattedValue;
    } else if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
      }
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validateCardDetails = () => {
    if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return false;
    }
    if (!cardDetails.cardName.trim()) {
      alert('Please enter cardholder name');
      return false;
    }
    if (cardDetails.expiryDate.length !== 5) {
      alert('Please enter valid expiry date (MM/YY)');
      return false;
    }
    if (cardDetails.cvv.length !== 3) {
      alert('Please enter valid CVV');
      return false;
    }
    return true;
  };

  const handleCardPayment = () => {
    if (!validateCardDetails()) return;

    setProcessingPayment(true);
    
    setTimeout(() => {
      setProcessingPayment(false);
      setShowCardDetailsModal(false);
      setShowOTPModal(true);
    }, 2000);
  };

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value.slice(-1);
    setOtp(newOTP);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const verifyOTP = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      alert('Please enter the complete 6-digit OTP');
      return;
    }

    setProcessingPayment(true);

    setTimeout(() => {
      setProcessingPayment(false);
      setShowOTPModal(false);
      closeAddFundsModal();

      const amount = parseFloat(fundAmount) || 0;

      setUser(prev => ({
        ...prev,
        totalBalance: prev.totalBalance + amount,
        availableToStock: prev.availableToStock + amount,
      }));
      setTransactions(prev => [{
        id: Date.now(),
        type: 'Added Funds',
        amount,
        date: new Date().toLocaleDateString('en-NG'),
        status: 'Completed'
      }, ...prev]);

      setCardDetails({ cardNumber: '', cardName: '', expiryDate: '', cvv: '' });
      setOtp(['', '', '', '', '', '']);

      setShowFundingSuccess(true);
      setTimeout(() => setShowFundingSuccess(false), 5000);
    }, 2000);
  };

  const closeCardDetailsModal = () => {
    setShowCardDetailsModal(false);
    setCardDetails({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    });
  };

  const closeOTPModal = () => {
    setShowOTPModal(false);
    setOtp(['', '', '', '', '', '']);
  };

  const getVendorName = (category) => {
    const vendors = {
      groceries: 'ShopRite',
      farmProduce: 'Fresh Farms Market',
      seafoods: 'Ocean Fresh Seafoods'
    };
    return vendors[category];
  };

  const getCategoryIcon = (category) => {
    const icons = {
      groceries: '🛒',
      farmProduce: '🌾',
      seafoods: '🦐'
    };
    return icons[category];
  };

  const menuItems = [
    { icon: Home,        label: 'Dashboard',   path: '/platform'              },
    { icon: DollarSign,  label: 'Savings',     path: '/platform/savings'      },
    { icon: ShoppingCart,label: 'Shopping',    path: '/platform/shopping'     },
    { icon: CreditCard,  label: 'Transactions',path: '/platform/transactions' },
    { icon: BarChart2,   label: 'Analytics',   path: '/savings-analytics'     },
    { icon: History,     label: 'History',     path: '/dashboard'             },
    { icon: UserCircle,  label: 'Profile',     path: '/profile'               },
    { icon: Settings,    label: 'Settings',    path: '/platform/settings'     },
  ];

  const bottomNavItems = [
    { icon: Home,       label: 'Dashboard', key: 'dashboard', path: null         },
    { icon: DollarSign, label: 'Save',      key: 'save',      path: null         },
    { icon: Package,    label: 'Stock',     key: 'stock',     path: null         },
    { icon: History,    label: 'History',   key: 'history',   path: '/dashboard' },
    { icon: UserCircle, label: 'Profile',   key: 'profile',   path: '/profile'   },
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
              className={`menu-item ${item.label === 'History' ? 'history-link' : index === 0 ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="logout-section">
          <button className="logout-btn" onClick={() => { onLogout && onLogout(); navigate('/login'); }}>
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
              Welcome back, <span className="welcome-name">{displayUser.name.split(' ')[0]}</span>
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
                {(unreadCount ?? notifList.filter(n => !n.read).length) > 0 && (
                  <span className="notification-badge">
                    {unreadCount ?? notifList.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <button className="mark-read" onClick={() => { markAllRead && markAllRead(); }}>
                      Mark all read
                    </button>
                  </div>
                  <div className="notifications-list">
                    {notifList.map(notif => (
                      <div
                        key={notif.id}
                        className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                        onClick={() => markOneRead && markOneRead(notif.id)}
                      >
                        <div className={`priority-badge ${notif.priority}`}></div>
                        <div className="notification-content">
                          <p>{notif.message}</p>
                          <span className="notification-time">{notif.time}</span>
                        </div>
                        {!notif.read && <div className="notif-dot" />}
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
                  {displayUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="profile-info">
                  <div className="profile-name">{displayUser.name}</div>
                  <div className="profile-email">{displayUser.email}</div>
                </div>
              </button>

              <div className={`profile-dropdown ${showProfileMenu ? 'show' : ''}`}>
                <button className="dropdown-item" onClick={() => { navigate('/profile'); setShowProfileMenu(false); }}>
                  <User size={18} />
                  <span>My Profile</span>
                </button>
                <button className="dropdown-item" onClick={() => { navigate('/platform/settings'); setShowProfileMenu(false); }}>
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" style={{color: '#ef4444'}}
                  onClick={() => { onLogout && onLogout(); navigate('/login'); }}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Card Details Modal */}
          {showCardDetailsModal && (
            <>
              <div className="conversion-overlay" onClick={closeCardDetailsModal}></div>
              <div className="card-details-modal">
                <div className="card-details-header">
                  <h2>Enter Card Details</h2>
                  <button className="close-btn" onClick={closeCardDetailsModal}>
                    <X size={24} />
                  </button>
                </div>

                <div className="card-preview">
                  <div className="card-chip">💳</div>
                  <div className="card-number-display">
                    {cardDetails.cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className="card-info-row">
                    <div className="card-holder">
                      <span className="card-label">CARDHOLDER</span>
                      <span className="card-value">{cardDetails.cardName || 'YOUR NAME'}</span>
                    </div>
                    <div className="card-expiry">
                      <span className="card-label">EXPIRES</span>
                      <span className="card-value">{cardDetails.expiryDate || 'MM/YY'}</span>
                    </div>
                  </div>
                </div>

                <div className="card-form">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="card-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      value={cardDetails.cardName}
                      onChange={(e) => handleCardInputChange('cardName', e.target.value.toUpperCase())}
                      placeholder="JOHN DOE"
                      className="card-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        value={cardDetails.expiryDate}
                        onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="card-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                        placeholder="123"
                        maxLength="3"
                        className="card-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>4-Digit PIN</label>
                    <input
                      type="password"
                      value={cardDetails.pin}
                      onChange={(e) => handleCardInputChange('pin', e.target.value)}
                      placeholder="••••"
                      maxLength="4"
                      className="card-input"
                    />
                  </div>

                  <div className="payment-amount-display">
                    <span>Amount to pay:</span>
                    <span className="amount-large">
                      ₦{(parseFloat(fundAmount) + 50 + (parseFloat(fundAmount) * 0.015)).toLocaleString(undefined, {maximumFractionDigits: 2})}
                    </span>
                  </div>

                  <button
                    className="pay-now-btn"
                    onClick={handleCardPayment}
                    disabled={processingPayment}
                  >
                    {processingPayment ? (
                      <>
                        <span className="spinner"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock size={20} />
                        Pay Now
                      </>
                    )}
                  </button>

                  <div className="security-note">
                    🔒 Your payment is secured with 256-bit SSL encryption
                  </div>
                </div>
              </div>
            </>
          )}

          {/* OTP Modal */}
          {showOTPModal && (
            <>
              <div className="conversion-overlay" onClick={closeOTPModal}></div>
              <div className="otp-modal">
                <div className="otp-header">
                  <div className="otp-icon">📱</div>
                  <h2>Enter OTP</h2>
                  <p>We've sent a 6-digit code to your phone number</p>
                </div>

                <div className="otp-inputs">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      className="otp-input"
                    />
                  ))}
                </div>

                <button className="resend-otp">
                  Didn't receive code? <span>Resend OTP</span>
                </button>

                <button
                  className="verify-otp-btn"
                  onClick={verifyOTP}
                  disabled={processingPayment}
                >
                  {processingPayment ? (
                    <>
                      <span className="spinner"></span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Verify & Complete Payment
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Add Funds Modal */}
          {showAddFundsModal && (
            <>
              <div className="conversion-overlay" onClick={closeAddFundsModal}></div>
              <div className="add-funds-modal">
                <div className="add-funds-header">
                  <h2>Add Funds</h2>
                  <button className="close-btn" onClick={closeAddFundsModal}>
                    <X size={24} />
                  </button>
                </div>

                <div className="add-funds-content">
                  {/* Amount Input */}
                  <div className="amount-input-section">
                    <label>Enter Amount</label>
                    <div className="amount-input-wrapper">
                      <span className="currency-symbol">₦</span>
                      <input
                        type="number"
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                        placeholder="0.00"
                        className="amount-input"
                        min="100"
                      />
                    </div>
                    <p className="input-hint">Minimum amount: ₦100</p>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="quick-amounts">
                    <button onClick={() => setFundAmount('5000')} className="quick-amount-btn">
                      ₦5,000
                    </button>
                    <button onClick={() => setFundAmount('10000')} className="quick-amount-btn">
                      ₦10,000
                    </button>
                    <button onClick={() => setFundAmount('20000')} className="quick-amount-btn">
                      ₦20,000
                    </button>
                    <button onClick={() => setFundAmount('50000')} className="quick-amount-btn">
                      ₦50,000
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="payment-methods-section">
                    <h3>Select Payment Method</h3>
                    <div className="payment-methods-grid">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`payment-method-card ${selectedPaymentMethod === method.id ? 'selected' : ''}`}
                          onClick={() => handlePaymentMethodSelect(method.id)}
                        >
                          <div className="payment-method-icon">{method.icon}</div>
                          <div className="payment-method-info">
                            <h4>{method.name}</h4>
                            <p className="payment-description">{method.description}</p>
                            <div className="payment-meta">
                              <span className="payment-fee">{method.fee}</span>
                              <span className="payment-time">⏱ {method.processingTime}</span>
                            </div>
                          </div>
                          <div className="payment-check">
                            {selectedPaymentMethod === method.id && <CheckCircle size={20} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  {fundAmount && selectedPaymentMethod && (
                    <div className="payment-summary">
                      <div className="summary-row">
                        <span>Amount:</span>
                        <span className="summary-amount">₦{parseFloat(fundAmount).toLocaleString()}</span>
                      </div>
                      {selectedPaymentMethod === 'card' && fundAmount && (
                        <div className="summary-row">
                          <span>Transaction Fee:</span>
                          <span>₦{(50 + (parseFloat(fundAmount) * 0.015)).toFixed(2)}</span>
                        </div>
                      )}
                      {selectedPaymentMethod === 'airtime' && fundAmount && (
                        <div className="summary-row">
                          <span>Conversion Fee (5%):</span>
                          <span>₦{(parseFloat(fundAmount) * 0.05).toFixed(2)}</span>
                        </div>
                      )}
                      {selectedPaymentMethod === 'crypto' && fundAmount && (
                        <div className="summary-row">
                          <span>Conversion Fee (2%):</span>
                          <span>₦{(parseFloat(fundAmount) * 0.02).toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Proceed Button */}
                  <button
                    className="proceed-payment-btn"
                    onClick={proceedToPayment}
                    disabled={!fundAmount || !selectedPaymentMethod}
                  >
                    Proceed to Payment
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Success Message Card */}
          {showSuccessMessage && (
            <div className="success-message-card">
              <div className="success-icon-large">
                <CheckCircle size={48} />
              </div>
              <h3>Conversion Successful!</h3>
              <p>Your items will be delivered within 3-5 business days.</p>
              <div className="success-details">
                <div className="success-detail-item">
                  <span className="detail-label">Amount Converted:</span>
                  <span className="detail-value">₦{stockAmount.toLocaleString()}</span>
                </div>
                <div className="success-detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">
                    {stockCategory === 'groceries' ? 'Groceries' : 
                     stockCategory === 'farmProduce' ? 'Farm Produce' : 
                     'Seafoods'}
                  </span>
                </div>
                <div className="success-detail-item">
                  <span className="detail-label">Vendor:</span>
                  <span className="detail-value">
                    {stockCategory === 'groceries' ? 'ShopRite' : 
                     stockCategory === 'farmProduce' ? 'Fresh Farms Market' : 
                     'Ocean Fresh Seafoods'}
                  </span>
                </div>
              </div>
              <button 
                className="close-success-btn" 
                onClick={() => setShowSuccessMessage(false)}
              >
                Close
              </button>
            </div>
          )}

          {/* Conversion Summary Modal */}
          {showConversionSummary && (
            <>
              <div className="conversion-overlay" onClick={cancelConversion}></div>
              <div className="conversion-summary-card">
                <div className="conversion-summary-header">
                  <h2>Conversion Summary</h2>
                  <button className="close-btn" onClick={cancelConversion}>
                    <X size={24} />
                  </button>
                </div>

                <div className="conversion-details">
                  <div className="conversion-row">
                    <span className="conversion-label">Total Balance Available</span>
                    <span className="conversion-value">₦{user.availableToStock.toLocaleString()}</span>
                  </div>

                  <div className="conversion-row highlight">
                    <span className="conversion-label">Amount to Convert</span>
                    <span className="conversion-value large">₦{stockAmount.toLocaleString()}</span>
                  </div>

                  <div className="conversion-row">
                    <span className="conversion-label">Category</span>
                    <span className="conversion-value">
                      {stockCategory === 'groceries' ? '🛒 Groceries' : 
                       stockCategory === 'farmProduce' ? '📦 Farm Produce' : 
                       '🛍️ Seafoods'}
                    </span>
                  </div>

                  <div className="conversion-row">
                    <span className="conversion-label">Conversion Rate</span>
                    <span className="conversion-value rate">
                      {(getConversionRate(stockCategory) * 100).toFixed(0)}% value
                      <small>Wholesale conversion (logistics + vendor discount)</small>
                      <span className="rate-info">
                        (₦{(stockAmount * getConversionRate(stockCategory)).toLocaleString()} worth of goods)
                      </span>
                    </span>
                  </div>

                  <div className="conversion-countdown">
                    <div className="countdown-icon">
                      <Clock size={20} />
                    </div>
                    <div className="countdown-content">
                      <span className="countdown-label">Price Lock Expires In</span>
                      <span className={`countdown-timer ${timeRemaining < 60 ? 'warning' : ''}`}>
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  </div>

                  <div className="conversion-items">
                    <h4>Items You'll Receive:</h4>
                    <ul className="items-list">
                      {generateGroceryList(stockAmount, stockCategory).map((item, index) => (
                        <li key={index}>
                          <CheckCircle size={16} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="conversion-vendor">
                    <Package size={18} />
                    <span>
                      Vendor: {stockCategory === 'groceries' ? 'ShopRite' : 
                               stockCategory === 'farmProduce' ? 'Fresh Farms Market' : 
                               'Ocean Fresh Seafoods'}
                    </span>
                  </div>
                </div>

                <div className="conversion-actions">
                  <button className="cancel-btn" onClick={cancelConversion}>
                    Cancel
                  </button>
                  <button className="confirm-btn" onClick={confirmConversion}>
                    <CheckCircle size={20} />
                    Confirm Conversion
                  </button>
                </div>

                <p className="conversion-note">
                  * By confirming, you agree to lock this amount for conversion. This action cannot be reversed.
                </p>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════════════════ */}
          {/* CONVERT TO GROCERIES MODAL                          */}
          {/* ═══════════════════════════════════════════════════ */}
          {showConvertModal && (
            <>
              <div className="conversion-overlay" onClick={() => setShowConvertModal(false)}></div>
              <div className="conversion-summary-card">
                <div className="conversion-summary-header">
                  <h2>Convert to Groceries</h2>
                  <button className="close-btn" onClick={() => setShowConvertModal(false)}><X size={24} /></button>
                </div>

                {/* Category */}
                <div className="category-selector" style={{marginBottom: '1.25rem'}}>
                  {[
                    { key: 'groceries',  icon: '🛒', label: 'Groceries',    vendor: 'ShopRite' },
                    { key: 'farmProduce',icon: '🌾', label: 'Farm Produce', vendor: 'Fresh Farms' },
                    { key: 'seafoods',   icon: '🦐', label: 'Seafoods',     vendor: 'Ocean Fresh' },
                  ].map(c => (
                    <button
                      key={c.key}
                      className={`category-btn ${convertCategory === c.key ? 'active' : ''}`}
                      onClick={() => setConvertCategory(c.key)}
                    >
                      <span>{c.icon}</span> {c.label}
                    </button>
                  ))}
                </div>

                {/* Amount slider */}
                <div className="amount-selector" style={{marginBottom: '1.25rem'}}>
                  <label>Amount to Convert</label>
                  <input
                    type="range"
                    min="5000"
                    max={user.availableToStock || 5000}
                    step="1000"
                    value={Math.min(convertAmount, user.availableToStock || 5000)}
                    onChange={e => setConvertAmount(Number(e.target.value))}
                    className="amount-slider"
                  />
                  <div className="amount-display">₦{convertAmount.toLocaleString()}</div>
                  <p style={{fontSize:'0.75rem', color:'#64748b', marginTop:'0.25rem'}}>
                    Available: ₦{user.availableToStock.toLocaleString()}
                  </p>
                </div>

                {/* Preview list */}
                <div className="conversion-details">
                  <div className="conversion-row">
                    <span className="conversion-label">Vendor</span>
                    <span className="conversion-value">
                      {convertCategory === 'groceries' ? 'ShopRite' : convertCategory === 'farmProduce' ? 'Fresh Farms Market' : 'Ocean Fresh Seafoods'}
                    </span>
                  </div>
                  <div className="conversion-row highlight">
                    <span className="conversion-label">You'll Receive (est.)</span>
                    <span className="conversion-value large">₦{(convertAmount * getConversionRate(convertCategory)).toLocaleString()}</span>
                  </div>
                </div>

                <div className="conversion-items" style={{marginTop:'1rem'}}>
                  <h4>Auto-Generated List:</h4>
                  <ul className="items-list">
                    {generateGroceryList(convertAmount, convertCategory).map((item, i) => (
                      <li key={i}><CheckCircle size={16} />{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="conversion-actions" style={{marginTop:'1.5rem'}}>
                  <button className="cancel-btn" onClick={() => setShowConvertModal(false)}>Cancel</button>
                  <button className="confirm-btn" onClick={() => {
                    setStockCategory(convertCategory);
                    setStockAmount(convertAmount);
                    setShowConvertModal(false);
                    setTimeout(() => {
                      setConversionData({
                        amount: convertAmount,
                        category: convertCategory,
                        items: generateGroceryList(convertAmount, convertCategory),
                        vendor: getVendorName(convertCategory)
                      });
                      setTimeRemaining(900);
                      setShowConversionSummary(true);
                    }, 100);
                  }}>
                    <CheckCircle size={20} />
                    Proceed to Confirm
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════════════════ */}
          {/* VIEW STOCK LIST MODAL                              */}
          {/* ═══════════════════════════════════════════════════ */}
          {showStockListModal && (
            <>
              <div className="conversion-overlay" onClick={() => setShowStockListModal(false)}></div>
              <div className="stock-list-modal">
                <div className="conversion-summary-header">
                  <h2>My Stock List</h2>
                  <button className="close-btn" onClick={() => setShowStockListModal(false)}><X size={24} /></button>
                </div>

                <p style={{fontSize:'0.8rem', color:'#64748b', marginBottom:'1.25rem'}}>
                  Active and pending grocery conversions
                </p>

                <div className="stock-list-items">
                  {transactions.filter(t => t.status === 'Converted' || t.status === 'Delivered').length === 0 ? (
                    <div className="stock-list-empty">
                      <Package size={40} style={{color:'#d1d5db', marginBottom:'0.75rem'}} />
                      <p>No stock orders yet</p>
                      <span>Convert your savings to see items here</span>
                    </div>
                  ) : (
                    transactions.filter(t => t.status === 'Converted' || t.status === 'Delivered').map(tx => (
                      <div key={tx.id} className="stock-list-row">
                        <div className={`stock-status-icon ${tx.status.toLowerCase()}`}>
                          {tx.status === 'Converted' ? <ShoppingCart size={18} /> : <Package size={18} />}
                        </div>
                        <div className="stock-list-info">
                          <p className="stock-list-type">{tx.type}</p>
                          <span className="stock-list-date">{tx.date}</span>
                        </div>
                        <div className="stock-list-right">
                          <p className="stock-list-amount">₦{tx.amount.toLocaleString()}</p>
                          <span className={`transaction-status ${tx.status.toLowerCase()}`}>{tx.status}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Summary */}
                <div className="stock-list-summary">
                  <div className="stock-sum-row">
                    <span>Total Converted</span>
                    <strong>₦{transactions.filter(t=>t.status==='Converted').reduce((s,t)=>s+t.amount,0).toLocaleString()}</strong>
                  </div>
                  <div className="stock-sum-row">
                    <span>Total Delivered</span>
                    <strong style={{color:'#10b981'}}>₦{transactions.filter(t=>t.status==='Delivered').reduce((s,t)=>s+t.amount,0).toLocaleString()}</strong>
                  </div>
                </div>

                <button className="close-success-btn" onClick={() => setShowStockListModal(false)}>Close</button>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════════════════ */}
          {/* LOCK SAVINGS MODAL                                 */}
          {/* ═══════════════════════════════════════════════════ */}
          {showLockModal && (
            <>
              <div className="conversion-overlay" onClick={() => { setShowLockModal(false); setLockSuccess(false); setLockPin(''); setLockConfirmPin(''); setLockAmountInput(''); setLockBucket(''); setLockDuration(''); }}></div>
              <div className="conversion-summary-card">
                {lockSuccess ? (
                  <div style={{textAlign:'center', padding:'1rem 0'}}>
                    <div className="success-icon-large" style={{margin:'0 auto 1rem'}}>
                      <CheckCircle size={48} />
                    </div>
                    <h3 style={{fontSize:'1.375rem', fontWeight:700, color:'#1e293b', marginBottom:'0.5rem'}}>Savings Locked!</h3>
                    <p style={{color:'#64748b', marginBottom:'1.5rem'}}>
                      ₦{Number(lockAmountInput).toLocaleString()} has been locked for {lockDuration}.
                    </p>
                    <button className="confirm-btn" style={{width:'100%'}} onClick={() => {
                      setShowLockModal(false);
                      setLockSuccess(false);
                      setLockPin(''); setLockConfirmPin('');
                      setLockAmountInput(''); setLockBucket(''); setLockDuration('');
                    }}>Done</button>
                  </div>
                ) : (
                  <>
                    <div className="conversion-summary-header">
                      <h2>Lock Savings</h2>
                      <button className="close-btn" onClick={() => { setShowLockModal(false); setLockPin(''); setLockConfirmPin(''); setLockAmountInput(''); setLockBucket(''); setLockDuration(''); }}><X size={24} /></button>
                    </div>

                    <div className="conversion-details">
                      {/* Bucket selector */}
                      <div className="form-group" style={{marginBottom:'1rem'}}>
                        <label style={{fontSize:'0.875rem', fontWeight:600, color:'#1e293b', display:'block', marginBottom:'0.5rem'}}>
                          Select Savings Bucket *
                        </label>
                        <select
                          value={lockBucket}
                          onChange={e => setLockBucket(e.target.value)}
                          className="card-input"
                          style={{width:'100%'}}
                        >
                          <option value="">-- Choose a bucket --</option>
                          {buckets.filter(b => !b.locked).map(b => (
                            <option key={b.id} value={b.id}>
                              {b.name} — ₦{b.balance.toLocaleString()} available
                            </option>
                          ))}
                        </select>
                        {buckets.filter(b=>!b.locked).length === 0 && (
                          <p style={{color:'#f59e0b', fontSize:'0.75rem', marginTop:'0.375rem'}}>All buckets are already locked.</p>
                        )}
                      </div>

                      {/* Amount */}
                      <div className="form-group" style={{marginBottom:'1rem'}}>
                        <label style={{fontSize:'0.875rem', fontWeight:600, color:'#1e293b', display:'block', marginBottom:'0.5rem'}}>
                          Amount to Lock *
                        </label>
                        <div className="amount-input-wrapper">
                          <span className="currency-symbol">₦</span>
                          <input
                            type="number"
                            value={lockAmountInput}
                            onChange={e => setLockAmountInput(e.target.value)}
                            placeholder="0.00"
                            className="amount-input"
                            min="500"
                          />
                        </div>
                        {lockBucket && (
                          <p style={{fontSize:'0.75rem', color:'#64748b', marginTop:'0.25rem'}}>
                            Max: ₦{(buckets.find(b=>String(b.id)===String(lockBucket))?.balance || 0).toLocaleString()}
                          </p>
                        )}
                      </div>

                      {/* Lock duration */}
                      <div className="form-group" style={{marginBottom:'1rem'}}>
                        <label style={{fontSize:'0.875rem', fontWeight:600, color:'#1e293b', display:'block', marginBottom:'0.5rem'}}>
                          Lock Duration *
                        </label>
                        <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'0.5rem'}}>
                          {['1 Month', '3 Months', '6 Months', '12 Months'].map(d => (
                            <button
                              key={d}
                              onClick={() => setLockDuration(d)}
                              style={{
                                padding:'0.625rem',
                                border: lockDuration === d ? '2px solid #000' : '1px solid #e5e7eb',
                                borderRadius:'0.5rem',
                                background: lockDuration === d ? '#000' : '#fff',
                                color: lockDuration === d ? '#fff' : '#374151',
                                fontWeight: lockDuration === d ? 700 : 500,
                                fontSize:'0.8rem',
                                cursor:'pointer',
                                transition:'all 0.15s'
                              }}
                            >{d}</button>
                          ))}
                        </div>
                      </div>

                      {/* PIN */}
                      <div className="form-group" style={{marginBottom:'0.75rem'}}>
                        <label style={{fontSize:'0.875rem', fontWeight:600, color:'#1e293b', display:'block', marginBottom:'0.5rem'}}>
                          Transaction PIN *
                        </label>
                        <input
                          type="password"
                          value={lockPin}
                          onChange={e => setLockPin(e.target.value.replace(/\D/,'').slice(0,4))}
                          placeholder="••••"
                          maxLength={4}
                          className="card-input"
                          style={{width:'100%'}}
                        />
                      </div>
                      <div className="form-group" style={{marginBottom:'1rem'}}>
                        <label style={{fontSize:'0.875rem', fontWeight:600, color:'#1e293b', display:'block', marginBottom:'0.5rem'}}>
                          Confirm PIN *
                        </label>
                        <input
                          type="password"
                          value={lockConfirmPin}
                          onChange={e => setLockConfirmPin(e.target.value.replace(/\D/,'').slice(0,4))}
                          placeholder="••••"
                          maxLength={4}
                          className="card-input"
                          style={{width:'100%'}}
                        />
                        {lockPin && lockConfirmPin && lockPin !== lockConfirmPin && (
                          <p style={{color:'#ef4444', fontSize:'0.75rem', marginTop:'0.25rem'}}>PINs do not match</p>
                        )}
                      </div>

                      <div style={{background:'#fffbeb', border:'1px solid #fde68a', borderRadius:'0.5rem', padding:'0.75rem', fontSize:'0.78rem', color:'#92400e', marginBottom:'1rem'}}>
                        🔒 Locked savings cannot be withdrawn before the lock period ends.
                      </div>
                    </div>

                    <div className="conversion-actions">
                      <button className="cancel-btn" onClick={() => { setShowLockModal(false); setLockPin(''); setLockConfirmPin(''); setLockAmountInput(''); setLockBucket(''); setLockDuration(''); }}>
                        Cancel
                      </button>
                      <button
                        className="confirm-btn"
                        disabled={!lockBucket || !lockAmountInput || !lockDuration || lockPin.length !== 4 || lockPin !== lockConfirmPin}
                        style={{opacity: (!lockBucket || !lockAmountInput || !lockDuration || lockPin.length !== 4 || lockPin !== lockConfirmPin) ? 0.5 : 1}}
                        onClick={() => {
                          const amount = Number(lockAmountInput);
                          const bucket = buckets.find(b => String(b.id) === String(lockBucket));
                          if (!bucket || amount > bucket.balance || amount < 500) {
                            alert('Invalid amount. Check your bucket balance.');
                            return;
                          }
                          // Lock the bucket and deduct amount
                          setBuckets(prev => prev.map(b =>
                            String(b.id) === String(lockBucket)
                              ? { ...b, locked: true, balance: b.balance - amount }
                              : b
                          ));
                          setUser(prev => ({
                            ...prev,
                            lockedSavings: prev.lockedSavings + amount,
                            availableToStock: Math.max(0, prev.availableToStock - amount),
                          }));
                          setTransactions(prev => [{
                            id: Date.now(),
                            type: 'Locked',
                            amount,
                            date: new Date().toLocaleDateString('en-NG'),
                            status: 'Locked'
                          }, ...prev]);
                          setLockSuccess(true);
                        }}
                      >
                        <Lock size={18} /> Lock Now
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* Account Summary Card */}
          <div className="account-summary-card">
            <div className="summary-header">
              <h2>Account Summary</h2>
              <div className="countdown-badge">
                <Calendar size={16} />
                <span>Next stock: {user.nextStockDate}</span>
              </div>
            </div>
            
            <div className="balance-grid">
              <div className="balance-item">
                <span className="balance-label">Total Balance</span>
                <h3 className="balance-amount">₦{user.totalBalance.toLocaleString()}</h3>
              </div>
              <div className="balance-item">
                <span className="balance-label">Locked Savings</span>
                <h3 className="balance-amount locked">₦{user.lockedSavings.toLocaleString()}</h3>
              </div>
              <div className="balance-item">
                <span className="balance-label">Available to Stock</span>
                <h3 className="balance-amount available">₦{user.availableToStock.toLocaleString()}</h3>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-header">
                <span>Savings Progress</span>
                <span className="progress-percentage">
                  {user.totalBalance > 0
                    ? Math.min(100, Math.round((user.lockedSavings / user.totalBalance) * 100))
                    : 0}%
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: user.totalBalance > 0
                      ? `${Math.min(100, Math.round((user.lockedSavings / user.totalBalance) * 100))}%`
                      : '0%'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="primary-actions">
            <button className="action-btn primary" onClick={handleAddFunds}>
              <Plus size={20} />
              <span>Add Funds</span>
            </button>
            <button className="action-btn secondary" onClick={() => setShowConvertModal(true)}>
              <ShoppingCart size={20} />
              <span>Convert to Groceries</span>
            </button>
            <button className="action-btn accent" onClick={() => setShowLockModal(true)}>
              <Lock size={20} />
              <span>Lock Savings</span>
            </button>
            <button className="action-btn disabled" disabled>
              <ArrowRight size={20} />
              <span>Withdraw</span>
            </button>
            <button className="action-btn outline" onClick={() => setShowStockListModal(true)}>
              <Package size={20} />
              <span>View Stock List</span>
            </button>
          </div>

          {/* Savings Buckets */}
          <div className="savings-buckets">
            <h3 className="section-title">Savings Buckets</h3>
            <div className="buckets-grid">
              {buckets.map(bucket => (
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

          {/* Main Content — single column */}
          <div className="single-column-layout">
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
                    max={user.availableToStock || 5000} 
                    step="1000"
                    value={Math.min(stockAmount, user.availableToStock || 5000)}
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
                  <button className="convert-btn" onClick={handleConvertNow}>
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
          </div>
        </div>

        {/* Bottom Navigation (Mobile) */}
        <nav className="bottom-nav">
          {bottomNavItems.map(item => (
            <button
              key={item.key}
              className={`bottom-nav-item ${activeBottomNav === item.key ? 'active' : ''}`}
              onClick={() => {
                if (item.path) {
                  navigate(item.path);
                } else {
                  setActiveBottomNav(item.key);
                }
              }}
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