// services/apiService.js

// Configuration pour Vite
const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3001/api';

// OU Configuration pour Create React App (si vous utilisez CRA)
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// OU Configuration simple sans variables d'environnement
// const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  // Récupérer les artisans du mois
  async getArtisansDuMois(limit = 3) {
    return this.request(`/artisans/artisans-du-mois?limit=${limit}`);
  }

  // Récupérer tous les artisans avec filtres
  async getAllArtisans(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/artisans?${searchParams}`);
  }

  // Récupérer un artisan par ID
  async getArtisanById(id) {
    return this.request(`/artisans/${id}`);
  }

  // Rechercher des artisans
  async searchArtisans(query, params = {}) {
    const searchParams = new URLSearchParams({ q: query, ...params });
    return this.request(`/artisans/search?${searchParams}`);
  }

  // Récupérer les catégories
  async getCategories() {
    return this.request('/categories');
  }

  // Envoyer un message de contact
  async sendContact(artisanId, contactData) {
    return this.request(`/contact/artisan/${artisanId}`, {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }
}

export default new ApiService();