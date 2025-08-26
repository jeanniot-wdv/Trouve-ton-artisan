import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollToTop from './components/ScrollToTop';

//Pages
import Home from './pages/Home'
import Categories from './pages/Categories';
import CategoryArtisans from './pages/CategoryArtisans';
import Artisans from './pages/Artisans';
import Artisan from './pages/SingleArtisan';

import NotFound from './pages/NotFound';
import Construction from './pages/Construction';

function App() {

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accueil" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:slug" element={<CategoryArtisans />} />
          <Route path="/artisans" element={<Artisans />} />
          <Route path="/artisan/:id" element={<Artisan />} />
          
          <Route path="/construction" element={<Construction />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
