import { Routes, Route } from 'react-router';
import Sidebar from './components/ui/Sidebar';
import AuthPage from './pages/auth';
import DashboardPage from './pages/dashboard';
import AssetsPage from './pages/assets';
import TeamPage from './pages/team';
import AnalyticsPage from './pages/analytics';


function App() {
  return (
      <div className="min-h-screen flex flex-row" style={{backgroundColor: 'var(--color-primary-200)'}}>
        <Sidebar />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </div>
  );
}

export default App;
