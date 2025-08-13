import React from 'react';
import { Link } from 'react-router-dom';

const ArtisanCard = ({ artisan, priority = false }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="star filled" aria-hidden="true">★</span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="star half-filled" aria-hidden="true">☆</span>
        );
      } else {
        stars.push(
          <span key={i} className="star empty" aria-hidden="true">☆</span>
        );
      }
    }
    
    return stars;
  };

  const formatLocation = (location) => {
    if (!location) return 'Localisation non spécifiée';
    
    // Extract city and postal code if available
    const parts = location.split(',');
    if (parts.length >= 2) {
      return parts.slice(-2).join(',').trim();
    }
    return location;
  };

  return (
    <article className="artisan-card">
      <Link 
        to={`/artisan/${artisan.id}`}
        className="artisan-card-link"
        aria-label={`Voir le profil de ${artisan.name}`}
      >
        <div className="artisan-card-image">
          {artisan.image ? (
            <img 
              src={artisan.image}
              alt={`${artisan.name} - ${artisan.specialty}`}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
            />
          ) : (
            <div className="artisan-placeholder" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>

        <div className="artisan-card-content">
          <header className="artisan-header">
            <h3 className="artisan-name">
              {artisan.name}
            </h3>
            
            {artisan.rating && (
              <div className="artisan-rating">
                <div className="stars" aria-label={`Note: ${artisan.rating} sur 5`}>
                  {renderStars(artisan.rating)}
                </div>
                <span className="rating-text">
                  ({artisan.rating}/5)
                </span>
              </div>
            )}
          </header>

          <div className="artisan-details">
            <div className="artisan-specialty">
              <span className="label">Spécialité:</span>
              <span className="value">{artisan.specialty || 'Non spécifiée'}</span>
            </div>
            
            <div className="artisan-location">
              <span className="label">Localisation:</span>
              <span className="value">{formatLocation(artisan.location)}</span>
            </div>
          </div>

          {artisan.description && (
            <p className="artisan-excerpt">
              {artisan.description.length > 100 
                ? `${artisan.description.substring(0, 100)}...`
                : artisan.description
              }
            </p>
          )}
        </div>

        <div className="artisan-card-footer">
          <span className="view-profile-text">
            Voir le profil
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
};

export default ArtisanCard;