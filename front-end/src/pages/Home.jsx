// components/Home.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useArtisansDuMois from '../hooks/useArtisansDuMois';
import useCategories from '../hooks/useCategories';

import ArtisanCard from '../components/cards/ArtisanCard';
import CardStep from '../components/cards/CardStep';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { categories, loading: categoriesLoading, getCategoryIcon } = useCategories(4);
  const { artisans, loading, error } = useArtisansDuMois(3);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      {/* Section Hero */}
      <section className="hero-section container-fluid text-center text-white d-flex align-items-center">
        <div className="container px-3 py-4">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <h1 className="display-4 fw-bold mb-4">
                Découvrez les artisans de votre région
              </h1>
              <p className="lead mb-4">
                Trouvez facilement un artisan qualifié en Auvergne-Rhône-Alpes. 
                Contactez-les directement et obtenez une réponse sous 48h.
              </p>

              <form onSubmit={handleSearch} className="hero-search mb-4">
                <div className="input-group mx-auto search-group">
                  <input 
                    type="text"
                    className="form-control form-control-lg search-input" 
                    placeholder="Trouver un artisan par nom" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button 
                    className="btn btn-lg px-4 text-white fw-semibold search-btn" 
                    type="submit"
                  >
                    Rechercher
                  </button>
                </div>
              </form>
              
              <p className="mb-4 fs-6">Ou explorez par catégorie ci-dessous</p>
              
              {/* Cartes de catégories */}
              <div className="row g-3 justify-content-center mb-4">
                {categoriesLoading ? (
                  <div className="col-12">
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Chargement des catégories...</span>
                    </div>
                  </div>
                ) : (
                  categories.map((category) => (
                    <div key={category.id_categorie} className="col-6 col-md-3">
                      <Link 
                        to={`/categories/${category.slug_categorie}`}
                        className="text-decoration-none">
                        <div className="card h-100 border-0 shadow-sm category-card">
                          <div className="card-body text-center p-3">
                            <div className="category-icon mx-auto mb-3">
                              <i className={`bi ${getCategoryIcon(category.nom_categorie)} fs-4 text-white`}></i>
                            </div>
                            <h6 className="card-title mb-2 fs-6 fw-semibold text-white">
                              {category.nom_categorie}
                            </h6>
                            <p className="card-text small text-white opacity-75">
                              Voir les artisans
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>

              <button 
                className="btn btn-outline-light btn-lg px-4 fw-semibold hero-cta-btn"
                onClick={() => document.getElementById('best-artisan')?.scrollIntoView(0, { behavior: 'smooth' })}>
                Les artisans du mois
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Comment ça marche */}
      <section id="comment-ca-marche" className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3" style={{ color: '#384050' }}>
            Comment trouver mon artisan ?
          </h2>
          <p className="lead text-muted">
            Suivez ces 4 étapes simples pour trouver l'artisan parfait
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <CardStep
              stepNumber={1}
              title="Choisir la catégorie d'artisanat dans le menu"
              description="Dans le menu en haut de la page, choisissez la catégorie d'artisanat que vous recherchez afin de pouvoir sélectionner uniquement les artisans spécialisés dans ce domaine."
              imageSrc="https://placehold.co/300x200/0074C7/ffffff"
              imageAlt="Illustration du choix de catégorie"
              reverse={false}
            />

            <CardStep
              stepNumber={2}
              title="Choisir un artisan"
              description="Sélectionnez l'artisan de la liste qui vous a le plus séduit. Référez-vous aux informations de son profil pour faire votre choix (avis, spécialité, localisation)."
              imageSrc="https://placehold.co/300x200/00497C/ffffff"
              imageAlt="Illustration du choix d'artisan"
              reverse={true}
            />

            <CardStep
              stepNumber={3}
              title="Le contacter via le formulaire de contact"
              description="Cliquez sur l'artisan que vous avez choisi pour avoir des informations supplémentaires sur ce dernier. Contactez-le via le formulaire de contact."
              imageSrc="https://placehold.co/300x200/82B864/ffffff"
              imageAlt="Illustration du formulaire de contact"
              reverse={false}
            />

            <CardStep
              stepNumber={4}
              title="Une réponse sera apportée sous 48h"
              description="Une fois votre message envoyé, l'artisan s'engage à vous répondre dans les 48 heures."
              imageSrc="https://placehold.co/300x200/CD2C2E/ffffff"
              imageAlt="Illustration de la réponse sous 48h"
              reverse={true}
            />
          </div>
        </div>
      </section>

      {/* Section Artisans du mois */}
      <section id="best-artisan" className="artisans-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3 section-title">
              Les artisans du mois
            </h2>
            <p className="lead text-muted mb-4">
              Découvrez nos artisans sélectionnés pour leur excellence
            </p>
          </div>

          {loading && (
            <div className="text-center">
              <div className="spinner-border loading-spinner" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center rounded-4" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Erreur lors du chargement des artisans du mois : {error}
            </div>
          )}

          {!loading && !error && (
            <div className="row justify-content-center g-4">
              {artisans.length > 0 ? (
                artisans.map((artisan) => (
                  <div key={artisan.id_artisan} className="col-lg-4 col-md-6">
                    <ArtisanCard artisan={artisan} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <div className="bg-white rounded-4 border-2 border-dashed p-5 no-artisans">
                    <i className="fas fa-tools display-4 text-muted mb-3"></i>
                    <p className="text-muted mb-0">
                      Aucun artisan du mois disponible pour le moment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section Call to Action */}
      <section id="find-artisan" className="cta-section py-5 text-white">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">
                Prêt à trouver votre artisan ?
              </h2>
              <p className="lead mb-5">
                Explorez nos différentes catégories et trouvez l'artisan qui 
                répondra parfaitement à vos besoins.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3 cta-buttons">
                <Link 
                  to="/artisans" 
                  className="btn btn-outline-light btn-lg px-4 fw-semibold cta-btn">
                  Tous les artisans
                </Link>
                <Link 
                  to="/categories" 
                  className="btn btn-outline-light btn-lg px-4 fw-semibold cta-btn">
                  Toutes les catégories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Une plateforme de confiance */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3 trust-title">
              Une plateforme de confiance
            </h2>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center trust-card">
                <div className="card-body p-4">
                  <div className="trust-icon trust-icon-primary mb-3">
                    <i className="bi bi-patch-check fs-1 text-white"></i>
                  </div>
                  <h4 className="fw-bold mb-3 trust-card-title">Artisans vérifiés</h4>
                  <p className="text-muted">
                    Tous nos artisans sont vérifiés et certifiés par la région Auvergne-Rhône-Alpes.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center trust-card">
                <div className="card-body p-4">
                  <div className="trust-icon trust-icon-success mb-3">
                    <i className="bi bi-clock fs-1 text-white"></i>
                  </div>
                  <h4 className="fw-bold mb-3 trust-card-title">Réponse garantie</h4>
                  <p className="text-muted">
                    Réponse sous 48h maximum pour tous vos projets et demandes de devis.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm text-center trust-card">
                <div className="card-body p-4">
                  <div className="trust-icon trust-icon-danger mb-3">
                    <i className="bi bi-geo-alt fs-1 text-white"></i>
                  </div>
                  <h4 className="fw-bold mb-3 trust-card-title">Artisans locaux</h4>
                  <p className="text-muted">
                    Trouvez des artisans près de chez vous dans toute la région Auvergne-Rhône-Alpes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;