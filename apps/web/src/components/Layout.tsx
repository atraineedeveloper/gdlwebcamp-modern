import { NavLink, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">GDL <span>WebCamp</span></div>
          <nav className="main-nav">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/calendario">Calendario</NavLink>
            <NavLink to="/invitados">Invitados</NavLink>
            <NavLink to="/registro">Registro</NavLink>
            <NavLink to="/admin">Admin</NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">GDL WebCamp Modern v1</footer>
    </div>
  );
}
