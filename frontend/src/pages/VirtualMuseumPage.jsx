import { Link, useSearchParams } from "react-router-dom";
import logo from "/img/logo-arte-digital-provisorio.png";

export default function VirtualMuseumPage() {
  const [searchParams] = useSearchParams();
  const obraId = searchParams.get("obra");

  return (
    <div className="virtual-museum-page">
      <div className="virtual-museum-container">
        <header className="virtual-museum-toolbar">
          <div className="virtual-museum-brand">
            <Link to="/" className="brand-lockup">
              <img
                className="brand-logo"
                src={logo}
                alt="Logo Arte Digital Floripa"
              />
              <div>
                <span className="brand-title-top">ARTE DIGITAL</span>
                <br />
                <span className="brand-title-bottom">FLORIPA</span>
              </div>
            </Link>

            <div className="virtual-museum-heading">
              <h1 className="virtual-museum-title">Museu Virtual 360°</h1>
              <p className="virtual-museum-subtitle">
                Arraste o mouse ou toque na tela para explorar a galeria em 360
                graus
              </p>
            </div>
          </div>

          <div className="virtual-museum-actions">
            {obraId && (
              <Link to={`/obras/${obraId}`} className="home-cta-btn">
                Voltar para a Obra
              </Link>
            )}
            <Link
              to="/artistas"
              className="home-cta-btn home-cta-btn-inverse"
            >
              Voltar ao Acervo
            </Link>
          </div>
        </header>

        <div className="virtual-museum-frame-wrapper">
          <iframe
            src="/vtour/tour.html"
            title="Museu Virtual 360 - Arte Digital Floripa"
            className="virtual-museum-iframe"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
