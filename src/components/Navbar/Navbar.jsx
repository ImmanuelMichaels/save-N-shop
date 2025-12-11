import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; 
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Save 'n' Shop</div>
      <div className="nav-links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><HashLink smooth to="/#hiw-section">How it works</HashLink></li>
          <li><HashLink smooth to="/#benefit-section">What's Inside</HashLink></li>
          <li><HashLink smooth to="/#pricing-section">Pricing</HashLink></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
      </div>
      <div className="button">
        <Link to="/login"><button id='login'>Login</button></Link>
        <Link to="/signup"><button id='signup'>Open Account</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;