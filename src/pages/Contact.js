import React from 'react';
import '../styles/Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      
      <div className="contact-info">
        <p><strong>📞 Phone:</strong> +961 (76 083888)</p>
        <p><strong>📸 Instagram:</strong> <a href="https://instagram.com/galaxy.gym" target="_blank" rel="noopener noreferrer">@galaxy.gym</a></p>
      </div>

      <div className="map-container">
        <iframe
        title="Gym Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.124922885935!2d35.5015784!3d33.8864364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f178344bd47e1%3A0x1877ca864812fa32!2sGalaxy%20gym!5e0!3m2!1sen!2slb!4v1754606668059!5m2!1sen!2slb"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      </div>
    </div>
  );
}

export default Contact;
