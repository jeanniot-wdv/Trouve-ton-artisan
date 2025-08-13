import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          {/* Logo and description */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img 
                src="/assets/images/logo-white.svg" 
                alt="Trouve ton artisan - Retour à l'accueil"
                width="150"
                height="50"
              />
            </Link>
            <p className="footer-description">
              La plateforme officielle de la région Auvergne-Rhône-Alpes pour trouver et contacter les artisans locaux.
            </p>
          </div>

          {/* Navigation links */}
          <div className="footer-nav">
            <div className="footer-section">
              <h4 className="footer-section-title">Catégories</h4>
              <nav aria-label="Catégories d'artisans">
                <ul className="footer-links">
                  <li>
                    <Link to="/batiment" className="footer-link">
                      Bâtiment
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="footer-link">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/fabrication" className="footer-link">
                      Fabrication
                    </Link>
                  </li>
                  <li>
                    <Link to="/alimentation" className="footer-link">
                      Alimentation
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Pages légales</h4>
              <nav aria-label="Pages légales">
                <ul className="footer-links">
                  <li>
                    <Link to="/mentions-legales" className="footer-link">
                      Mentions légales
                    </Link>
                  </li>
                  <li>
                    <Link to="/donnees-personnelles" className="footer-link">
                      Données personnelles
                    </Link>
                  </li>
                  <li>
                    <Link to="/accessibilite" className="footer-link">
                      Accessibilité
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="footer-link">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Contact</h4>
              <div className="footer-contact">
                <address className="footer-address">
                  <strong>Antenne de Lyon</strong><br />
                  101 cours Charlemagne<br />
                  CS 20033<br />
                  69269 LYON CEDEX 02<br />
                  France
                </address>
                
                <div className="footer-phone">
                  <strong>Téléphone:</strong>
                  <a href="tel:+33426734000" className="footer-link">
                    +33 (0)4 26 73 40 00
                  </a>
                </div>

                <div className="footer-email">
                  <strong>Email:</strong>
                  <a href="mailto:contact@auvergnerhonealpes.fr" className="footer-link">
                    contact@auvergnerhonealpes.fr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} Région Auvergne-Rhône-Alpes. Tous droits réservés.
            </p>
            
            <div className="footer-social">
              <span className="footer-social-title">Suivez-nous:</span>
              <div className="footer-social-links">
                <a 
                  href="https://www.facebook.com/auvergnerhonealpes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Suivre la région Auvergne-Rhône-Alpes sur Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.77 7.46H15.5V5.46C15.5 4.43 15.77 3.85 17.42 3.85H18.92V0.85C18.92 0.85 17.65 0.85 16.89 0.85C14.24 0.85 12.5 2.32 12.5 5.05V7.46H9.5V10.96H12.5V24H15.5V10.96H18.27L18.77 7.46Z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://www.twitter.com/auvergnerhone" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Suivre la région Auvergne-Rhône-Alpes sur Twitter"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.95 4.57C23.08 4.94 22.15 5.19 21.17 5.29C22.19 4.68 22.97 3.71 23.34 2.54C22.4 3.11 21.36 3.51 20.26 3.73C19.37 2.77 18.13 2.19 16.75 2.19C13.82 2.19 11.49 4.76 11.49 7.97C11.49 8.33 11.53 8.68 11.6 9.01C7.55 8.82 4.02 6.52 1.64 3.04C1.25 3.81 1.03 4.68 1.03 5.62C1.03 7.4 1.94 8.94 3.32 9.83C2.49 9.81 1.71 9.6 1.02 9.25V9.31C1.02 12.14 2.81 14.48 5.29 14.93C4.91 15.04 4.51 15.09 4.09 15.09C3.8 15.09 3.53 15.07 3.26 15.02C3.82 17.33 5.74 19.04 8.11 19.08C6.35 20.44 4.09 21.24 1.64 21.24C1.27 21.24 0.91 21.22 0.55 21.18C2.95 22.6 5.81 23.41 8.88 23.41C16.75 23.41 21.05 15.17 21.05 8.5C21.05 8.31 21.05 8.12 21.04 7.93C22 7.24 22.83 6.38 23.45 5.39L23.95 4.57Z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://www.linkedin.com/company/region-auvergne-rhone-alpes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Suivre la région Auvergne-Rhône-Alpes sur LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.45 20.45H16.89V14.88C16.89 13.55 16.86 11.84 15.04 11.84C13.2 11.84 12.94 13.29 12.94 14.79V20.45H9.38V9H12.8V10.56H12.84C13.32 9.65 14.51 8.7 16.31 8.7C19.91 8.7 20.45 11.08 20.45 14.17V20.45ZM5.34 7.43C4.2 7.43 3.28 6.5 3.28 5.37C3.28 4.24 4.2 3.31 5.34 3.31C6.47 3.31 7.4 4.24 7.4 5.37C7.4 6.5 6.47 7.43 5.34 7.43ZM7.17 20.45H3.51V9H7.17V20.45ZM22.23 0H1.77C0.79 0 0 0.77 0 1.73V22.27C0 23.23 0.79 24 1.77 24H22.23C23.2 24 24 23.23 24 22.27V1.73C24 0.77 23.2 0 22.23 0Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;