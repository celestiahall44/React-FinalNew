import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.png'
import { showLinkError } from '../../utils/showLinkError'

const Footer = () => {
  return (
    <div className="footer">
      <img className="footer-logo" src={logo} alt="logo" />
      <ul className="footer-links">
        <li className="footer-link--anchor" onClick={showLinkError}>Home</li>
        <li className="footer-link--anchor" onClick={showLinkError}>Explore</li>
        <li className="footer-link--anchor" onClick={showLinkError}>Contact</li>
      </ul>
      <p className="footer-text">© 2026 Flix. All rights reserved.</p>
    </div>
  )
}

export default Footer
