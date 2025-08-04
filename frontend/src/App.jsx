import CardStep from "./components/common/CardStep"
import Header from "./components/common/Header"

function App() {
  return (
    <>
    <Header />

    <main className="bg-info">

      <div className="container py-5 text-center">
        <h1 className="text-primary text-white">Découvre les artisans de ta région</h1>
        <p>La plateforme officielle de la région Auvergne-Rhône-Alpes pour découvrir les meilleurs artisans près de chez toi</p>
      </div>

      <section className="container my-5">
        <div className="row card-group">
          <div className="col-md-6 col-lg-3"><CardStep 
                step="1" 
                title="Choisis la catégorie d'artisanat dans le menu" 
                description="Dans le menu en haut de la page, choisis la 
                catégorie d'artisanat que tu recherches afin de pouvoir 
                sélectionner uniquement les artisans spécialisés dans ce domaine." /></div>
          <div className="col-md-6  col-lg-3"><CardStep 
                step="2"
                title="Choisis un artisan"
                description="Sélectionnez l'artisan de la liste qui vous a 
                le plus séduit. Référez vous sur les informations de son profil 
                pour faire votre choix (avis, spécialité, localisation)." /></div>
          <div className="col-md-6 col-lg-3"><CardStep
                step="3"
                title="Contactes l'artisan avec le formulaire de contact"
                description="Cliquez sur l'artisan que vous avez choisi pour 
                avoir des informations supplémentaires sur ce dernier. 
                Contactez-le via le formulaire de contact." /></div>
          <div className="col-md-6 col-lg-3"><CardStep
                step="4"
                title="Une réponse te sera apportée dans 48 heures"
                description="Une fois votre message envoyé, l'artisan s'engage 
                à vous répondre dans les 48 heures."/></div>
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

    </main>
    </>
  )
}

export default App
