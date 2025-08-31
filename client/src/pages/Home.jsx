// pages/Home.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import useArtisansDuMois from '../hooks/useArtisansDuMois';
import useCategories from '../hooks/useCategories';

import Hero from '../components/partial/Hero';
import HeroSearchBar from '../components/common/HeroSearchBar';
import ArtisanCard from '../components/cards/ArtisanCard';
import CardStep from '../components/cards/CardStep';
import Cta from '../components/common/Cta';
import CardConfiance from '../components/cards/CardConfiance';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { categories, loading: categoriesLoading, getCategoryIcon } = useCategories(4);
  const { artisans, loading, error } = useArtisansDuMois(3);

  useTitle("Accueil");

  return (
    <>
      {/* Section Hero */}
      <Hero 
        classHero="hero-full"
        title="Découvrez les artisans de votre région"
        description="Trouvez facilement un artisan qualifié en Auvergne-Rhône-Alpes. 
          Contactez-les directement et obtenez une réponse sous 48h."
      >
        <HeroSearchBar />  
        <p className="mb-4 fs-6">Ou explorez par catégorie ci-dessous</p>
        
        {/* Cartes de catégories */}
        <div className="row g-3 justify-content-center mb-4">
          {categoriesLoading ? (
            <div className="col-12">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Chargement des catégories...</span>
              </div>
            </div>
          ) : (
            categories.map((category) => (
              <div key={category.id_categorie} className="col-6 col-md-3">
                <Link 
                  to={`/categories/${category.slug_categorie}`}
                  className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm category-card">
                    <div className="card-body text-center p-3">
                      <div className="category-icon mx-auto mb-3">
                        <i className={`bi ${getCategoryIcon(category.nom_categorie)} fs-4 text-white`}></i>
                      </div>
                      <h6 className="card-title mb-2 fs-6 fw-medium text-white">
                        {category.nom_categorie}
                      </h6>
                      <p className="card-text small text-white opacity-75">
                        Voir les artisans
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
        <button 
          className="btn btn-outline-light px-4"
          onClick={() => document.getElementById('best-artisan')?.scrollIntoView(0, { behavior: 'smooth' })}>
          Les artisans du mois
        </button>
      </Hero>

      {/* Section Comment ça marche */}
      <section id="comment-ca-marche" className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-medium mb-3">
            Comment trouver mon artisan ?
          </h2>
          <p className="lead text-muted">
            Suivez ces 4 étapes simples pour trouver l'artisan parfait
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <CardStep
              stepNumber={1}
              title="Choisir la catégorie d'artisanat dans le menu"
              description="Dans le menu en haut de la page, choisissez la catégorie d'artisanat que vous recherchez afin de pouvoir sélectionner uniquement les artisans spécialisés dans ce domaine."
              imageSrc="/images/1-categorie.png"
              imageAlt="Illustration du choix de catégorie"
              reverse={false}
            />
            <CardStep
              stepNumber={2}
              title="Choisir un artisan"
              description="Sélectionnez l'artisan de la liste qui vous a le plus séduit. Référez-vous aux informations de son profil pour faire votre choix (avis, spécialité, localisation)."
              imageSrc="/images/2-artisan.png"
              imageAlt="Illustration du choix d'artisan"
              reverse={true}
            />
            <CardStep
              stepNumber={3}
              title="Le contacter via le formulaire de contact"
              description="Cliquez sur l'artisan que vous avez choisi pour avoir des informations supplémentaires sur ce dernier. Contactez-le via le formulaire de contact."
              imageSrc="/images/3-contact.png"
              imageAlt="Illustration du formulaire de contact"
              reverse={false}
            />
            <CardStep
              stepNumber={4}
              title="Une réponse sera apportée sous 48h"
              description="Une fois votre message envoyé, l'artisan s'engage à vous répondre dans les 48 heures."
              imageSrc="/images/4-reponse.png"
              imageAlt="Illustration de la réponse sous 48h"
              reverse={true}
            />
          </div>
        </div>
      </section>

      {/* Section Artisans du mois */}
      <section id="best-artisan" className="artisans-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-medium mb-3 section-title">
              Les artisans du mois
            </h2>
            <p className="lead text-muted mb-4">
              Découvrez nos artisans sélectionnés pour leur excellence
            </p>
          </div>

          {loading && (
            <div className="text-center">
              <div className="spinner-border loading-spinner" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center rounded-4" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Erreur lors du chargement des artisans du mois : {error}
            </div>
          )}

          {!loading && !error && (
            <div className="row justify-content-center g-4">
              {artisans.length > 0 ? (
                artisans.map((artisan) => (
                  <div key={artisan.id_artisan} className="col-lg-4 col-md-6">
                    <ArtisanCard artisan={artisan} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <div className="bg-white rounded-4 border-2 border-dashed p-5 no-artisans">
                    <i className="fas fa-tools display-4 text-muted mb-3"></i>
                    <p className="text-muted mb-0">
                      Aucun artisan du mois disponible pour le moment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section Call to Action */}
      <Cta title="Prêt à trouver votre artisan ?"
          textButtonLeft="Tous les artisans" linkToLeft="artisans" 
          textButtonRight="Toutes les catégories" linkToRight="categories"
          description="Explorez nos différentes catégories et trouvez l'artisan qui 
                    répondra parfaitement à vos besoins."/>

      {/* Section Une plateforme de confiance */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="display-5 text-center fw-medium mb-3 trust-title mb-5">Une plateforme de confiance</h2>
          <div className="row g-4 justify-content-center">

            <CardConfiance icon="patch-check" iconColor="primary" title="Artisans vérifiés"
              description="Tous nos artisans sont vérifiés et certifiés 
                          par la région Auvergne-Rhône-Alpes."
            />
            <CardConfiance icon="clock" iconColor="success" title="Réponse garantie"
              description="Réponse sous 48h maximum pour tous vos projets 
                          et demandes de devis."
            />
            <CardConfiance icon="geo-alt" iconColor="danger" title="Artisans locaux"
              description="Trouvez des artisans près de chez vous dans 
                          toute la région Auvergne-Rhône-Alpes."
            />
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;