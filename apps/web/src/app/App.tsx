import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminPage } from '../admin/AdminPage';
import { LegacyLayout } from '../components/LegacyLayout';
import { CalendarioPage } from '../pages/CalendarioPage';
import { ConferenciaPage } from '../pages/ConferenciaPage';
import { HomePage } from '../pages/HomePage';
import { InvitadosPage } from '../pages/InvitadosPage';
import { RegistroPage } from '../pages/RegistroPage';

export function App() {
  return (
    <Routes>
      <Route element={<LegacyLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/conferencia" element={<ConferenciaPage />} />
        <Route path="/calendario" element={<CalendarioPage />} />
        <Route path="/invitados" element={<InvitadosPage />} />
        <Route path="/registro" element={<RegistroPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
