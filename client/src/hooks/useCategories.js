// hooks/useCategories.js
import { useState, useEffect } from 'react';
import apiService from '../services/apiServices';

// Mapping des icônes par catégorie
const CATEGORY_ICONS = {
  'Plomberie': 'bi-wrench-adjustable',
  'Électricité': 'bi-lightning-charge',
  'Électrique': 'bi-lightning-charge',
  'Bâtiment': 'bi-bricks',
  'Menuiserie': 'bi-hammer',
  'Peinture': 'bi-paint-bucket',
  'Jardinage': 'bi-tree',
  'Fabrication': 'bi-tools',
  'Chauffage': 'bi-thermometer-sun',
  'Climatisation': 'bi-snow',
  'Alimentation': 'bi-basket',
  'Couverture': 'bi-house-up',
  'Carrelage': 'bi-grid-3x3',
  'Services': 'bi-person-gear',
  'Isolation': 'bi-house-gear',
  'Nettoyage': 'bi-droplet',
  'Rénovation': 'bi-tools',
  'Construction': 'bi-building',
  'Automobile': 'bi-car-front',
  'Mécanique': 'bi-gear',
  'default': 'bi-tools'
};

// Fonction helper pour obtenir l'icône d'une catégorie
const getCategoryIcon = (categoryName) => {
  // Vérification que categoryName existe et n'est pas null/undefined
  if (!categoryName || typeof categoryName !== 'string') {
    return CATEGORY_ICONS.default;
  }
  
  const exactMatch = CATEGORY_ICONS[categoryName];
  if (exactMatch) return exactMatch;
  
  const categoryLower = categoryName.toLowerCase();
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (key !== 'default' && 
        (categoryLower.includes(key.toLowerCase()) || key.toLowerCase().includes(categoryLower))) {
      return icon;
    }
  }
  
  return CATEGORY_ICONS.default;
};

const useCategories = (limit = null) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.getCategories();
        
        if (response.success) {
          // Appliquer la limite si spécifiée (pour la page Home par exemple)
          const categoriesData = limit 
            ? response.data.slice(0, limit) 
            : response.data;
          setCategories(categoriesData);
        } else {
          throw new Error(response.message || 'Erreur lors du chargement des catégories');
        }
      } catch (err) {
        setError(err.message);
        console.error('Erreur lors du chargement des catégories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [limit]);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getCategories();
      
      if (response.success) {
        const categoriesData = limit 
          ? response.data.slice(0, limit) 
          : response.data;
        setCategories(categoriesData);
      } else {
        throw new Error(response.message || 'Erreur lors du chargement des catégories');
      }
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du rechargement des catégories:', err);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch, getCategoryIcon };
};

export default useCategories;