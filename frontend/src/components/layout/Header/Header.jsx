import { Link, NavLink } from "react-router-dom";
import logo from "./logo-mock.png";

export default function Header() {
  return (
    <header className="navbar-header">
      <nav className="navbar-container">

        {/* logo e titulo do Header */}

        <Link className="brand-lockup" to="/">
          <div>
            <img src={logo} alt="Logo Arte Digital Floripa" />
          </div>
          <div>
            <span className="brand-title-top">Arte Digital</span>
            <br />
            <span className="brand-title-bottom">Floripa</span>
          </div>
        </Link>

        {/* links de navegação do Header */}

        <ul className="nav-links-list">
          <li>
            <NavLink className="nav-item-link" to="/artistas">
              Artistas
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-item-link" to="/lugares">
              Lugares
            </NavLink>
          </li>
          <li className="nav-item-link">
            <NavLink className="nav-item-link" to="/museu-virtual">
              Museu Virtual
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-item-link" to="/sobre">
              Sobre
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
