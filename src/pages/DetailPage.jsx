import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Leaf,
  MapPin,
  HeartPulse,
  UtensilsCrossed,
  Sprout,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMint } from '../hooks/useMint.js';
import ImageGallery from '../components/ImageGallery.jsx';
import { MintBadgeCard, UseBadge } from '../components/MintBadge.jsx';

const SECTION_META = [
  { key: 'appearance', Icon: Leaf },
  { key: 'origin', Icon: MapPin },
  { key: 'benefits', Icon: HeartPulse },
  { key: 'foodPairing', Icon: UtensilsCrossed },
  { key: 'planting', Icon: Sprout },
];

const KEY_BADGE_FIELDS = [
  'frostResistance',
  'perennial',
  'position',
  'height',
  'watering',
];

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <p className="text-2xl font-display text-mint-900 mb-6">
        {t('detail.notFound')}
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mint-500 hover:bg-mint-600 text-white font-medium transition-colors"
      >
        <ArrowLeft size={18} />
        {t('nav.backToCatalog')}
      </Link>
    </div>
  );
}

export default function DetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'pl';
  const { mint, loading, error } = useMint(id);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-mint-700">
        {t('detail.loading')}
      </div>
    );
  }

  if (error || !mint || !mint.translations?.[lang]) {
    return <NotFound />;
  }

  const tr = mint.translations[lang];
  const usesArr = mint.badges?.uses?.[lang] || [];

  const visibleBadgeFields = KEY_BADGE_FIELDS.filter(
    (f) => mint.badges?.[f] !== undefined && mint.badges?.[f] !== null
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-mint-700 hover:text-mint-900 font-medium mb-6"
      >
        <ArrowLeft size={18} />
        {t('nav.backToCatalog')}
      </Link>

      <header className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-mint-900">
          {tr.name}
        </h1>
        <p className="italic text-mint-600 mt-1">{tr.latinName}</p>
        {tr.shortDescription && (
          <p className="mt-4 text-mint-800/90 max-w-2xl">
            {tr.shortDescription}
          </p>
        )}
      </header>

      {mint.images?.length > 0 && (
        <div className="mb-10">
          <ImageGallery images={mint.images} alt={tr.name} />
        </div>
      )}

      {/* Key info — bigger, dedicated grid */}
      {visibleBadgeFields.length > 0 && (
        <section className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleBadgeFields.map((f) => (
              <MintBadgeCard
                key={f}
                field={f}
                value={mint.badges[f]}
                lang={lang}
              />
            ))}
          </div>
        </section>
      )}

      {/* Uses — kept as pill row, full width */}
      {usesArr.length > 0 && (
        <section className="mb-10 bg-white border border-mint-100 rounded-2xl p-5 shadow-sm">
          <h2 className="text-xs uppercase tracking-wide text-mint-500 font-semibold mb-3">
            {t('badges.uses')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {usesArr.map((u) => (
              <UseBadge key={u} use={u} />
            ))}
          </div>
        </section>
      )}

      <div className="space-y-5">
        {SECTION_META.map(({ key, Icon }) => {
          const text = tr.sections?.[key];
          if (!text || !text.trim()) return null;
          return (
            <motion.section
              key={key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-mint-100 rounded-2xl p-6 shadow-sm"
            >
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-mint-800 mb-2">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-mint-100 text-mint-700">
                  <Icon size={18} />
                </span>
                {t(`detail.sections.${key}`)}
              </h2>
              <p className="text-mint-900/85 leading-relaxed">{text}</p>
            </motion.section>
          );
        })}
      </div>
    </motion.div>
  );
}
