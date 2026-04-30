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
