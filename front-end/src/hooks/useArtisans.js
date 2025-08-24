// hooks/useArtisansDuMois.js
import { useState, useEffect } from 'react';
import apiService from '../services/apiServices';

const useArtisans = (initPage = 1, limit = 12) => {
  const [artisans, setArtisans] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(initPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArtisans = async (pageToFetch = page) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getAllArtisans({page: pageToFetch, limit});
      
      if (response.success) {
        setArtisans(response.data.artisans || []);
        setPagination(response.data.pagination || null);
        window.scrollTo(0, 0);
      } else {
        throw new Error(response.message || 'Erreur lors du chargement des artisans');
      }
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement des artisans', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchArtisans(page);
  }, [page]);

  const refetch = async () => {
    await fetchArtisans();
  };

  return { artisans, pagination, page, setPage, loading, error, refetch: fetchArtisans };
};

export default useArtisans;