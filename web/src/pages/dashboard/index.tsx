import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation('dashboard');

  return (
    <main className="p-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
      </header>
      <section>
        <p className="text-gray-700 dark:text-white">{t('description')}</p>
      </section>
    </main>
  );
}