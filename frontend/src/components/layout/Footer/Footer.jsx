import { Link } from "react-router-dom";
import logo from "./logo-mock.png";

export default function Footer() {
  return (
    <footer className="footer-global footer-text">
      <div className="footer-container">
        {/* logo e titulo */}

        <div className="footer-slot-brand">
          <img
            className="footer-brand-logo"
            src={logo}
            alt="Logo Arte Digital Floripa"
          />
          <span className="footer-brand-title">Arte Digital Floripa</span>
        </div>

        {/* informações */}

        <div className="footer-info-container">
          <div>
            <span className="footer-brand-initiative muted">Uma iniciativa de</span>
          </div>

          <div>
            <strong className="footer-brand-desc">Fundação Cultural Franklin Cascaes</strong>
          </div>

          <div className="footer-slot-partner">
            <span className="muted">Em parceria com</span>
            <br />
            <strong>Unicesusc</strong>
          </div>
        </div>

        {/* Links para redes sociais */}

        <div>
          <Link to="/" aria-label="Instagram">
            insta
          </Link>
          <Link to="/" aria-label="YouTube">
            youtube
          </Link>
          <Link to="/" aria-label="Link">
            link
          </Link>
        </div>
      </div>
    </footer>
  );
}
