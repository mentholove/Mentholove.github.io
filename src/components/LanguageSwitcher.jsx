import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('en') ? 'en' : 'pl';

  const change = (lang) => {
    if (lang === current) return;
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const base =
    'px-3 py-1 text-sm font-semibold rounded-full transition-colors';
  const active = 'bg-mint-100 text-mint-700';
  const inactive = 'text-mint-500 hover:text-mint-700';

  return (
    <div className="flex items-center gap-1 rounded-full border border-mint-200 bg-white/60 px-1 py-0.5">
      <button
        type="button"
        onClick={() => change('pl')}
        className={`${base} ${current === 'pl' ? active : inactive}`}
        aria-pressed={current === 'pl'}
      >
        PL
      </button>
      <span className="text-mint-300">|</span>
      <button
        type="button"
        onClick={() => change('en')}
        className={`${base} ${current === 'en' ? active : inactive}`}
        aria-pressed={current === 'en'}
      >
        EN
      </button>
    </div>
  );
}
