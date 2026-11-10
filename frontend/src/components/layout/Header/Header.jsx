import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "/img/logo-arte-digital-provisorio.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar-header ${menuOpen ? "menu-open" : ""}`.trim()}>
      <nav className="navbar-container">
        {/* logo e titulo do Header */}
        <Link className="brand-lockup" to="/" onClick={closeMenu}>
          <div className="brand-logo-wrapper">
            <img
              className="brand-logo"
              src={logo}
              alt="Logo Arte Digital Floripa"
            />
          </div>
          <div className="brand-title-wrapper">
            <span className="brand-title-top">ARTE DIGITAL</span>
            <br />
            <span className="brand-title-bottom">FLORIPA</span>
          </div>
        </Link>

        {/* Botao menu mobile */}
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* links de navegação do Header */}
        <ul className={`nav-links-list ${menuOpen ? "open" : ""}`.trim()}>
          <li>
            <NavLink className="nav-item-link" to="/artistas" onClick={closeMenu}>
              Artistas
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-item-link" to="/lugares" onClick={closeMenu}>
              Lugares
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-item-link"
              to="/museu-virtual"
              onClick={closeMenu}
            >
              Museu Virtual
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-item-link" to="/sobre" onClick={closeMenu}>
              Sobre
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
