import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SearchBar({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-mint-500"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('catalog.searchPlaceholder')}
        className="w-full rounded-full border border-mint-200 bg-white py-3 pl-11 pr-4 text-mint-900 placeholder-mint-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-mint-400 focus:border-mint-400 transition"
      />
    </div>
  );
}
