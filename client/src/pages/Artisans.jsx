// pages/Artisans.jsx
import { useState } from 'react';
import useTitle from '../hooks/useTitle';
import useArtisans from '../hooks/useArtisans';

import Hero from '../components/partial/Hero';
import SearchBar from '../components/partial/SearchBar';
import ArtisanCard from '../components/cards/ArtisanCard';
import Cta from '../components/common/Cta';

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

    useTitle("Artisans");

  return (
    <>
      {/* Section Hero */}
      <Hero
        title="Tous les artisans"
        description="Explorez l'ensemble de nos artisans et 
        trouvez les professionnels qualifiés dont vous avez besoin.">
        <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Rechercher un artisan..."
          />
      </Hero>

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
                <h2 className="mb-3">
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

              {/* Grille des artisans */}
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
                      className="btn btn-outline-secondary"
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1}
                    >Précédent</button>

                    <span>
                      Page {pagination.currentPage} / {pagination.totalPages}
                    </span>

                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= pagination.totalPages}
                    >Suivant</button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Section Call to Action */}
      <Cta title="Vous ne trouvez pas ce que vous cherchez ?"
          textButtonLeft="Toutes les catégories" linkToLeft="categories" 
          textButtonRight="Nous contacter" linkToRight=""
          description="Contactez-nous directement ou explorez toutes les catégories 
                pour trouver le professionnel parfait pour votre projet."/>
    </>
  );
};

export default Artisans;