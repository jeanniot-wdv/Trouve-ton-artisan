// pages/Construction.jsx
import { Link } from "react-router-dom";

const Construction = () => {

  return (
    <div className="container-fluid hero-full bg-light d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 text-center">

            {/* Titre principal */}
            <h1 className="display-2 fw-bold text-warning mb-4">
              En construction
            </h1>

            {/* Sous-titre avec animation */}
            <h2 className="h4 mb-4 text-muted">
              Cette page est en cours de développement
            </h2>

            {/* Description */}
            <p className="text-muted mb-4">
              Nous travaillons dur pour vous offrir une expérience exceptionnelle. <br />
              Cette fonctionnalité sera bientôt disponible !
            </p>

            {/* Boutons d'action */}
            <div className="text-center mb-5">
              <Link to="/" className="btn btn-primary px-4">Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Construction;