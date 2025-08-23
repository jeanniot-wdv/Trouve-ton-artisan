// pages/Artisan.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiService from '../services/apiServices';
import ContactForm from '../components/form/ContactForm';
import '../assets/styles/artisan.scss';

const Artisan = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        setLoading(true);
        const response = await apiService.getArtisanById(id);
        if (response.success) {
          setArtisan(response.data);
        } else {
          throw new Error(response.message || 'Erreur lors du chargement');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisan();
  }, [id]);

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border" /></div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  if (!artisan) {
    return <div className="text-center py-5">Aucun artisan trouvé</div>;
  }

  return (
    <div className="container artisan-page py-4">
      <div className="row g-4">
        {/* Col gauche : infos artisan */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4 artisan-card">
            <div className="d-flex align-items-center mb-4">
              <img
                src={artisan.image_url || 'https://placehold.co/100x100'}
                alt={artisan.nom}
                className="rounded-circle me-3 artisan-avatar"
              />
              <div>
                <h2 className="fw-bold mb-1">{artisan.nom}</h2>
                <p className="mb-0 text-muted">{artisan.ville} ({artisan.departement})</p>
              </div>
            </div>

            {artisan.description && (
              <p className="artisan-description">{artisan.description}</p>
            )}

            <ul className="list-unstyled artisan-infos">
              {artisan.telephone && <li><i className="bi bi-telephone me-2"></i>{artisan.telephone}</li>}
              <li><i className="bi bi-envelope me-2"></i>{artisan.email}</li>
              {artisan.site_web && (
                <li><i className="bi bi-globe me-2"></i>
                  <a href={artisan.site_web} target="_blank" rel="noreferrer">{artisan.site_web}</a>
                </li>
              )}
              <li><i className="bi bi-star-fill text-warning me-2"></i>
                {artisan.note_moyenne} / 5 ({artisan.nombre_avis} avis)
              </li>
            </ul>
          </div>
        </div>

        {/* Col droite : formulaire de contact */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 artisan-contact">
            <h5 className="fw-bold mb-3">Contacter {artisan.nom}</h5>
            <ContactForm artisanId={artisan.id_artisan} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artisan;
