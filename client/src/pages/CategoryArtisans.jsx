// pages/CategoryArtisans.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import ArtisanCard from '../components/cards/ArtisanCard';
import useCategories from '../hooks/useCategories';
import useCategoryArtisans from '../hooks/useCategoryArtisans';

const CategoryArtisans = () => {
  const { slug } = useParams();
  const { getCategoryIcon } = useCategories();
  const {
    artisans,
    category,
    loading,
    error,
    filters,
    totalPages,
    departements,
    villes,
    handleDepartementChange,
    handleFilterChange,
    handlePageChange,
    resetFilters
  } = useCategoryArtisans(slug);

  if (error && !category) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <h4>Erreur</h4>
          <p>{error}</p>
          <Link to="/categories" className="btn btn-primary">
            Retour aux catégories
          </Link>
        </div>
      </div>
    );
  }
  const title = "Catégorie " + slug;
  useTitle(title);

  return (
    <>
      {/* Header de la catégorie */}
      <section className="category-header container-fluid text-white">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb justify-content-center category-breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-white-50">Accueil</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/categories" className="text-white-50">Catégories</Link>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">
                    {category?.nom_categorie || 'Chargement...'}
                  </li>
                </ol>
              </nav>

              {/* Titre et icône */}
              <div className="d-flex justify-content-center align-items-center mb-4">
                <div className="category-main-icon me-3">
                  <i className={`bi ${getCategoryIcon(category?.nom_categorie)} fs-2`}></i>
                </div>
                <h1 className="display-4 fw-medium mb-0">
                  {category?.nom_categorie || 'Chargement...'}
                </h1>
              </div>

              {/* Description */}
              {category?.description && (
                <p className="lead mb-4">{category.description}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section filtres et résultats */}
      <section className="py-5 bg-light">
        <h2 className="text-center mb-4">
          {category?.nb_artisans} artisan(s) disponible(s)
        </h2>
        <div className="container">
          {/* Filtres */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <i className="bi bi-funnel me-2"></i>Filtrer les artisans
                  </h5>
                  
                  <div className="row g-3">
                    {/* Recherche par nom */}
                    <div className="col-md-4">
                      <label className="form-label">Rechercher par nom</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nom de l'artisan..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                      />
                    </div>

                    {/* Département */}
                    <div className="col-md-4">
                      <label className="form-label">Département</label>
                      <select
                        className="form-select"
                        value={filters.departement}
                        onChange={(e) => handleDepartementChange(e.target.value)}
                      >
                        <option value="">Tous les départements</option>
                        {departements.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    {/* Ville */}
                    <div className="col-md-4">
                      <label className="form-label">Ville</label>
                      <select
                        className="form-select"
                        value={filters.ville}
                        onChange={(e) => handleFilterChange('ville', e.target.value)}
                        disabled={!filters.departement}
                      >
                        <option value="">Toutes les villes</option>
                        {villes.map((ville) => (
                          <option key={ville} value={ville}>{ville}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Bouton reset */}
                  <div className="mt-3">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={resetFilters}
                    >
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Réinitialiser les filtres
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="row">
                {console.log("artisans : ",artisans.artisans)}
            {loading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Chargement...</span>
                </div>
              </div>
            ) : artisans.artisans.length > 0 ? (
              <>
                {artisans.artisans.map((artisan) => (
                  <div key={artisan.id_artisan} className="col-lg-4 col-md-6 mb-4">
                    <ArtisanCard artisan={artisan} />
                  </div>
                ))}
              </>
            ) : (
              <div className="col-12 text-center py-5">
                <div className="no-results">
                  <i className="bi bi-search display-1 text-muted mb-3"></i>
                  <h4 className="text-muted">Aucun artisan trouvé</h4>
                  <p className="text-muted mb-4">
                    Aucun artisan ne correspond à vos critères de recherche.
                  </p>
                  <button 
                    className="btn btn-primary"
                    onClick={resetFilters}
                  >
                    Voir tous les artisans
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="row">
              <div className="col-12">
                <nav aria-label="Pagination des artisans">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${filters.page === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={filters.page === 1}
                      >
                        Précédent
                      </button>
                    </li>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <li key={pageNum} className={`page-item ${filters.page === pageNum ? 'active' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      </li>
                    ))}
                    
                    <li className={`page-item ${filters.page === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => handlePageChange(filters.page + 1)}
                        disabled={filters.page === totalPages}
                      >
                        Suivant
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryArtisans;