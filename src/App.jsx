import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import DetailPage from './pages/DetailPage.jsx';

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/:id" element={<DetailPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className="py-8 text-center text-sm text-mint-600/80">
        🌿 Mentholove
      </footer>
    </div>
  );
}
