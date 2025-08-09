import CardStep from "./components/cards/CardStep"
import Footer from "./components/common/Footer"
import Header from "./components/common/Header"

function App() {
  return (
    <>
    <Header />

    <main>

      <div className="container mt-4 py-2 text-center">
        <h1 style={{color:"steelblue"}}>Découvre les artisans de ta région</h1>
        <p>La plateforme officielle de la région Auvergne-Rhône-Alpes pour découvrir les meilleurs artisans près de chez toi</p>
      </div>

      <section className="container my-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 text-center gy-4">
          <div className="col"><CardStep 
                step="1" 
                title="Choisis la catégorie d'artisanat dans le menu" 
                description="Dans le menu en haut de la page, choisis la 
                catégorie d'artisanat que tu recherches afin de pouvoir 
                sélectionner uniquement les artisans spécialisés dans ce domaine." /></div>
          <div className="col"><CardStep 
                step="2"
                title="Choisis un artisan"
                description="Sélectionnez l'artisan de la liste qui vous a 
                le plus séduit. Référez vous sur les informations de son profil 
                pour faire votre choix (avis, spécialité, localisation)." /></div>
          <div className="col"><CardStep
                step="3"
                title="Contactes l'artisan avec le formulaire de contact"
                description="Cliquez sur l'artisan que vous avez choisi pour 
                avoir des informations supplémentaires sur ce dernier. 
                Contactez-le via le formulaire de contact." /></div>
          <div className="col"><CardStep
                step="4"
                title="Une réponse te sera apportée dans 48 heures"
                description="Une fois votre message envoyé, l'artisan s'engage 
                à vous répondre dans les 48 heures."/></div>
        </div>
      </section>

      <section id="artisans_list" className="container py-5">
        <h2 className="text-center mb-4">Les artisans du mois</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {/* Ici, on pourrait mapper une liste d'artisans pour afficher leurs cartes */}
          <div className="col">
            <CardStep 
              step="1" 
              title="Artisan 1" 
              description="Description de l'artisan 1. Spécialité, localisation, etc." />
          </div>
          <div className="col">
            <CardStep 
              step="2" 
              title="Artisan 2" 
              description="Description de l'artisan 2. Spécialité, localisation, etc." />
          </div>
          <div className="col">
            <CardStep 
              step="3" 
              title="Artisan 3" 
              description="Description de l'artisan 3. Spécialité, localisation, etc." />
          </div>
        </div>


      </section>

      <section className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <h2>À propos de nous</h2>
            <p>Nous sommes dédiés à mettre en avant les artisans locaux de la région Auvergne-Rhône-Alpes. Notre mission est de connecter les consommateurs avec les artisans talentueux qui font la richesse de notre région.</p>
          </div>
          <div className="col-md-6">
            <h2>Contact</h2>
            <p>Pour toute question ou suggestion, n'hésitez pas à nous contacter via notre formulaire en ligne ou par email.</p>
          </div>
        </div>
      </section>

      <Footer />

    </main>
    </>
  )
}

export default App
