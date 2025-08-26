// pages/Categories.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import useCategories from '../hooks/useCategories';
import Cta from '../components/common/Cta';

import Hero from '../components/partial/Hero';
import SearchBar from '../components/partial/SearchBar';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { categories, loading, error, getCategoryIcon } = useCategories();

  // Filtrer les catégories selon le terme de recherche
  const filteredCategories = categories.filter(category => {
    const nomCategorie = category.nom_categorie?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    const matchNomCategorie = nomCategorie.includes(search);

    const matchSpecialites = category.specialites?.some(spec =>
      spec.nom?.toLowerCase().includes(search)
    ) || false;

    return matchNomCategorie || matchSpecialites;
  });

  useTitle("Catégories");

  return (
    <>
      {/* Section Header */}
      <Hero
        title="Toutes les catégories d'artisans"
        description="Explorez l'ensemble de nos catégories d'artisanat et trouvez 
        les professionnels qualifiés dont vous avez besoin.">
        <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Rechercher une catégorie..."
          />
      </Hero>

      {/* Section Catégories */}
      <section className="categories-grid py-5">
        <div className="container">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border categories-spinner" role="status">
                <span className="visually-hidden">Chargement des catégories...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center rounded-4 mx-auto" style={{maxWidth: '600px'}} role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Résumé des résultats */}
              <div className="text-center mb-5">
                <h2 className="mb-3">
                  {
                  searchTerm 
                    ? `${filteredCategories.length} catégorie(s) trouvée(s) pour "${searchTerm}"`
                    : `${categories.length} catégorie(s) disponible(s)`
                  }
                </h2>
                <p className="text-muted">
                  Cliquez sur une catégorie pour découvrir ses artisans
                </p>
              </div>

              {/* Grille des catégories */}
              <div className="row g-4">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <div key={category.id_categorie} className="col-lg-4 col-md-6">
                      <Link 
                        to={`/categories/${category.slug_categorie}`}
                        className="text-decoration-none"
                      >
                        <div className="card h-100 border-0 shadow-sm category-main-card">
                          <div className="card-body p-4">
                            {/* Icône et titre */}
                            <div className="d-flex align-items-center mb-3">
                              <div className="d-flex text-white align-items-center justify-content-center flex-shrink-0 category-main-icon rounded-3 me-3">
                                <i className={`bi ${getCategoryIcon(category.nom_categorie)} fs-3`}></i>
                              </div>
                              <div>
                                <h4 className="fw-medium mb-0">
                                  {category.nom_categorie}
                                </h4>
                                <p className="category-count mb-0">
                                  {category.nb_artisans || 0} artisan(s)
                                </p>
                              </div>
                            </div>

                            {/* Description */}
                            {category.description && (
                              <p className="mb-3">
                                {category.description}
                              </p>
                            )}

                            {/* Spécialités */}
                            {category.specialites && category.specialites.length > 0 && (
                              <div className="specialites-list">
                                <h6 className="specialites-title fw-semibold mb-2">Spécialités :</h6>
                                <div className="d-flex flex-wrap gap-2">
                                  {category.specialites.slice(0, 3).map((specialite, index) => (
                                    <span key={specialite.id_specialite} className="badge rounded-5 small py-2 px-3 specialite-badge">
                                      {specialite.nom_specialite}
                                    </span>
                                  ))}
                                  {category.specialites.length > 3 && (
                                    <span className="badge rounded-5 small py-2 px-3 more-specialites">
                                      +{category.specialites.length - 3} autres
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Bouton d'action */}
                            <div className="mt-4 text-center">
                              <button className="btn artisan-btn fw-medium white">Voir les artisans</button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <div className="no-categories">
                      <i className="bi bi-search display-1 text-muted mb-3"></i>
                      <h4 className="text-muted mb-3">Aucune catégorie trouvée</h4>
                      <p className="text-muted mb-4">
                        Aucune catégorie ne correspond à votre recherche "{searchTerm}".
                      </p>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => setSearchTerm('')}
                      >Voir toutes les catégories</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Section Call to Action */}
      <Cta title="Vous ne trouvez pas ce que vous cherchez ?"
          textButtonLeft="Tous les artisans" linkToLeft="artisans" 
          textButtonRight="Nous contacter" linkToRight="contact"
          description="Contactez-nous directement ou explorez tous nos artisans 
                pour trouver le professionnel parfait pour votre projet."/>
    </>
  );
};

export default Categories;