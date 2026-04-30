import { useTranslation } from 'react-i18next';
import { BADGE_ICONS, USE_ICONS } from '../config/badges.js';

export default function MintBadge({ field, value, lang, compact = false }) {
  const { t } = useTranslation();
  const Icon = BADGE_ICONS[field];

  // Resolve display value
  let display;
  if (field === 'perennial') {
    display = `${t('badges.perennial')}: ${
      value ? t('badges.perennialYes') : t('badges.perennialNo')
    }`;
  } else if (field === 'frostResistance') {
    display = `${t('badges.frostResistance')}: ${value}`;
  } else if (field === 'uses') {
    // uses is rendered separately
    return null;
  } else {
    const localized =
      typeof value === 'object' && value !== null && !Array.isArray(value)
        ? value[lang]
        : value;
    display = `${t(`badges.${field}`)}: ${localized}`;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-mint-100 text-mint-700 font-medium ${
        compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
      }`}
    >
      {Icon && <Icon size={compact ? 12 : 14} />}
      <span>{display}</span>
    </span>
  );
}

export function UseBadge({ use, compact = false }) {
  const Icon = USE_ICONS[use] || BADGE_ICONS.uses;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-sage-100 text-mint-800 font-medium ${
        compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
      }`}
    >
      {Icon && <Icon size={compact ? 12 : 14} />}
      <span>{use}</span>
    </span>
  );
}

/**
 * Large card-style badge: big icon on the left, label on top, value below.
 * Used in the prominent "key info" grid on the detail page.
 */
export function MintBadgeCard({ field, value, lang }) {
  const { t } = useTranslation();
  const Icon = BADGE_ICONS[field];

  let label;
  let displayValue;

  if (field === 'perennial') {
    label = t('badges.perennial');
    displayValue = value ? t('badges.perennialYes') : t('badges.perennialNo');
  } else if (field === 'frostResistance') {
    label = t('badges.frostResistance');
    displayValue = value;
  } else {
    label = t(`badges.${field}`);
    displayValue =
      typeof value === 'object' && value !== null && !Array.isArray(value)
        ? value[lang]
        : value;
  }

  return (
    <div className="flex items-center gap-4 bg-white border border-mint-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-mint-200 transition">
      <span className="flex-shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-mint-100 text-mint-700">
        {Icon && <Icon size={24} />}
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-mint-500 font-semibold">
          {label}
        </p>
        <p className="text-lg font-display font-bold text-mint-900 leading-tight truncate">
          {String(displayValue)}
        </p>
      </div>
    </div>
  );
}
