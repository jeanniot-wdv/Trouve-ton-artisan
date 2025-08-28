// hooks/useArtisansDuMois.js
import { useState, useEffect } from 'react';
import apiService from '../services/apiServices';

const useArtisansDuMois = (limit = 3) => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtisansDuMois = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.getArtisansDuMois(limit);
        
        if (response.success) {
          setArtisans(response.data);
        } else {
          throw new Error(response.message || 'Erreur lors du chargement des artisans');
        }
      } catch (err) {
        setError(err.message);
        console.error('Erreur lors du chargement des artisans du mois:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisansDuMois();
  }, [limit]);

  const refetch = async () => {
    await fetchArtisansDuMois();
  };

  return { artisans, loading, error, refetch };
};

export default useArtisansDuMois;