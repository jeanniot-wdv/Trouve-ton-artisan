import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//Pages
import Home from './pages/Home'

function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accueil" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
