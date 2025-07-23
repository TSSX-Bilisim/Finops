import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation('dashboard');

  return (
    <main className="p-8">
      <header>
        <h1 className="text-2xl font-bold" style={{color: 'var(--color-text-primary)'}}>{t('title')}</h1>
      </header>
      <section>
        <p style={{color: 'var(--color-text-primary)'}}>{t('description')}</p>
      </section>
    </main>
  );
}