import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  useEffect(() => {
    // Update document title for 404 page
    document.title = 'Page non trouvée - Trouve ton artisan';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'La page que vous recherchez n\'existe pas. Retournez à l\'accueil pour trouver votre artisan en Auvergne-Rhône-Alpes.');
    }
  }, []);

  const popularCategories = [
    {
      name: 'Bâtiment',
      path: '/batiment',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21H21M5 21V7L12 3L19 7V21M9 21V15H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Maçons, électriciens, plombiers...'
    },
    {
      name: 'Services',
      path: '/services',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3.09 8.26L12 14.52L20.91 8.26L12 2ZM12 14.52V22.78L20.91 16.52V8.26L12 14.52Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Réparation, maintenance, nettoyage...'
    },
    {
      name: 'Fabrication',
      path: '/fabrication',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Ébénistes, ferronniers, potiers...'
    },
    {
      name: 'Alimentation',
      path: '/alimentation',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 2V8C3 9.1 3.9 10 5 10S7 9.1 7 8V2M7 10V22M17 2V22M12 2C10.9 2 10 2.9 10 4S10.9 6 12 6 14 5.1 14 4 13.1 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Boulangers, fromagers, chocolatiers...'
    }
  ];

  const helpfulLinks = [
    {
      title: 'Comment trouver un artisan ?',
      path: '/#comment-trouver',
      description: 'Découvrez notre guide étape par étape'
    },
    {
      title: 'Artisans du mois',
      path: '/#featured-artisans',
      description: 'Consultez notre sélection d\'artisans vedettes'
    },
    {
      title: 'Mentions légales',
      path: '/mentions-legales',
      description: 'Informations légales et conditions d\'utilisation'
    },
    {
      title: 'Nous contacter',
      path: '/contact',
      description: 'Une question ? Contactez notre équipe'
    }
  ];

  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          {/* Error Message */}
          <div className="error-main">
            <div className="error-code" aria-hidden="true">
              404
            </div>
            
            <div className="error-message">
              <h1 className="error-title">
                Oups ! Page non trouvée
              </h1>
              <p className="error-description">
                La page que vous recherchez n'existe pas ou a été déplacée. 
                Pas de panique, nous allons vous aider à retrouver votre chemin !
              </p>
            </div>

            <div className="error-illustration" aria-hidden="true">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* House illustration */}
                <path d="M50 150L100 50L150 150V180H50V150Z" stroke="currentColor" strokeWidth="3" fill="none"/>
                <rect x="80" y="130" width="40" height="50" stroke="currentColor" strokeWidth="3" fill="none"/>
                <circle cx="90" cy="145" r="2" fill="currentColor"/>
                <rect x="110" y="130" width="20" height="20" stroke="currentColor" strokeWidth="3" fill="none"/>
                
                {/* Question mark */}
                <circle cx="170" cy="80" r="25" stroke="currentColor" strokeWidth="3" fill="none"/>
                <path d="M165 75C165 72 167 70 170 70C173 70 175 72 175 75C175 77 173 78 170 78" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="170" cy="85" r="2" fill="currentColor"/>
                
                {/* Tools */}
                <path d="M30 100L35 95L40 100L35 105L30 100Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                <line x1="35" y1="95" x2="25" y2="85" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2 className="quick-actions-title">Actions rapides</h2>
            <div className="quick-actions-buttons">
              <Link to="/" className="btn btn-primary btn-large">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Retour à l'accueil
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline btn-large"
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Page précédente
              </button>
            </div>
          </div>

          {/* Popular Categories */}
          <section className="popular-categories">
            <h2 className="section-title">Explorez nos catégories</h2>
            <p className="section-description">
              Peut-être cherchiez-vous l'une de ces catégories d'artisans ?
            </p>
            
            <div className="categories-grid">
              {popularCategories.map((category) => (
                <Link 
                  key={category.path}
                  to={category.path}
                  className="category-card"
                  aria-label={`Voir tous les artisans de ${category.name}`}
                >
                  <div className="category-icon" aria-hidden="true">
                    {category.icon}
                  </div>
                  <div className="category-content">
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-description">{category.description}</p>
                  </div>
                  <div className="category-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Helpful Links */}
          <section className="helpful-links">
            <h2 className="section-title">Liens utiles</h2>
            <div className="links-grid">
              {helpfulLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className="helpful-link"
                >
                  <h3 className="link-title">{link.title}</h3>
                  <p className="link-description">{link.description}</p>
                  <div className="link-arrow" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Search Suggestion */}
          <section className="search-suggestion">
            <div className="search-suggestion-content">
              <h2 className="search-suggestion-title">
                Vous cherchez un artisan spécifique ?
              </h2>
              <p className="search-suggestion-description">
                Utilisez notre barre de recherche pour trouver l'artisan qui correspond à vos besoins.
              </p>
              <Link to="/" className="btn btn-primary">
                Rechercher un artisan
              </Link>
            </div>
          </section>

          {/* Contact Support */}
          <section className="contact-support">
            <div className="support-card">
              <div className="support-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M13 9L9 9M13 13L9 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              
              <div className="support-content">
                <h3 className="support-title">Besoin d'aide ?</h3>
                <p className="support-description">
                  Si vous ne trouvez pas ce que vous cherchez, notre équipe est là pour vous aider.
                </p>
                <div className="support-contact">
                  <div className="support-item">
                    <strong>Téléphone :</strong>
                    <a href="tel:+33426734000" className="support-link">
                      +33 (0)4 26 73 40 00
                    </a>
                  </div>
                  <div className="support-item">
                    <strong>Email :</strong>
                    <a href="mailto:contact@auvergnerhonealpes.fr" className="support-link">
                      contact@auvergnerhonealpes.fr
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Info (for developers) */}
          <details className="technical-details">
            <summary className="technical-summary">
              Informations techniques
            </summary>
            <div className="technical-content">
              <p>
                <strong>Code d'erreur :</strong> 404 - Page Not Found
              </p>
              <p>
                <strong>URL demandée :</strong> <code>{window.location.pathname}</code>
              </p>
              <p>
                <strong>Suggestions :</strong>
              </p>
              <ul>
                <li>Vérifiez l'orthographe de l'URL</li>
                <li>La page a peut-être été déplacée ou supprimée</li>
                <li>Utilisez la navigation pour accéder au contenu</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default NotFound;