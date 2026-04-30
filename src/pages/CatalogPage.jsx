import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMintList } from '../hooks/useMint.js';
import MintCard from '../components/MintCard.jsx';
import SearchBar from '../components/SearchBar.jsx';

function SkeletonCard() {
  return (
    <div className="bg-white border border-mint-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-[4/3] bg-mint-100" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-mint-100 rounded w-2/3" />
        <div className="h-3 bg-mint-100 rounded w-1/2" />
        <div className="h-3 bg-mint-100 rounded w-full" />
        <div className="flex gap-2 pt-2">
          <div className="h-5 w-20 bg-mint-100 rounded-full" />
          <div className="h-5 w-16 bg-mint-100 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'pl';
  const { mints, loading } = useMintList();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mints;
    return mints.filter((m) => {
      const tr = m.translations?.[lang];
      if (!tr) return false;
      const haystack = [
        tr.name,
        tr.latinName,
        ...(m.badges?.uses?.[lang] || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [mints, query, lang]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 py-10"
    >
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-mint-900">
          {t('nav.title')}
        </h1>
        <p className="mt-2 text-mint-700">{t('catalog.tagline')}</p>
      </div>

      <div className="mb-8">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-mint-700 py-16">
          {t('catalog.noResults')}
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <MintCard key={m.id} mint={m} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
