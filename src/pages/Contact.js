import React from 'react';
import '../styles/Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      
      <div className="contact-info">
        <p><strong>📞 Phone:</strong> +123 456 7890</p>
        <p><strong>📸 Instagram:</strong> <a href="https://instagram.com/galaxy.gym" target="_blank" rel="noopener noreferrer">@galaxy.gym</a></p>
      </div>

      <div className="map-container">
        <iframe
          title="Gym Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160991508!2d72.74109995310857!3d19.08219783937414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63adf646e2d%3A0xc2e97c57e77e059b!2sGym!5e0!3m2!1sen!2s!4v1661554368290!5m2!1sen!2s"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
