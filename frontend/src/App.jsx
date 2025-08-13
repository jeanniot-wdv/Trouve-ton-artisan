import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.scss';
// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ArtisanProfile from './pages/ArtisanProfile';
/* 
import NotFound from './pages/NotFound';
import LegalPage from './pages/LegalPage';
*/

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accueil" element={<Home />} />
            <Route path="/batiment" element={<CategoryPage category="batiment" />} />
            <Route path="/services" element={<CategoryPage category="services" />} />
            <Route path="/fabrication" element={<CategoryPage category="fabrication" />} />
            <Route path="/alimentation" element={<CategoryPage category="alimentation" />} />
            <Route path="/artisan/:id" element={<ArtisanProfile />} />
            {/* <Route path="/batiment" element={<CategoryPage category="batiment" />} />
            <Route path="/services" element={<CategoryPage category="services" />} />
            <Route path="/fabrication" element={<CategoryPage category="fabrication" />} />
            <Route path="/alimentation" element={<CategoryPage category="alimentation" />} />
            <Route path="/mentions-legales" element={<LegalPage type="mentions" />} />
            <Route path="/donnees-personnelles" element={<LegalPage type="donnees" />} />
            <Route path="/accessibilite" element={<LegalPage type="accessibilite" />} />
            <Route path="/cookies" element={<LegalPage type="cookies" />} />
            <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;