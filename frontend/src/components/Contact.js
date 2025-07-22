import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <Navbar/>

      <main className="contact-page__container">
        <h1 className="contact-page__title">Contact Us</h1>
        <p className="contact-page__subtitle">
          Have questions or need support? We're here to help you get the most out of Crypto-Crowd.
        </p>

        <div className="contact-page__grid">
          <div className="contact-page__info">
            <h2 className="contact-page__info-title">Get in Touch</h2>
            <div className="contact-page__info-item">
              <FaEnvelope className="contact-page__info-icon" />
              <div className="contact-page__info-content">
                <span className="contact-page__info-label">Email Us</span>
                <p className="contact-page__info-text">support@cryptocrowd.com</p>
              </div>
            </div>
            <div className="contact-page__info-item">
              <FaPhone className="contact-page__info-icon" />
              <div className="contact-page__info-content">
                <span className="contact-page__info-label">Call Us</span>
                <p className="contact-page__info-text">+1 (800) 555-1234</p>
              </div>
            </div>
            <div className="contact-page__info-item">
              <FaMapMarkerAlt className="contact-page__info-icon" />
              <div className="contact-page__info-content">
                <span className="contact-page__info-label">Visit Us</span>
                <p className="contact-page__info-text">123 Blockchain Avenue<br />Silicon Valley, CA 94043<br />United States</p>
              </div>
            </div>

            <h3 className="contact-page__social-title">Connect With Us</h3>
            <div className="contact-page__social-links">
              <a href="#" className="contact-page__social-link"><FaFacebookF /></a>
              <a href="#" className="contact-page__social-link"><FaTwitter /></a>
              <a href="#" className="contact-page__social-link"><FaLinkedinIn /></a>
              <a href="#" className="contact-page__social-link"><FaInstagram /></a>
            </div>
          </div>

          <form className="contact-page__form">
            <h2 className="contact-page__form-title">Send Us a Message</h2>
            <div className="contact-page__form-row">
              <input type="text" className="contact-page__form-input" placeholder="Your Name" />
              <input type="email" className="contact-page__form-input"
              id="email-input"
               placeholder="Email Address" />
            </div>
            <input type="text" className="contact-page__form-input" placeholder="Subject" />
            <textarea rows="6" className="contact-page__form-textarea" placeholder="Message"></textarea>
            <div className="contact-page__form-checkbox">
              <input type="checkbox" id="privacy" className="contact-page__form-checkbox-input" />
              <label htmlFor="privacy" className="contact-page__form-checkbox-label">
                I agree to the <a href="#" className="contact-page__form-link">Privacy Policy</a> and consent to be contacted about my inquiry.
              </label>
            </div>
            <button type="submit" className="contact-page__form-submit">Send Message</button>
          </form>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default Contact;