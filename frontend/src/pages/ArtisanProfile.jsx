import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ArtisanProfile = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: ''
  });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    fetchArtisan();
  }, [id]);

  const fetchArtisan = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/artisans/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Artisan non trouvé');
        }
        throw new Error('Erreur lors du chargement du profil');
      }
      
      const data = await response.json();
      setArtisan(data);
      
      // Update document title and meta description
      document.title = `${data.name} - ${data.specialty} - Trouve ton artisan`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `Contactez ${data.name}, ${data.specialty} à ${data.location}. ${data.description || 'Artisan qualifié en Auvergne-Rhône-Alpes.'}`
        );
      }
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement de l\'artisan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artisanId: id,
          ...contactForm
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message');
      }

      setFormStatus({ loading: false, success: true, error: null });
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        projectType: '',
        budget: '',
        timeline: ''
      });
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: err.message });
    }
  };

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

  if (loading) {
    return (
      <div className="artisan-profile">
        <div className="container">
          <div className="loading-container" role="status" aria-live="polite">
            <div className="loading-spinner" aria-hidden="true"></div>
            <span className="visually-hidden">Chargement du profil artisan...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !artisan) {
    return (
      <div className="artisan-profile">
        <div className="container">
          <div className="error-container" role="alert">
            <div className="error-message">
              <h1>Profil non trouvé</h1>
              <p>{error || 'Ce profil d\'artisan n\'existe pas ou a été supprimé.'}</p>
              <Link to="/" className="btn btn-primary">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="artisan-profile">
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Accueil</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/${artisan.category}`}>
                {artisan.category.charAt(0).toUpperCase() + artisan.category.slice(1)}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {artisan.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Profile Header */}
      <section className="profile-header">
        <div className="container">
          <div className="profile-header-content">
            <div className="profile-image-container">
              {artisan.image ? (
                <img 
                  src={artisan.image}
                  alt={`${artisan.name} - ${artisan.specialty}`}
                  className="profile-image"
                  loading="eager"
                />
              ) : (
                <div className="profile-image-placeholder" aria-hidden="true">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>

            <div className="profile-info">
              <h1 className="profile-name">{artisan.name}</h1>
              <p className="profile-specialty">{artisan.specialty}</p>
              <p className="profile-location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M21 10C21 17L12 21L3 10C3 5.58172 7.58172 1 12 1C16.4183 1 21 5.58172 21 10Z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {artisan.location}
              </p>

              {artisan.rating && (
                <div className="profile-rating">
                  <div className="stars" aria-label={`Note: ${artisan.rating} sur 5`}>
                    {renderStars(artisan.rating)}
                  </div>
                  <span className="rating-text">
                    {artisan.rating}/5 ({artisan.reviewsCount || 0} avis)
                  </span>
                </div>
              )}

              <div className="profile-contact-quick">
                {artisan.phone && (
                  <a href={`tel:${artisan.phone}`} className="btn btn-outline contact-phone">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19.92C22.0011 20.2084 21.9441 20.4943 21.8325 20.7584C21.7209 21.0225 21.5573 21.2593 21.3521 21.4541C21.1468 21.6488 20.9046 21.7977 20.6407 21.8911C20.3769 21.9845 20.0974 22.0201 19.82 21.9952C16.7428 21.6833 13.787 20.6336 11.19 18.9252C8.77382 17.3717 6.72533 15.3232 5.17200 12.9052C3.45369 10.2977 2.40278 7.32916 2.10000 4.24016C2.07513 3.96412 2.11068 3.68675 2.20325 3.42482C2.29583 3.1629 2.44347 2.92251 2.63623 2.71938C2.829 2.51624 3.06348 2.35372 3.32512 2.24192C3.58676 2.13012 3.8702 2.07156 4.16000 2.07016H7.16000C7.63339 2.06564 8.09512 2.22623 8.4712 2.52427C8.84728 2.8223 9.11368 3.23749 9.23000 3.70016L10.16 7.04016C10.2858 7.54016 10.2581 8.06723 10.0804 8.55176C9.9027 9.03628 9.58475 9.45177 9.16000 9.74016L7.91000 10.37C9.31097 12.8117 11.3883 14.889 13.83 16.29L14.46 15.04C14.7482 14.6153 15.1637 14.2973 15.6482 14.1196C16.1328 13.9419 16.6598 13.9142 17.16 14.04L20.5 14.97C20.9644 15.0856 21.3815 15.3518 21.6802 15.7284C21.9789 16.1051 22.1396 16.5678 22.13 17.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Appeler
                  </a>
                )}
                <a href="#contact-form" className="btn btn-primary contact-form-btn">
                  Envoyer un message
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <div className="container">
        <div className="profile-content">
          <div className="profile-main">
            {/* About Section */}
            <section className="profile-section">
              <h2 className="section-title">À propos</h2>
              <div className="section-content">
                {artisan.description ? (
                  <p className="profile-description">{artisan.description}</p>
                ) : (
                  <p className="profile-description">
                    {artisan.name} est un artisan {artisan.specialty.toLowerCase()} 
                    situé à {artisan.location}. Contactez-le pour vos projets.
                  </p>
                )}
              </div>
            </section>

            {/* Services Section */}
            {artisan.services && artisan.services.length > 0 && (
              <section className="profile-section">
                <h2 className="section-title">Services proposés</h2>
                <div className="section-content">
                  <ul className="services-list">
                    {artisan.services.map((service, index) => (
                      <li key={index} className="service-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Gallery Section */}
            {artisan.gallery && artisan.gallery.length > 0 && (
              <section className="profile-section">
                <h2 className="section-title">Galerie de réalisations</h2>
                <div className="section-content">
                  <div className="gallery-container">
                    <div className="gallery-main">
                      <img 
                        src={artisan.gallery[activeImageIndex].url}
                        alt={artisan.gallery[activeImageIndex].alt || `Réalisation ${activeImageIndex + 1} de ${artisan.name}`}
                        className="gallery-main-image"
                        loading="lazy"
                      />
                    </div>
                    {artisan.gallery.length > 1 && (
                      <div className="gallery-thumbnails">
                        {artisan.gallery.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`gallery-thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                            type="button"
                            aria-label={`Voir l'image ${index + 1}`}
                          >
                            <img 
                              src={image.thumbnail || image.url}
                              alt={image.alt || `Miniature ${index + 1}`}
                              loading="lazy"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Reviews Section */}
            {artisan.reviews && artisan.reviews.length > 0 && (
              <section className="profile-section">
                <h2 className="section-title">Avis clients</h2>
                <div className="section-content">
                  <div className="reviews-container">
                    {artisan.reviews.map((review, index) => (
                      <div key={index} className="review-item">
                        <div className="review-header">
                          <div className="review-author">
                            <strong>{review.author}</strong>
                            {review.date && (
                              <span className="review-date">
                                {new Date(review.date).toLocaleDateString('fr-FR')}
                              </span>
                            )}
                          </div>
                          <div className="review-rating" aria-label={`Note: ${review.rating} sur 5`}>
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="review-content">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="profile-sidebar">
            {/* Contact Information */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Informations de contact</h3>
              <div className="contact-info">
                {artisan.phone && (
                  <div className="contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M22 16.92V19.92C22.0011 20.2084 21.9441 20.4943 21.8325 20.7584C21.7209 21.0225 21.5573 21.2593 21.3521 21.4541C21.1468 21.6488 20.9046 21.7977 20.6407 21.8911C20.3769 21.9845 20.0974 22.0201 19.82 21.9952C16.7428 21.6833 13.787 20.6336 11.19 18.9252C8.77382 17.3717 6.72533 15.3232 5.17200 12.9052C3.45369 10.2977 2.40278 7.32916 2.10000 4.24016C2.07513 3.96412 2.11068 3.68675 2.20325 3.42482C2.29583 3.1629 2.44347 2.92251 2.63623 2.71938C2.829 2.51624 3.06348 2.35372 3.32512 2.24192C3.58676 2.13012 3.8702 2.07156 4.16000 2.07016H7.16000C7.63339 2.06564 8.09512 2.22623 8.4712 2.52427C8.84728 2.8223 9.11368 3.23749 9.23000 3.70016L10.16 7.04016C10.2858 7.54016 10.2581 8.06723 10.0804 8.55176C9.9027 9.03628 9.58475 9.45177 9.16000 9.74016L7.91000 10.37C9.31097 12.8117 11.3883 14.889 13.83 16.29L14.46 15.04C14.7482 14.6153 15.1637 14.2973 15.6482 14.1196C16.1328 13.9419 16.6598 13.9142 17.16 14.04L20.5 14.97C20.9644 15.0856 21.3815 15.3518 21.6802 15.7284C21.9789 16.1051 22.1396 16.5678 22.13 17.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <a href={`tel:${artisan.phone}`}>{artisan.phone}</a>
                  </div>
                )}
                
                {artisan.email && (
                  <div className="contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <a href={`mailto:${artisan.email}`}>{artisan.email}</a>
                  </div>
                )}

                {artisan.website && (
                  <div className="contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 2C13.5 4.5 14 7.5 14 12S13.5 19.5 12 22C10.5 19.5 10 16.5 10 12S10.5 4.5 12 2Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <a href={artisan.website} target="_blank" rel="noopener noreferrer">
                      Site web
                    </a>
                  </div>
                )}

                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M21 10C21 17L12 21L3 10C3 5.58172 7.58172 1 12 1C16.4183 1 21 5.58172 21 10Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>{artisan.location}</span>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            {artisan.businessHours && (
              <div className="sidebar-section">
                <h3 className="sidebar-title">Horaires d'ouverture</h3>
                <div className="business-hours">
                  {Object.entries(artisan.businessHours).map(([day, hours]) => (
                    <div key={day} className="hours-item">
                      <span className="day">{day}</span>
                      <span className="hours">{hours || 'Fermé'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {artisan.certifications && artisan.certifications.length > 0 && (
              <div className="sidebar-section">
                <h3 className="sidebar-title">Certifications</h3>
                <div className="certifications">
                  {artisan.certifications.map((cert, index) => (
                    <div key={index} className="certification-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Contact Form Section */}
      <section id="contact-form" className="contact-form-section">
        <div className="container">
          <div className="contact-form-container">
            <div className="contact-form-header">
              <h2 className="section-title">Contactez {artisan.name}</h2>
              <p className="section-description">
                Remplissez ce formulaire pour obtenir un devis personnalisé. 
                {artisan.name} s'engage à vous répondre sous 48 heures.
              </p>
            </div>

            {formStatus.success ? (
              <div className="form-success" role="alert">
                <div className="success-icon" aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Message envoyé avec succès !</h3>
                <p>
                  Votre message a été envoyé à {artisan.name}. 
                  Vous devriez recevoir une réponse sous 48 heures.
                </p>
                <button
                  onClick={() => setFormStatus({ loading: false, success: false, error: null })}
                  className="btn btn-outline"
                  type="button"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactFormSubmit} className="contact-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form-label">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactFormChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="project-type" className="form-label">
                      Type de projet
                    </label>
                    <select
                      id="project-type"
                      name="projectType"
                      value={contactForm.projectType}
                      onChange={handleContactFormChange}
                      className="form-select"
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="renovation">Rénovation</option>
                      <option value="construction">Construction neuve</option>
                      <option value="reparation">Réparation</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="budget" className="form-label">
                      Budget approximatif
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={contactForm.budget}
                      onChange={handleContactFormChange}
                      className="form-select"
                    >
                      <option value="">Sélectionner un budget</option>
                      <option value="moins-1000">Moins de 1 000 €</option>
                      <option value="1000-5000">1 000 € - 5 000 €</option>
                      <option value="5000-15000">5 000 € - 15 000 €</option>
                      <option value="15000-50000">15 000 € - 50 000 €</option>
                      <option value="plus-50000">Plus de 50 000 €</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="timeline" className="form-label">
                      Délai souhaité
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={contactForm.timeline}
                      onChange={handleContactFormChange}
                      className="form-select"
                    >
                      <option value="">Sélectionner un délai</option>
                      <option value="urgent">Urgent (moins d'1 mois)</option>
                      <option value="1-3-mois">1 à 3 mois</option>
                      <option value="3-6-mois">3 à 6 mois</option>
                      <option value="plus-6-mois">Plus de 6 mois</option>
                    </select>
                  </div>
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="contact-subject" className="form-label">
                    Objet du message *
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactFormChange}
                    className="form-input"
                    placeholder="Ex: Devis pour rénovation cuisine"
                    required
                  />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="contact-message" className="form-label">
                    Message détaillé *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    className="form-textarea"
                    rows="6"
                    placeholder="Décrivez votre projet en détail..."
                    required
                  ></textarea>
                </div>

                {formStatus.error && (
                  <div className="form-error" role="alert">
                    {formStatus.error}
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary btn-large"
                    disabled={formStatus.loading}
                  >
                    {formStatus.loading ? (
                      <>
                        <div className="btn-spinner" aria-hidden="true"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer le message'
                    )}
                  </button>
                  <p className="form-help">
                    * Champs obligatoires. En envoyant ce formulaire, vous acceptez d'être contacté par cet artisan.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtisanProfile;