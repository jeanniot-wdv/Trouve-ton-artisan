// pages/NotFound.jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-3 fw-bold text-danger mb-4">404</h1>
      <h2 className="mb-3">Oups, cette page n'existe pas 😢</h2>
      <p className="text-muted mb-4">
        La page que vous recherchez est introuvable. <br />
        Vérifiez l’URL ou retournez à l’accueil.
      </p>
      <Link to="/" className="btn btn-primary px-4">
        Retour à l’accueil
      </Link>
    </div>
  );
};

export default NotFound;
