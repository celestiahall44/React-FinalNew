import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <div className="footer">
      <img className="footer-logo" src={logo} alt="logo" />
      <ul className="footer-links">
        <li className="footer-link--anchor">Home</li>
        <li className="footer-link--anchor">Explore</li>
        <li className="footer-link--anchor">Contact</li>
      </ul>
      <p className="footer-text">© 2026 Flix. All rights reserved.</p>
    </div>
  )
}

export default Footer
