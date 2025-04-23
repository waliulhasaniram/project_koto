import styled from "styled-components"; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCcVisa,  FaCcMastercard, FaCcApplePay, FaPaypal } from 'react-icons/fa';
import { NavLink } from "react-router";

const Footer = () => {
    const date = new Date();
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><NavLink to="/about">About Us</NavLink> </li>
              <li><NavLink to="">Blog</NavLink> </li>
              <li><NavLink to="/about">Career</NavLink> </li>
              <li><NavLink to="/about">press</NavLink> </li>
            </ul>
          </div>
  
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><NavLink to="/contact">Help center</NavLink> </li>
              <li><NavLink to="/about">Safety Information</NavLink> </li>
              <li><NavLink to="/contact">Cancellation Policy</NavLink> </li>
              <li><NavLink to="/contact">Contact us</NavLink> </li>
            </ul>
          </div>
  
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Accessibility</a></li>
              <li><a href="#">Site Map</a></li>
            </ul>
          </div>
  
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
            <div className="social-icons">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>
        </div>
  
        <div className="footer-bottom">
          <p>© {date.getFullYear()} KoTo Team. All rights reserved</p>
          <div className="payment-methods">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcApplePay />
            <FaPaypal />
          </div>
        </div>
      </footer>
    );
  };


export default Footer
