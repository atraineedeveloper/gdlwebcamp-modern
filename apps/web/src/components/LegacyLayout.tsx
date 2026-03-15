import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

function getBodyClass(pathname: string) {
  if (pathname.startsWith('/calendario')) return 'calendario';
  if (pathname.startsWith('/invitados')) return 'invitados';
  if (pathname.startsWith('/registro')) return 'registro';
  if (pathname.startsWith('/conferencia')) return 'conferencia';
  return 'index';
}

export function LegacyLayout() {
  const location = useLocation();
  const bodyClass = useMemo(() => getBodyClass(location.pathname), [location.pathname]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = bodyClass;
    setMenuOpen(false);
    return () => {
      document.body.className = '';
    };
  }, [bodyClass]);

  useEffect(() => {
    function onScroll() {
      const bar = document.querySelector('.barra');
      if (!bar) return;
      const rectHeight = (bar as HTMLElement).offsetHeight;
      if (window.scrollY > window.innerHeight) {
        bar.classList.add('fixed');
        document.body.style.marginTop = `${rectHeight}px`;
      } else {
        bar.classList.remove('fixed');
        document.body.style.marginTop = '0px';
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="hero">
          <div className="contenido-header">
            <nav className="redes-sociales">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-pinterest-p"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </nav>
            <div className="informacion-evento">
              <div className="clearfix">
                <p className="fecha"><i className="far fa-calendar-alt"></i>10-12 DIC</p>
                <p className="ciudadd"><i className="fas fa-map-marker-alt"></i>Guadalajara, MX</p>
              </div>
              <h1 className="nombre-sitio">Gdlwebcamp</h1>
              <p className="slogan">La mejor conferencia de <span>diseno web</span></p>
            </div>
          </div>
        </div>
      </header>

      <div className="barra">
        <div className="contenedor clearfix">
          <div className="logo">
            <NavLink to="/">
              <img src="/legacy/img/logo.svg" alt="GDL WebCamp" />
            </NavLink>
          </div>

          <div className="menu-movil" onClick={() => setMenuOpen((v) => !v)}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <nav className={`navegacion-principal clearfix ${menuOpen ? 'is-open' : ''}`}>
            <NavLink to="/conferencia" className={({ isActive }) => (isActive ? 'activo' : '')}>Conferencia</NavLink>
            <NavLink to="/calendario" className={({ isActive }) => (isActive ? 'activo' : '')}>Calendario</NavLink>
            <NavLink to="/invitados" className={({ isActive }) => (isActive ? 'activo' : '')}>Invitados</NavLink>
            <NavLink to="/registro" className={({ isActive }) => (isActive ? 'activo' : '')}>Reservaciones</NavLink>
          </nav>
        </div>
      </div>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="contenedor clearfix">
          <div className="footer-informacion">
            <h3>sobre <span>GDLWEBCAN</span></h3>
            <p>
              Comunidad enfocada en diseño y desarrollo web. Esta versión React mantiene el look
              original del sitio legacy con una base técnica moderna.
            </p>
          </div>
          <div className="ultimos-tweets">
            <h3>Ultimos <span>tweets</span></h3>
            <ul>
              <li>@gdlwebcamp Próximamente más contenido del evento.</li>
              <li>@gdlwebcamp Agenda y talleres actualizados.</li>
            </ul>
          </div>
          <div className="menu">
            <h3>Redes <span>Sociales</span></h3>
            <nav className="redes-sociales">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-pinterest-p"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </nav>
          </div>
        </div>

        <p className="copyright">Todos los derechos reservados GDLWEBCAN 2019.</p>
      </footer>
    </>
  );
}
