import React from "react";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "./css/Contact.css";

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-info">
          <p className="contact-kicker">Contact CareMe</p>
          <h2>Talk to our team</h2>
          <p className="contact-sub">
            Questions about appointments, platform access, or support? Send us a message and we will respond shortly.
          </p>

          <div className="contact-info-grid">
            <article className="contact-info-card">
              <FaEnvelope className="contact-info-icon" />
              <div>
                <h4>Email</h4>
                <p>ankitkrmaurya82@gmail.com</p>
              </div>
            </article>

            <article className="contact-info-card">
              <FaPhoneAlt className="contact-info-icon" />
              <div>
                <h4>Phone</h4>
                <p>+91 9555154346</p>
              </div>
            </article>

            <article className="contact-info-card">
              <FaMapMarkerAlt className="contact-info-icon" />
              <div>
                <h4>Location</h4>
                <p>Kota, India</p>
              </div>
            </article>
          </div>

          <div className="social-icons">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send Message</h3>

          <form>
            <label htmlFor="contact-name">Full Name</label>
            <input id="contact-name" type="text" placeholder="Enter your full name" required />

            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" type="email" placeholder="Enter your email address" required />

            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" placeholder="Tell us how we can help" rows="5" />

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
