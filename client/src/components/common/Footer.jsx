// components/common/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiServices';

const Footer = () => {
  const [categories, setCategories] = useState([]);

  // Récupération des catégories
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

  return (
    <footer className="text-white py-5">
      <div className="container">
        <div className="row g-4">
          {/* Logo et Description */}
          <div className="col-lg-3 col-md-6">
            <div className="mb-3">
              <img src="src/assets/images/Logo.png" alt="Trouve Ton Artisan" width="200" />
            </div>
            <p className="text-light opacity-75 mb-4">
              La plateforme officielle de la région Auvergne-Rhône-Alpes pour trouver et contacter les artisans locaux.
            </p>
            <div>
              <span className="fw-medium mb-2 d-block">Suivez-nous :</span>
              <div className="d-flex social gap-2">
                <a href="#" className="rounded-5" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className=" rounded-5" aria-label="X (Twitter)">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className=" rounded-5" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Catégories */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-semibold text-uppercase mb-3">Catégories</h6>
            <ul className="list-unstyled">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id_categorie} className="mb-2">
                  <Link 
                    to={`/categories/${category.slug_categorie}`}
                    className="text-light text-decoration-none opacity-75"
                  >
                    {category.nom_categorie}
                  </Link>
                </li>
              ))}
              {categories.length > 6 && (
                <li className="mb-2">
                  <Link 
                    to="/categories" 
                    className="text-primary text-decoration-none fw-semibold"
                  >
                    Voir toutes les catégories
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Pages légales */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-uppercase mb-3">Pages légales</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/construction" className="text-light text-decoration-none opacity-75">
                  Mentions légales
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/construction" className="text-light text-decoration-none opacity-75">
                  Données personnelles
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/construction" className="text-light text-decoration-none opacity-75">
                  Accessibilité
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/construction" className="text-light text-decoration-none opacity-75">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-uppercase mb-3">Contact</h6>
            <div className="mb-3">
              <div className="fw-bold">Antenne de Lyon</div>
              <div className="text-light opacity-75">
                101 cours Charlemagne<br />
                CS 20033<br />
                69269 LYON CEDEX 02<br />
                France
              </div>
            </div>
            <div className="mb-3">
              <i className="bi bi-telephone-fill me-2"></i>
              <span className="fw-semibold">Téléphone :</span><br />
              <a href="tel:+33426734000" className="text-light text-decoration-none opacity-75 hover-link">
                +33 (0)4 26 73 40 00
              </a>
            </div>
            <div>
              <i className="bi bi-envelope-fill me-2"></i>
              <span className="fw-semibold">Email :</span><br />
              <a href="mailto:contact@auvergnerhonealpes.fr" className="text-light text-decoration-none opacity-75 hover-link">
                contact@auvergnerhonealpes.fr
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <hr className="my-4 opacity-50" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0 text-light opacity-80 small">
              © 2025 Région Auvergne-Rhône-Alpes. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;