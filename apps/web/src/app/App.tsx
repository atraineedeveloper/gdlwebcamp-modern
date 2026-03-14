import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AdminPage } from '../admin/AdminPage';
import { CalendarioPage } from '../pages/CalendarioPage';
import { HomePage } from '../pages/HomePage';
import { InvitadosPage } from '../pages/InvitadosPage';
import { RegistroPage } from '../pages/RegistroPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendario" element={<CalendarioPage />} />
        <Route path="/invitados" element={<InvitadosPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
