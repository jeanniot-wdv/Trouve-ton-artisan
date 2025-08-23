// components/ContactForm.jsx
import { useState } from 'react';
import apiService from '../../services/apiServices';

const ContactForm = ({ artisanId }) => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
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
      const response = await apiService.sendContact({
        ...formData,
        artisanId,
      });
      if (response.success) {
        setSuccess('Votre message a été envoyé avec succès.');
        setFormData({ nom: '', email: '', message: '' });
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
    <form onSubmit={handleSubmit}>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="nom" className="form-label">Nom</label>
        <input
          type="text"
          name="nom"
          className="form-control"
          value={formData.nom}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">Message</label>
        <textarea
          name="message"
          className="form-control"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn w-100 text-white"
        style={{ backgroundColor: '#0074C7' }}
        disabled={loading}
      >
        {loading ? 'Envoi...' : 'Envoyer'}
      </button>
    </form>
  );
};

export default ContactForm;
