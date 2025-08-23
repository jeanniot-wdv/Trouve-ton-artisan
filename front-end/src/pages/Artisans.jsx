// components/Artisans.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

import useCategories from '../hooks/useCategories';

import useArtisans from '../hooks/useArtisans';
import ArtisanCard from '../components/cards/ArtisanCard';

const Artisans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { artisans, pagination, page, setPage, loading, error } = useArtisans();

  // Filtrer les artisans selon le terme de recherche
  const filteredArtisans = Array.isArray(artisans)
    ? artisans.filter(artisan => {
        const nomArtisan = artisan.nom?.toLowerCase() || "";
        const search = searchTerm.toLowerCase();

        const matchNomArtisan = nomArtisan.includes(search);

        return matchNomArtisan;
      })
    : [];

  return (
    <>
      {/* Section Header */}
      <section className="categories-header container-fluid text-center text-white d-flex align-items-center">
        <div className="container px-3 py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">
                Tous les artisans
              </h1>
              <p className="lead mb-4">
                Explorez l'ensemble de nos artisans et trouvez 
                les professionnels qualifiés dont vous avez besoin.
              </p>
              
              {/* Barre de recherche */}
              <div className="categories-search mb-4">
                <div className="input-group mx-auto search-group">
                  <input 
                    type="text" 
                    className="form-control form-control-lg search-input" 
                    placeholder="Rechercher un artisan..." 
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                  />
                  <span className="input-group-text search-icon">
                    <i className="bi bi-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Artisans */}
      <section className="categories-grid py-5">
        <div className="container">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border categories-spinner" role="status">
                <span className="visually-hidden">Chargement des artisans...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center rounded-4 mx-auto" style={{maxWidth: '600px'}} role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Erreur lors du chargement des artisans : {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Résumé des résultats */}
              <div className="text-center mb-5">
                <h2 className="categories-subtitle mb-3">
                  {
                  searchTerm 
                    ? `${filteredArtisans.length} artisan(s) trouvé(s) pour "${searchTerm}"`
                    : `${pagination?.totalItems || 0} artisan(s) disponible(s)`
                  }
                </h2>
                <p className="text-muted">
                  Cliquez sur un artisan pour obtenir ses informations
                </p>
              </div>

              {/* Grille des catégories */}
              <div className="row g-4">
                {filteredArtisans.length > 0 ? (
                  filteredArtisans.map((artisan) => (
                    <div key={artisan.id_artisan} className="col-lg-4 col-md-6">
                      <ArtisanCard artisan={artisan} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <div className="no-categories">
                      <i className="bi bi-search display-1 text-muted mb-3"></i>
                      <h4 className="text-muted mb-3">Aucun artisan trouvé</h4>
                      <p className="text-muted mb-4">
                        Aucun artisan ne correspond à votre recherche "{searchTerm}".
                      </p>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => setSearchTerm('')}
                      >
                        Voir tous les artisans
                      </button>
                    </div>
                  </div>
                )}
                {pagination && (
                  <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1}
                    >
                      ← Précédent
                    </button>

                    <span>
                      Page {pagination.currentPage} / {pagination.totalPages}
                    </span>

                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= pagination.totalPages}
                    >
                      Suivant →
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Section Call to Action */}
      <section className="categories-cta py-5 text-white">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">
                Vous ne trouvez pas ce que vous cherchez ?
              </h2>
              <p className="lead mb-5">
                Contactez-nous directement ou explorez tous nos artisans 
                pour trouver le professionnel parfait pour votre projet.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3 cta-buttons">
                <Link 
                  to="/artisans" 
                  className="btn btn-outline-light btn-lg px-4 fw-semibold cta-btn"
                >
                  Tous les artisans
                </Link>
                <Link 
                  to="/contact" 
                  className="btn btn-outline-light btn-lg px-4 fw-semibold cta-btn"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Artisans;