// pages/Construction.jsx
import { Link } from "react-router-dom";
import useTitle from '../hooks/useTitle';

const Construction = () => {

  useTitle();

  return (
    <div className="container-fluid construction hero-full bg-light d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 text-center">

            <h1 className="display-3 fw-medium mb-4">
              Cette page est en construction
            </h1>

            <h2 className="h4 mb-4 text-muted">
              Cette page est en cours de développement
            </h2>

            <p className="text-muted mb-4">
              Nous travaillons pour vous offrir une expérience exceptionnelle. <br />
              Cette page sera bientôt disponible
            </p>

            <div className="text-center mb-5">
              <Link to="/" className="btn btn-outline-primary px-4">Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Construction;