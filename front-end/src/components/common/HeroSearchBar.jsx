// components/search/HeroSearchBar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiServices";

const HeroSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fonction de recherche
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true);
        const response = await apiService.searchArtisans(searchTerm, { limit: 5 });
        if (response.success) {
          setSuggestions(response.data.artisans || []);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Erreur recherche artisans:", err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300); // ⏱️ anti spam API
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Gestion du submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (suggestions.length === 1) {
      navigate(`/artisan/${suggestions[0].id_artisan}`);
    } else {
      // On reste sur home → aucune redirection
      console.log("Aucun artisan sélectionné, rester sur home");
    }
  };

  return (
    <form onSubmit={handleSearch} className="hero-search mb-4 position-relative">
      <div className="input-group mx-auto search-group">
        <input
          type="text"
          className="form-control form-control-lg search-input"
          placeholder="Trouver un artisan par nom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-lg px-4 text-white fw-semibold search-btn"
          type="submit"
        >
          Rechercher
        </button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100 mt-1 shadow-sm z-3">
          {suggestions.map((artisan) => (
            <li
              key={artisan.id_artisan}
              className="list-group-item list-group-item-action"
              role="button"
              onClick={() => navigate(`/artisan/${artisan.id_artisan}`)}
            >
              {artisan.nom}
              <span className="text-muted small"> – {artisan.ville}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Loader */}
      {loading && (
        <div className="position-absolute bg-white border mt-1 p-2 small">
          Chargement...
        </div>
      )}
    </form>
  );
};

export default HeroSearchBar;
