// hooks/useCategoryArtisans.js
import { useState, useEffect } from 'react';
import apiService from '../services/apiServices';

const useCategoryArtisans = (slug) => {
  console.log('Hook initialized with slug:', slug);
  
  const [artisans, setArtisans] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    ville: '',
    departement: '',
    search: '',
    page: 1
  });
  const [totalPages, setTotalPages] = useState(1);
  const [departements, setDepartements] = useState([]);
  const [villes, setVilles] = useState([]);

  // Récupération des données de la catégorie
  const fetchCategoryData = async () => {
    console.log('Fetching category data for:', slug);
    try {
      setLoading(true);
      setError(null);
      
      // Vérification que apiService et la méthode request existent
      if (!apiService || typeof apiService.request !== 'function') {
        throw new Error('ApiService not properly configured');
      }
      
      const response = await apiService.request(`/categories/${slug}`);
      console.log('Category response:', response);
      
      if (response && response.success) {
        setCategory(response.data);
        console.log('Category set:', response.data);
      } else {
        throw new Error(response?.message || 'Failed to load category');
      }
    } catch (err) {
      console.error('Category fetch error:', err);
      setError(`Impossible de charger la catégorie: ${err.message}`);
    }
  };

  // Récupération des artisans de la catégorie
  const fetchArtisans = async () => {
    if (!category) {
      console.log('No category yet, skipping artisans fetch');
      return;
    }
    
    console.log('Fetching artisans for category:', category);
    
    try {
      const params = new URLSearchParams({
        page: filters.page,
        limit: 12,
        ...(filters.ville && { ville: filters.ville }),
        ...(filters.departement && { departement: filters.departement }),
        ...(filters.search && { search: filters.search })
      });

      const response = await apiService.request(`/categories/${slug}/artisans?${params}`);
      console.log('Artisans response:', response);
      
      if (response && response.success) {
        setArtisans(response.data || []);
        setTotalPages(Math.ceil((response.total || 0) / 12));
        console.log('Artisans set:', response.data);
      } else {
        throw new Error(response?.message || 'Failed to load artisans');
      }
    } catch (err) {
      console.error('Artisans fetch error:', err);
      setError(`Impossible de charger les artisans: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Récupération des départements
  const fetchDepartements = async () => {
    try {
      const response = await apiService.request('/artisans/departements');
      if (response && response.success) {
        setDepartements(response.data || []);
      }
    } catch (err) {
      console.error('Erreur départements:', err);
    }
  };

  // Gestion du changement de département
  const handleDepartementChange = async (departement) => {
    console.log('Department changed to:', departement);
    setFilters(prev => ({ ...prev, departement, ville: '', page: 1 }));
    
    if (departement) {
      try {
        const response = await apiService.request(`/artisans/departements/${departement}/villes`);
        if (response && response.success) {
          setVilles(response.data || []);
        }
      } catch (err) {
        console.error('Erreur villes:', err);
      }
    } else {
      setVilles([]);
    }
  };

  // Gestion des changements de filtres
  const handleFilterChange = (key, value) => {
    console.log('Filter changed:', key, value);
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  // Gestion de la pagination
  const handlePageChange = (newPage) => {
    console.log('Page changed to:', newPage);
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo(0, 0);
  };

  // Reset des filtres
  const resetFilters = () => {
    console.log('Resetting filters');
    setFilters({ ville: '', departement: '', search: '', page: 1 });
    setVilles([]);
  };

  // Chargement initial
  useEffect(() => {
    console.log('Initial effect triggered, slug:', slug);
    if (slug) {
      fetchCategoryData();
      fetchDepartements();
    }
  }, [slug]);

  // Rechargement des artisans quand les filtres changent
  useEffect(() => {
    console.log('Filters effect triggered:', filters, 'category:', category);
    if (category) {
      fetchArtisans();
    }
  }, [filters, category]);

  console.log('Hook returning state:', { 
    artisans: artisans.length, 
    category: category?.nom_categorie, 
    loading, 
    error 
  });

  return {
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
  };
};

export default useCategoryArtisans;