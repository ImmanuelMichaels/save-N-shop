import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Bell, Search, Settings, LogOut } from "lucide-react";

const ProfilePage = ({ user, onLogout }) => {
  const navigate = useNavigate();

  // Fallback so the page never crashes if props aren't passed yet
  const displayUser = user || {
    name: "Guest User",
    email: "—",
    phone: "—",
    location: "—",
  };

  const handleLogout = () => {
    onLogout();           // clears user in App
    navigate("/login");   // send them back to login
  };

  return (
    <main className="main-content expanded">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="nav-left">
          <h1 className="welcome-text">
            Profile —{" "}
            <span className="welcome-name">
              {displayUser.name.split(" ")[0]}
            </span>
          </h1>
        </div>

        <div className="nav-right">
          {/* Search Box */}
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input type="text" className="search-input" placeholder="Search..." />
          </div>

          {/* Notifications */}
          <button className="icon-btn">
            <Bell size={20} />
            <span className="notification-badge"></span>
          </button>

          {/* Profile dropdown */}
          <div className="profile-section">
            <div className="profile-btn">
              <div className="profile-avatar">
                {displayUser.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="profile-info">
                <div className="profile-name">{displayUser.name}</div>
                <div className="profile-email">{displayUser.email}</div>
              </div>
            </div>

            <div className="profile-dropdown show">
              <button className="dropdown-item">
                <Settings size={18} />
                <span>Settings</span>
              </button>
              <div className="dropdown-divider"></div>
              {/* ── Logout now actually works ── */}
              <button
                className="dropdown-item"
                style={{ color: "#ef4444" }}
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Body */}
      <section className="profile-body">
        <div className="profile-card">
          <h2>{displayUser.name}</h2>

          <div className="profile-meta">
            <p><Mail size={16} /> {displayUser.email}</p>
            <p><Phone size={16} /> {displayUser.phone}</p>
            <p><MapPin size={16} /> {displayUser.location}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
