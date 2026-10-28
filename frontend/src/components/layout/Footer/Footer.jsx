import { Link } from "react-router-dom";
import logo from "../../../../public/img/logo-arte-digital-provisorio.png";

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
            <span className="footer-brand-initiative muted">
              Uma iniciativa de
            </span>
          </div>

          <div>
            <strong className="footer-brand-desc">
              Fundação Cultural Franklin Cascaes
            </strong>
          </div>

          <div className="footer-info-divisor"></div>

          <div className="footer-slot-partner">
            <span className="muted">Em parceria com</span>
            <br />
            <strong>Unicesusc</strong>
          </div>
        </div>

        {/* Links para redes sociais */}

        <div className="footer-slot-social">
          <Link to="/" aria-label="Instagram">
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="24"
              height="24"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke-width="2.5" />
            </svg>
          </Link>
          <Link to="/" aria-label="YouTube">
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="24"
              height="24"
            >
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
              <polygon points="10 15 15 12 10 9" fill="currentColor" />
            </svg>
          </Link>
          <Link to="/" aria-label="Link">
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="24"
              height="24"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
