import React from 'react'
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Footer.css'; 


const footer = () => {
  return (
    <div className="footer-container">
      <div className="logo-side">

      </div>

      <div className="footer-links">
        <ul className="footer-links-list">
          <li><Link to="/">Home</Link></li>
          <li><HashLink smooth to="/#hiw-section">How it works</HashLink></li>
          <li><HashLink smooth to="/#benefit-section">What's Inside</HashLink></li>
          <li><HashLink to="/#pricing-section">Pricing</HashLink></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
      </div>
      <div className="footer-links">
        <ul className="footer-links-list">
          <li><Link to="/">Privacy Policy</Link></li>
          <li><Link to="/">Terms of Service</Link></li>
          <li><Link to="/">Contact Us</Link></li>
        </ul>
      </div>
      <div className="footer-links"></div>
    </div>
  )
}

export default footer
