import { Routes, Route, useLocation } from 'react-router-dom';
import { Pages } from './constants/pages';
import { AppWrapper } from './App.styled';
import StartPage from './pages/StartPage';
import AddPage from './pages/AddPage';
import CertificatesPage from './pages/CertificatesPage';

export const App: React.FC = (): JSX.Element => {
  const location = useLocation();

  return (
    <AppWrapper>
      <Routes location={location} key={location.pathname}>
        <Route index path={Pages.START} element={<StartPage />} />
        <Route path={Pages.ADD} element={<AddPage />} />
        <Route path={Pages.CERTIFICATES} element={<CertificatesPage />} />
      </Routes>
    </AppWrapper>
  );
};
