// components/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useArtisansDuMois from '../hooks/useArtisansDuMois';
import ArtisanCard from '../components/cards/ArtisanCard';
import CardStep from '../components/cards/CardStep';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { artisans, loading, error } = useArtisansDuMois(3);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <section className="container-fluid hero text-center text-white align-content-center">
        <div className="container px-3 h-auto">
          <h1>Découvrez les artisans de votre région</h1>
          <p className="w-75 mx-auto mt-4">
            Trouvez facilement un artisan qualifié en Auvergne-Rhône-Alpes. 
            Contactez-les directement et obtenez une réponse sous 48h.
          </p>

          <form onSubmit={handleSearch} className="input-group mx-auto mb-3 w-50">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Trouver un artisan par nom" 
              aria-label="Trouver un artisan par nom" 
              aria-describedby="button-search-artisan"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="btn btn-primary" 
              type="submit" 
              id="button-search-artisan"
            >
              Rechercher
            </button>
          </form>
          
          <p>Ou explorez par catégorie ci-dessous</p>
          
          <div className="row">
            <a href="#" className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <p className="btn btn-primary">Go somewhere</p>
                </div>
              </div>
            </a>
            <a href="#" className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <p className="btn btn-primary">Go somewhere</p>
                </div>
              </div>
            </a>
            <a href="#" className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <p className="btn btn-primary">Go somewhere</p>
                </div>
              </div>
            </a>
            <a href="#" className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <p className="btn btn-primary">Go somewhere</p>
                </div>
              </div>
            </a>
          </div>
          <button className="btn btn-outline-light mt-5">Comment ça marche</button>
        </div>
      </section>

      <section className="container">
        <h2 className="text-center my-5" style={{ color: '#384050', fontWeight: 'bold' }}>
          Comment trouver mon artisan ?
        </h2>

        <CardStep
          stepNumber={1}
          title="Choisir la catégorie d'artisanat dans le menu"
          description="Dans le menu en haut de la page, choisissez la catégorie d'artisanat que vous recherchez afin de pouvoir sélectionner uniquement les artisans spécialisés dans ce domaine."
          imageSrc="https://placehold.co/300x200/0074C7/ffffff"
          imageAlt="Illustration du choix de catégorie"
          reverse={false}
        />

        <CardStep
          stepNumber={2}
          title="Choisir un artisan"
          description="Sélectionnez l'artisan de la liste qui vous a le plus séduit. Référez-vous aux informations de son profil pour faire votre choix (avis, spécialité, localisation)."
          imageSrc="https://placehold.co/300x200/00497C/ffffff"
          imageAlt="Illustration du choix d'artisan"
          reverse={true}
        />

        <CardStep
          stepNumber={3}
          title="Le contacter via le formulaire de contact"
          description="Cliquez sur l'artisan que vous avez choisi pour avoir des informations supplémentaires sur ce dernier. Contactez-le via le formulaire de contact."
          imageSrc="https://placehold.co/300x200/82B864/ffffff"
          imageAlt="Illustration du formulaire de contact"
          reverse={false}
        />

        <CardStep
          stepNumber={4}
          title="Une réponse sera apportée sous 48h"
          description="Une fois votre message envoyé, l'artisan s'engage à vous répondre dans les 48 heures."
          imageSrc="https://placehold.co/300x200/CD2C2E/ffffff"
          imageAlt="Illustration de la réponse sous 48h"
          reverse={true}
        />
      </section>

      <section id="best-artisan" className="container py-5">
        <div className="container-fluid">
          <h2 className="text-center my-4">Les artisans du mois</h2>

          {loading && (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              Erreur lors du chargement des artisans du mois: {error}
            </div>
          )}

          {!loading && !error && (
            <div className="row d-flex justify-content-center">
              {artisans.length > 0 ? (
                artisans.map((artisan) => (
                  <ArtisanCard key={artisan.id} artisan={artisan} />
                ))
              ) : (
                <div className="text-center">
                  <p>Aucun artisan du mois disponible pour le moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section id="find-artisan" className="container-fluid py-5">
        <div className="container-fluid">
          <h2 className="text-center my-4">Prêt à trouver votre artisan ?</h2>
          <p className="w-75 mx-auto mt-4">
            Explorez nos différentes catégories et trouvez l'artisan qui 
            répondra parfaitement à vos besoins.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;