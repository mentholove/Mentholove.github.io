import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MintBadge, { UseBadge } from './MintBadge.jsx';

export default function MintCard({ mint }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'pl';
  const tr = mint.translations[lang];
  const cover = mint.images?.[0];

  const usesArr = mint.badges?.uses?.[lang] || [];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <Link
        to={`/${mint.id}`}
        className="block bg-white border border-mint-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
      >
        <div className="aspect-[4/3] bg-mint-100 flex items-center justify-center overflow-hidden">
          {cover ? (
            <img
              src={cover}
              alt={tr.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <Leaf className="text-mint-400" size={64} />
          )}
        </div>
        <div className="p-5">
          <h3 className="font-display text-xl font-bold text-mint-900">
            {tr.name}
          </h3>
          <p className="text-sm italic text-mint-500 mb-3">{tr.latinName}</p>
          {tr.shortDescription && (
            <p className="text-sm text-mint-800/80 mb-4 line-clamp-2">
              {tr.shortDescription}
            </p>
          )}
          <div className="flex flex-wrap gap-1.5">
            {mint.badges?.frostResistance && (
              <MintBadge
                field="frostResistance"
                value={mint.badges.frostResistance}
                lang={lang}
                compact
              />
            )}
            {mint.badges?.position && (
              <MintBadge
                field="position"
                value={mint.badges.position}
                lang={lang}
                compact
              />
            )}
            {usesArr[0] && <UseBadge use={usesArr[0]} compact />}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
