// components/form/ContactForm.jsx
import { useState } from 'react';
import apiService from '../../services/apiServices';

const ContactForm = ({ artisanId }) => {
  const [formData, setFormData] = useState({
    nom_expediteur: '',
    email_expediteur: '',
    objet: '',
    message: '',
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await apiService.sendContact(artisanId, formData);
      if (response.success) {
        setSuccess('Votre message a été envoyé avec succès.');
        setFormData({ nom_expediteur: '', email_expediteur: '', objet: '', message: '' });
      } else {
        throw new Error(response.message || 'Erreur lors de l’envoi');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white rounded shadow-sm">
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="nom_expediteur" className="form-label">Nom</label>
        <input
          type="text"
          name="nom_expediteur"
          id="nom_expediteur"
          className="form-control"
          value={formData.nom_expediteur}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email_expediteur" className="form-label">Email</label>
        <input
          type="email"
          name="email_expediteur"
          id="email_expediteur"
          className="form-control"
          value={formData.email_expediteur}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="objet" className="form-label">Objet</label>
        <input
          type="text"
          name="objet"
          id="objet"
          className="form-control"
          value={formData.objet}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">Message</label>
        <textarea
          name="message"
          id="message"
          className="form-control"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn w-100 text-white fw-medium"
        disabled={loading}
      >
        {loading ? 'Envoi...' : 'Envoyer'}
      </button>
    </form>
  );
};

export default ContactForm;
