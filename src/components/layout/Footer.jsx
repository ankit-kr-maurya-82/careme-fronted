import React from "react";
import { Link } from "react-router-dom";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo + About */}
        <div className="footer-section">
          <h2 className="footer-logo">CareMe</h2>
          <p>
            Smart digital healthcare platform helping patients track health,
            connect with doctors, and improve daily lifestyle.
          </p>
        </div>
 
        {/* Quick Links */}
        <div className="footer-section">
          <h3>Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/feature">Features</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Social</h3>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>

        {/* Developer Tools */}
        <div className="footer-section">
          <h3>Developer</h3>
          <ul>
            <li><Link to="/github">Github</Link></li>
            <li><Link to="/linkedin">LinkedIn</Link></li>
            {/* <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Twitter</a></li> */}
          </ul>
        </div>

        {/* Policies */}
        <div className="footer-section">
          <h3>Policies</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CareMe. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
