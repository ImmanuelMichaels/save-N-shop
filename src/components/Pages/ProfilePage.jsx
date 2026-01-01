import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Bell,
  Search,
  User,
  Settings,
  LogOut
} from "lucide-react";

const ProfilePage = () => {
  const user = {
    name: "Adebayo Johnson",
    email: "adebayo.j@email.com",
    phone: "+234 801 234 5678",
    location: "Lagos, Nigeria"
  };

  return (
    <main className="main-content expanded">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="nav-left">
          <h1 className="welcome-text">
            Profile — <span className="welcome-name">{user.name.split(" ")[0]}</span>
          </h1>
        </div>

        <div className="nav-right">
          {/* Search Box */}
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
          </div>

          {/* Notifications (static for now) */}
          <button className="icon-btn">
            <Bell size={20} />
            <span className="notification-badge"></span>
          </button>

          {/* Profile */}
          <div className="profile-section">
            <div className="profile-btn">
              <div className="profile-avatar">
                {user.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="profile-info">
                <div className="profile-name">{user.name}</div>
                <div className="profile-email">{user.email}</div>
              </div>
            </div>

            <div className="profile-dropdown show">
              <button className="dropdown-item">
                <Settings size={18} />
                <span>Settings</span>
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" style={{ color: "#ef4444" }}>
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
          <h2>{user.name}</h2>

          <div className="profile-meta">
            <p><Mail size={16} /> {user.email}</p>
            <p><Phone size={16} /> {user.phone}</p>
            <p><MapPin size={16} /> {user.location}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
