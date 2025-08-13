import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const scrollToSteps = () => {
    const stepsSection = document.getElementById('comment-trouver');
    if (stepsSection) {
      stepsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <section className="hero" role="banner">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-overlay"></div>
        <picture>
          <source 
            media="(min-width: 1200px)" 
            srcSet="/assets/images/hero-desktop.jpg 1200w, /assets/images/hero-desktop@2x.jpg 2400w"
          />
          <source 
            media="(min-width: 768px)" 
            srcSet="/assets/images/hero-tablet.jpg 768w, /assets/images/hero-tablet@2x.jpg 1536w"
          />
          <img 
            src="/assets/images/hero-mobile.jpg"
            srcSet="/assets/images/hero-mobile.jpg 375w, /assets/images/hero-mobile@2x.jpg 750w"
            alt=""
            className="hero-image"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Découvrez les artisans de votre région
            </h1>
            <p className="hero-subtitle">
              Trouvez facilement un artisan qualifié en Auvergne-Rhône-Alpes. 
              Contactez-les directement et obtenez une réponse sous 48h.
            </p>
          </div>

          <div className="hero-search">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Rechercher un artisan par nom..."
              className="hero-search-bar"
            />
            <p className="hero-search-help">
              Ou explorez par catégorie ci-dessous
            </p>
          </div>

          <div className="hero-categories">
            <Link 
              to="/batiment" 
              className="hero-category-card"
              aria-label="Voir tous les artisans du bâtiment"
            >
              <div className="category-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21H21M5 21V7L12 3L19 7V21M9 21V15H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="category-name">Bâtiment</span>
            </Link>

            <Link 
              to="/services" 
              className="hero-category-card"
              aria-label="Voir tous les artisans de services"
            >
              <div className="category-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3.09 8.26L12 14.52L20.91 8.26L12 2ZM12 14.52V22.78L20.91 16.52V8.26L12 14.52Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="category-name">Services</span>
            </Link>

            <Link 
              to="/fabrication" 
              className="hero-category-card"
              aria-label="Voir tous les artisans de fabrication"
            >
              <div className="category-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="category-name">Fabrication</span>
            </Link>

            <Link 
              to="/alimentation" 
              className="hero-category-card"
              aria-label="Voir tous les artisans d'alimentation"
            >
              <div className="category-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 2V8C3 9.1 3.9 10 5 10S7 9.1 7 8V2M7 10V22M17 2V22M12 2C10.9 2 10 2.9 10 4S10.9 6 12 6 14 5.1 14 4 13.1 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="category-name">Alimentation</span>
            </Link>
          </div>

          <div className="hero-actions">
            <button
              onClick={scrollToSteps}
              onKeyDown={(e) => handleKeyDown(e, scrollToSteps)}
              className="btn btn-outline hero-discover-btn"
              type="button"
              aria-label="Découvrir comment trouver un artisan"
            >
              Comment ça marche ?
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <button
          onClick={scrollToSteps}
          className="scroll-indicator-btn"
          type="button"
          aria-label="Faire défiler vers le bas"
          tabIndex="-1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;