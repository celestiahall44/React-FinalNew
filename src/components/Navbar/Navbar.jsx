import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'


function Navbar() {
    const navigate = useNavigate()
    
    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }
  return (
    <div className="navbar">
        <div className="navbar-left">
            <img src= {logo} alt="logo" />
            <ul>
                <li>Home</li>
                <li>Explore</li>
                <li>Contact</li>
            </ul>
        </div>
        <div className="navbar-right">
            <div className="navbar-profile">
                <img src={profile_img} alt="profile" className="profile" />
                <img src={caret_icon} alt="dropdown" />
                <div className="dropdown">
                    <p onClick={handleLogout}>Sign out</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
