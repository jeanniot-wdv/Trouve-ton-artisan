import React, { useState } from 'react';

const  Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Erreur de connexion');
      } else {
        localStorage.setItem('token', data.data.token); // stocker le JWT
        onLoginSuccess && onLoginSuccess(data.data.token);
      }
    } catch (err) {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="d-flex login" role="search" onSubmit={handleSubmit}>
      <input 
        className="form-control small me-2"
        type="email" 
        placeholder="Email"
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        required />

      <input 
        className="form-control small me-2"
        type="password" 
        placeholder="Mot de passe"
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        required />
      
      {error && <p className="text-warning">{error}</p>}
      <button 
        className="btn w-100 fw-medium" 
        type="submit" 
        disabled={loading}>
        {loading ? "Connexion..." : "Connexion"}
      </button>
    </form>
  );
}

export default Login;
