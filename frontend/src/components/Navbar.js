import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaHandsHelping,
  FaNewspaper,
  FaPhoneAlt,
  FaSignInAlt,
  FaUserPlus,
  FaTimes,
  FaBars
} from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <nav className="homepage__navbar">
      <div className="homepage__logo">🚀 Crypto-Crowd</div>

      {/* Hamburger Menu Button */}
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Links */}
      <ul className={`homepage__navLinks ${isOpen ? 'open' : ''}`}>
        <li>
          <Link
            to="/"
            className={currentPath === "/" ? "active-link" : ""}
            onClick={closeMenu}
          >
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={currentPath === "/about" ? "active-link" : ""}
            onClick={closeMenu}
          >
            <FaInfoCircle /> About
          </Link>
        </li>
        <li>
          <Link
            to="/how-it-works"
            className={currentPath === "/how-it-works" ? "active-link" : ""}
            onClick={closeMenu}
          >
            <FaCogs /> How It Works
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            className={currentPath === "/services" ? "active-link" : ""}
            onClick={closeMenu}
          >
            <FaHandsHelping /> Services
          </Link>
        </li>
        <li>
          <Link
            to="/blog"
            className={currentPath === "/blog" ? "active-link" : ""}
            onClick={closeMenu}
          >
            <FaNewspaper /> Blog
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={currentPath === "/contact" ? "active-link" : ""}
            onClick={closeMenu}
          >
            <FaPhoneAlt /> Contact
          </Link>
        </li>
      </ul>

      {/* Auth Buttons */}
      <div className={`homepage__actions ${isOpen ? 'open' : ''}`}>
        <Link 
          to="/login" 
          className="homepage__btn"
          onClick={closeMenu}
        >
          <FaSignInAlt /> Login
        </Link>
        <Link 
          to="/signup" 
          className="homepage__btn homepage__btn--outline"
          onClick={closeMenu}
        >
          <FaUserPlus /> Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;