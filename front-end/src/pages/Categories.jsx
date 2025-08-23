// components/Categories.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCategories from '../hooks/useCategories';

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

  return (
    <>
      {/* Section Header */}
      <section className="categories-header container-fluid text-center text-white d-flex align-items-center">
        <div className="container px-3 py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">
                Toutes les catégories d'artisans
              </h1>
              <p className="lead mb-4">
                Explorez l'ensemble de nos catégories d'artisanat et trouvez 
                les professionnels qualifiés dont vous avez besoin.
              </p>
              
              {/* Barre de recherche */}
              <div className="categories-search mb-4">
                <div className="input-group mx-auto search-group">
                  <input 
                    type="text" 
                    className="form-control form-control-lg search-input" 
                    placeholder="Rechercher une catégorie..." 
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
                <h2 className="categories-subtitle mb-3">
                  {
                  searchTerm 
                    ? `${filteredCategories.length} catégorie(s) trouvée(s) pour "${searchTerm}"`
                    : `${categories.length} catégories disponibles`
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
                              <div className="category-main-icon text-primary me-3">
                                <i className={`bi ${getCategoryIcon(category.nom_categorie)} fs-3`}></i>
                              </div>
                              <div>
                                <h4 className="category-main-title mb-1">
                                  {category.nom_categorie}
                                </h4>
                                <p className="category-count mb-0">
                                  {console.log(category)}
                                  {category.nb_artisans || 0} artisan(s)
                                </p>
                              </div>
                            </div>

                            {/* Description */}
                            {category.description && (
                              <p className="category-description mb-3">
                                {category.description}
                              </p>
                            )}

                            {/* Spécialités */}
                            {category.specialites && category.specialites.length > 0 && (
                              <div className="specialites-list">
                                <h6 className="specialites-title mb-2">Spécialités :</h6>
                                <div className="d-flex flex-wrap gap-2">
                                  {category.specialites.slice(0, 3).map((specialite, index) => (
                                    <span key={specialite.id_specialite} className="badge specialite-badge">
                                      {specialite.nom_specialite}
                                    </span>
                                  ))}
                                  {category.specialites.length > 3 && (
                                    <span className="badge more-specialites">
                                      +{category.specialites.length - 3} autres
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Bouton d'action */}
                            <div className="mt-4">
                              <button className="btn category-action-btn w-100">
                                Voir les artisans
                                <i className="bi bi-arrow-right ms-2"></i>
                              </button>
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
                        className="btn btn-outline-primary"
                        onClick={() => setSearchTerm('')}
                      >
                        Voir toutes les catégories
                      </button>
                    </div>
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

export default Categories;