// components/cards/ArtisanCard.jsx
import { Link } from 'react-router-dom';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i
        key={i}
        className={`bi ${i <= rating ? 'bi-star-fill me-1 artisan-star small' : 'bi-star me-1 artisan-star small empty'}`}
      ></i>
    );
  }
  return <div className="d-flex justify-content-center align-items-center mb-2">{stars}</div>;
};

const ArtisanCard = ({ artisan }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4 w-100">
      <Link to={`/artisan/${artisan.id_artisan || artisan.id}`} className="text-decoration-none">
        <div className="bg-white card h-100 shadow-sm artisan-card">
          <div className="card-body text-center p-4">
            {/* Image de profil */}
            <div className="mb-3">
              <img
                src={artisan.image_url}
                alt={`${artisan.nom}`}
                className="rounded-circle artisan-profile-img"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(artisan.nom)}&background=0074C7&color=fff&size=120&bold=true`;
                }}
              />
            </div>
            
            {/* Nom */}
            <h5 className="artisan-name fw-medium mb-2">{artisan.nom}</h5>
            
            {/* Note */}
            <StarRating rating={Math.round(artisan.note_moyenne || artisan.note || 0)} />
            
            {/* Spécialité */}
            <p className="small mb-2">
              {artisan.specialite?.nom_specialite || 'Spécialité non précisée'}
            </p>
            
            {/* Localisation */}
            <p className="artisan-location">
              <i className="bi bi-geo-alt-fill location-icon"></i>
              {artisan.ville}
            </p>
            
            {/* Bouton */}
            <button className="btn artisan-btn fw-medium white">
              Voir le profil
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArtisanCard;