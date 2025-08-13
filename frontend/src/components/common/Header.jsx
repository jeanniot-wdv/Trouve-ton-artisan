import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../common/SearchBar';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from API
    fetchCategories();

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo">
            <Link to="/" className="logo-link" onClick={closeMenu}>
              <img 
                src="/assets/images/logo.svg" 
                alt="Trouve ton artisan - Retour à l'accueil"
                className="logo-image"
                width="180"
                height="60"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="header-nav d-none d-lg-block" role="navigation" aria-label="Navigation principale">
            <ul className="nav-list">
              {categories.map((category) => (
                <li key={category.id} className="nav-item">
                  <Link 
                    to={`/${category.slug}`}
                    className="nav-link"
                    title={`Voir tous les artisans de ${category.name}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="header-search d-none d-md-block">
            <SearchBar onSearch={handleSearch} placeholder="Rechercher un artisan..." />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menu-toggle d-lg-none"
            onClick={toggleMenu}
            onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <span className="menu-toggle-icon">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
          aria-hidden={!isMenuOpen}
        >
          {/* Mobile Search */}
          <div className="mobile-search d-md-none">
            <SearchBar onSearch={handleSearch} placeholder="Rechercher un artisan..." />
          </div>

          {/* Mobile Navigation */}
          <nav className="mobile-nav" role="navigation" aria-label="Navigation mobile">
            <ul className="mobile-nav-list">
              <li className="mobile-nav-item">
                <Link 
                  to="/" 
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  Accueil
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id} className="mobile-nav-item">
                  <Link 
                    to={`/${category.slug}`}
                    className="mobile-nav-link"
                    onClick={closeMenu}
                    title={`Voir tous les artisans de ${category.name}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="menu-overlay"
            onClick={closeMenu}
            onKeyDown={(e) => handleKeyDown(e, closeMenu)}
            tabIndex={0}
            role="button"
            aria-label="Fermer le menu"
          />
        )}
      </div>
    </header>
  );
};

export default Header;