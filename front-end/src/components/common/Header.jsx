
const Header = () => {
  return (
    <header className="fixed-top shadow">
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-4">
        <div className="container-fluid d-flex px-4">
          <a className="navbar-brand" href="#">
            <img src="src/assets/images/Logo.png" alt="Bootstrap" width="200" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Rechercher un artisan..." aria-label="Search"/>
              <button className="btn btn-outline-dark" type="submit">Rechercher</button>
            </form>
          </div>
        </div>
      </nav>
    </header>
    );
};

export default Header;