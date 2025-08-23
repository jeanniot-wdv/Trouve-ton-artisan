import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ArtisanCard from '../components/cards/ArtisansCard';

const CategoryPage = ({ category: propCategory }) => {
  const { category: paramCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = propCategory || paramCategory;
  
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    specialty: searchParams.get('specialty') || '',
    rating: searchParams.get('rating') || '',
    sortBy: searchParams.get('sortBy') || 'name'
  });
  const [pagination, setPagination] = useState({
    currentPage: parseInt(searchParams.get('page')) || 1,
    totalPages: 1,
    totalResults: 0,
    limit: 12
  });
  const [specialties, setSpecialties] = useState([]);
  const [locations, setLocations] = useState([]);

  // Category information
  const categoryInfo = {
    batiment: {
      title: 'Artisans du Bâtiment',
      description: 'Trouvez les meilleurs artisans du bâtiment en Auvergne-Rhône-Alpes : maçons, électriciens, plombiers, charpentiers et bien plus.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21H21M5 21V7L12 3L19 7V21M9 21V15H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    services: {
      title: 'Artisans de Services',
      description: 'Découvrez nos artisans spécialisés dans les services : réparation, maintenance, nettoyage et services personnalisés.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3.09 8.26L12 14.52L20.91 8.26L12 2ZM12 14.52V22.78L20.91 16.52V8.26L12 14.52Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    fabrication: {
      title: 'Artisans de Fabrication',
      description: 'Explorez notre sélection d\'artisans créateurs : ébénistes, ferronniers, potiers, couturiers et artistes.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    alimentation: {
      title: 'Artisans de l\'Alimentation',
      description: 'Rencontrez nos artisans du goût : boulangers, fromagers, chocolatiers, vignerons et producteurs locaux.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 2V8C3 9.1 3.9 10 5 10S7 9.1 7 8V2M7 10V22M17 2V22M12 2C10.9 2 10 2.9 10 4S10.9 6 12 6 14 5.1 14 4 13.1 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  };

  useEffect(() => {
    // Update document title and meta description
    const info = categoryInfo[category];
    if (info) {
      document.title = `${info.title} - Trouve ton artisan`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', info.description);
      }
    }

    fetchArtisans();
    fetchFiltersData();
  }, [category, filters, pagination.currentPage]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    if (pagination.currentPage > 1) {
      params.set('page', pagination.currentPage.toString());
    }
    setSearchParams(params);
  }, [filters, pagination.currentPage, setSearchParams]);

  const fetchArtisans = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        category,
        page: pagination.currentPage,
        limit: pagination.limit,
        ...filters
      });

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/artisans?${queryParams}`
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des artisans');
      }
      
      const data = await response.json();
      setArtisans(data.artisans || []);
      setPagination(prev => ({
        ...prev,
        totalPages: data.totalPages || 1,
        totalResults: data.totalResults || 0
      }));
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement des artisans:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFiltersData = async () => {
    try {
      const [specialtiesRes, locationsRes] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/api/specialties?category=${category}`),
        fetch(`${process.env.REACT_APP_API_URL}/api/locations?category=${category}`)
      ]);

      if (specialtiesRes.ok) {
        const specialtiesData = await specialtiesRes.json();
        setSpecialties(specialtiesData);
      }

      if (locationsRes.ok) {
        const locationsData = await locationsRes.json();
        setLocations(locationsData);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données de filtres:', error);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPagination(prev => ({
      ...prev,
      currentPage: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
    window.scrollTo(0, 0);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      specialty: '',
      rating: '',
      sortBy: 'name'
    });
    setPagination(prev => ({
      ...prev,
      currentPage: 1
    }));
  };

  const currentCategoryInfo = categoryInfo[category];

  if (!currentCategoryInfo) {
    return (
      <div className="category-page">
        <div className="container">
          <div className="error-container">
            <h1>Catégorie non trouvée</h1>
            <p>La catégorie demandée n'existe pas.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Category Header */}
      <section className="category-header">
        <div className="container">
          <div className="category-header-content">
            <div className="category-icon" aria-hidden="true">
              {currentCategoryInfo.icon}
            </div>
            <div className="category-text">
              <h1 className="category-title">{currentCategoryInfo.title}</h1>
              <p className="category-description">{currentCategoryInfo.description}</p>
              {!loading && (
                <div className="category-stats">
                  <span className="results-count">
                    {pagination.totalResults} artisan{pagination.totalResults > 1 ? 's' : ''} trouvé{pagination.totalResults > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            <div className="filters-header">
              <h2 className="filters-title">Filtrer les résultats</h2>
              <button
                onClick={clearFilters}
                className="btn btn-link clear-filters-btn"
                type="button"
              >
                Effacer les filtres
              </button>
            </div>
            
            <div className="filters-grid">
              {/* Location Filter */}
              <div className="filter-group">
                <label htmlFor="location-filter" className="filter-label">
                  Localisation
                </label>
                <select
                  id="location-filter"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="filter-select"
                >
                  <option value="">Toutes les villes</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Specialty Filter */}
              <div className="filter-group">
                <label htmlFor="specialty-filter" className="filter-label">
                  Spécialité
                </label>
                <select
                  id="specialty-filter"
                  value={filters.specialty}
                  onChange={(e) => handleFilterChange('specialty', e.target.value)}
                  className="filter-select"
                >
                  <option value="">Toutes les spécialités</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="filter-group">
                <label htmlFor="rating-filter" className="filter-label">
                  Note minimum
                </label>
                <select
                  id="rating-filter"
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="filter-select"
                >
                  <option value="">Toutes les notes</option>
                  <option value="4">4 étoiles et plus</option>
                  <option value="3">3 étoiles et plus</option>
                  <option value="2">2 étoiles et plus</option>
                </select>
              </div>

              {/* Sort Filter */}
              <div className="filter-group">
                <label htmlFor="sort-filter" className="filter-label">
                  Trier par
                </label>
                <select
                  id="sort-filter"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="filter-select"
                >
                  <option value="name">Nom (A-Z)</option>
                  <option value="rating">Note (plus haute)</option>
                  <option value="location">Localisation</option>
                  <option value="recent">Plus récents</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="container">
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
                  onClick={fetchArtisans}
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
              {artisans.length > 0 ? (
                <>
                  <div className="artisans-grid">
                    {artisans.map((artisan, index) => (
                      <ArtisanCard 
                        key={artisan.id} 
                        artisan={artisan}
                        priority={index < 3} // Priority loading for first 3 images
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <nav className="pagination-nav" aria-label="Navigation des pages">
                      <div className="pagination">
                        <button
                          onClick={() => handlePageChange(pagination.currentPage - 1)}
                          disabled={pagination.currentPage === 1}
                          className="pagination-btn pagination-prev"
                          type="button"
                          aria-label="Page précédente"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Précédent
                        </button>

                        <div className="pagination-info">
                          Page {pagination.currentPage} sur {pagination.totalPages}
                        </div>

                        <button
                          onClick={() => handlePageChange(pagination.currentPage + 1)}
                          disabled={pagination.currentPage === pagination.totalPages}
                          className="pagination-btn pagination-next"
                          type="button"
                          aria-label="Page suivante"
                        >
                          Suivant
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </nav>
                  )}
                </>
              ) : (
                <div className="no-results">
                  <div className="no-results-content">
                    <div className="no-results-icon" aria-hidden="true">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>Aucun artisan trouvé</h3>
                    <p>
                      Aucun artisan ne correspond à vos critères de recherche. 
                      Essayez de modifier vos filtres ou de rechercher dans une autre catégorie.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="btn btn-primary"
                      type="button"
                    >
                      Effacer les filtres
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;