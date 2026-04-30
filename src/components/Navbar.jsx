import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-mint-100">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-mint-100 text-mint-700 group-hover:bg-mint-200 transition-colors">
            <Leaf size={20} />
          </span>
          <span className="font-display text-2xl font-bold text-mint-700">
            {t('nav.title')}
          </span>
        </Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
