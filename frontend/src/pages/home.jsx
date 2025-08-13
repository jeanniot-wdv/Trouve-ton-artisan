import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArtisanCard from '../components/cards/ArtisansCard';
import Hero from '../components/common/Hero';
import Steps from '../components/cards/Steps';

const Home = () => {
  const [featuredArtisans, setFeaturedArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set document title and meta description
    document.title = 'Trouve ton artisan - Trouvez les meilleurs artisans de la région Auvergne-Rhône-Alpes';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Plateforme officielle de la région Auvergne-Rhône-Alpes pour trouver et contacter les artisans locaux. Bâtiment, services, fabrication, alimentation.');
    }

    fetchFeaturedArtisans();
  }, []);

  const fetchFeaturedArtisans = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/artisans`);
      console.log(response);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des artisans');
      }
      
      const data = await response.json();
      setFeaturedArtisans(data.artisans || []);
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement des artisans vedettes:', err);
    } finally {
      setLoading(false);
    }
  };

  const stepsData = [
    {
      step: 1,
      title: "Choisir la catégorie d'artisanat dans le menu",
      description: "Dans le menu en haut de la page, choisissez la catégorie d'artisanat que vous recherchez afin de pouvoir sélectionner uniquement les artisans spécialisés dans ce domaine.",
      image: "/assets/images/step-1.jpg",
      alt: "Zoom sur une barre de navigation"
    },
    {
      step: 2,
      title: "Choisir un artisan",
      description: "Sélectionnez l'artisan de la liste qui vous a le plus séduit. Référez-vous aux informations de son profil pour faire votre choix (avis, spécialité, localisation).",
      image: "/assets/images/step-2.jpg",
      alt: "Curseur pointé vers le profil d'un artisan"
    },
    {
      step: 3,
      title: "Le contacter via le formulaire de contact",
      description: "Cliquez sur l'artisan que vous avez choisi pour avoir des informations supplémentaires sur ce dernier. Contactez-le via le formulaire de contact.",
      image: "/assets/images/step-3.jpg",
      alt: "Formulaire de contact"
    },
    {
      step: 4,
      title: "Une réponse sera apportée sous 48h",
      description: "Une fois votre message envoyé, l'artisan s'engage à vous répondre dans les 48 heures.",
      image: "/assets/images/step-4.jpg",
      alt: "Schéma d'un particulier communiquant avec un artisan avec écrit 48 heures entre les deux"
    }
  ];

  return (
    <div className="home-page">
      <Hero />

      {/* Steps Section */}
      <section className="section steps-section" id="comment-trouver">
        <div className="container">
          <h2 className="section-title">
            Comment trouver mon artisan ?
          </h2>
          <Steps steps={stepsData} />
        </div>
      </section>

      {/* Featured Artisans Section */}
      <section className="section featured-artisans-section" aria-labelledby="featured-title">
        <div className="container">
          <h2 id="featured-title" className="section-title">
            Les trois artisans du mois
          </h2>
          
          {loading && (
            <div className="loading-container" role="status" aria-live="polite">
              <div className="loading-spinner" aria-hidden="true"></div>
              <span className="visually-hidden">Chargement des artisans en cours...</span>
            </div>
          )}

          {error && (
            <div className="error-container" role="alert">
              <div className="error-message">
                <h3>Erreur de chargement</h3>
                <p>{error}</p>
                <button 
                  onClick={fetchFeaturedArtisans}
                  className="btn btn-primary"
                  type="button"
                >
                  Réessayer
                </button>
              </div>
            </div>
          )}

          {!loading && !error && (
            <>
              {featuredArtisans.length > 0 ? (
                <div className="artisans-grid">
                  {featuredArtisans.map((artisan, index) => (
                    <ArtisanCard 
                      key={artisan.id} 
                      artisan={artisan}
                      priority={index < 3} // Add loading priority for first 3 images
                    />
                  ))}
                </div>
              ) : (
                <div className="no-artisans">
                  <div className="no-artisans-content">
                    <h3>Aucun artisan vedette pour le moment</h3>
                    <p>Revenez bientôt pour découvrir nos artisans mis en avant !</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Prêt à trouver votre artisan ?
            </h2>
            <p className="cta-description">
              Explorez nos différentes catégories et trouvez l'artisan qui répondra parfaitement à vos besoins.
            </p>
            <div className="cta-buttons">
              <Link to="/batiment" className="btn btn-primary">
                Bâtiment
              </Link>
              <Link to="/services" className="btn btn-primary">
                Services
              </Link>
              <Link to="/fabrication" className="btn btn-primary">
                Fabrication
              </Link>
              <Link to="/alimentation" className="btn btn-primary">
                Alimentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section trust-section">
        <div className="container">
          <div className="trust-content">
            <h2 className="trust-title">
              Une plateforme de confiance
            </h2>
            <div className="trust-features">
              <div className="trust-feature">
                <div className="trust-icon" aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Artisans vérifiés</h3>
                <p>Tous nos artisans sont vérifiés et certifiés par la région Auvergne-Rhône-Alpes.</p>
              </div>
              
              <div className="trust-feature">
                <div className="trust-icon" aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L3.09 8.26L12 14.52L20.91 8.26L12 2ZM12 14.52V22.78L20.91 16.52V8.26L12 14.52Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Réponse garantie</h3>
                <p>Réponse sous 48h maximum pour tous vos projets et demandes de devis.</p>
              </div>
              
              <div className="trust-feature">
                <div className="trust-icon" aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Artisans locaux</h3>
                <p>Trouvez des artisans près de chez vous dans toute la région Auvergne-Rhône-Alpes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;