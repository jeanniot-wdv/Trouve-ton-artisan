// components/common/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import Login from '../form/Login';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="fixed-top shadow bg-white">
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container-fluid px-4">
          {/* Logo importé en module*/}
          <Link className="navbar-brand" to="/" onClick={() => {scrollTo(0,0)}}>
            <img src={Logo} alt="Trouve Ton Artisan" width="200" />
          </Link>

          {/* Toggle button pour mobile */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent" 
            aria-controls="navbarContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            <ul className="navbar-nav mb-2 mb-lg-0 me-3">
              {/* Artisans */}
              <li className="nav-item">
                <Link 
                  className={`nav-link fw-medium ${isActive('/artisans')}`}
                  to="/artisans">
                  Artisans
                </Link>
              </li>

              {/* Catégories */}
              <li className="nav-item me-3">
                <Link 
                  className={`nav-link fw-medium ${isActive('/categories')}`}
                  to="/categories">
                  Catégories
                </Link>
              </li>
            </ul>

            {/* Formulaire de connexion */}
            <Login />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;