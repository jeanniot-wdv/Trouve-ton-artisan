// components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apiService from '../../services/apiServices';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Récupération des catégories pour le dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.getCategories();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des catégories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="fixed-top shadow bg-white">
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container-fluid px-4">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src="src/assets/images/Logo.png" alt="Trouve Ton Artisan" width="200" />
          </Link>

          {/* Toggle button pour mobile */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent" 
            aria-controls="navbarContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            <ul className="navbar-nav mb-2 mb-lg-0 me-3">
              {/* Artisans */}
              <li className="nav-item">
                <Link 
                  className={`nav-link fw-semibold ${isActive('/artisans')}`}
                  to="/artisans">
                  Artisans
                </Link>
              </li>

              {/* Catégories */}
              <li className="nav-item">
                <Link 
                  className={`nav-link fw-semibold ${isActive('/categories')}`}
                  to="/categories">
                  Catégories
                </Link>
              </li>
            </ul>

            {/* Barre de recherche */}
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Rechercher un artisan..." 
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ minWidth: '200px' }}
              />
              <button 
                className="btn btn-outline-dark fw-semibold" 
                type="submit">
                Rechercher
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;