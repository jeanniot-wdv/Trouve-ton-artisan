function Footer() {
  return (
    <footer className="text-white text-light pt-5 pb-3 mt-5" style={{ backgroundColor: 'steelblue' }}>
      <div className="container">
        <div className="row">
          {/* Colonne 1 */}
          <div className="col-md-3 mb-4">
            <h5>La Région</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Présentation</a></li>
              <li><a href="#" className="text-light text-decoration-none">Élus & institutions</a></li>
              <li><a href="#" className="text-light text-decoration-none">Budget & finances</a></li>
              <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Colonne 2 */}
          <div className="col-md-3 mb-4">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Aides & subventions</a></li>
              <li><a href="#" className="text-light text-decoration-none">Transports</a></li>
              <li><a href="#" className="text-light text-decoration-none">Éducation & jeunesse</a></li>
              <li><a href="#" className="text-light text-decoration-none">Culture & patrimoine</a></li>
            </ul>
          </div>

          {/* Colonne 3 */}
          <div className="col-md-3 mb-4">
            <h5>Réseaux sociaux</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-4"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light fs-4"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light fs-4"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light fs-4"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

          {/* Colonne 4 */}
          <div className="col-md-3 mb-4">
            <h5>Logo & contact</h5>
            <img 
              src="/images/logo.svg" 
              alt="Région Auvergne-Rhône-Alpes" 
              className="img-fluid mb-2" 
              style={{ maxWidth: '150px' }}
            />
            <p className="small">
              © {new Date().getFullYear()} Région Auvergne-Rhône-Alpes.  
              Tous droits réservés.
            </p>
          </div>
        </div>

        {/* Ligne du bas */}
        <div className="border-top border-light pt-3 mt-3 text-center small">
          <a href="#" className="text-light me-3">Mentions légales</a>
          <a href="#" className="text-light me-3">Accessibilité</a>
          <a href="#" className="text-light">Plan du site</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
