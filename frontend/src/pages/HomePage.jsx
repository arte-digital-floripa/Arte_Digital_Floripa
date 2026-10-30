import { Link } from "react-router-dom";
import { useArtists } from "../hooks/useArtists";
import { useArtworks } from "../hooks/useArtworks";
import ArtistCard from "../components/cards/ArtistCard/ArtistCard";
import ArtworkCard from "../components/cards/ArtworkCard/ArtworkCard";

export default function HomePage() {
  const { artists, loading: loadingArtists } = useArtists();
  const { artworks, loading: loadingArtworks } = useArtworks();

  const featuredArtists = artists.slice(0, 3);
  const exploreArtworks = artworks.slice(0, 4);

  return (
    <div className="home-page">
      {/* BLOCO 1: Hero */}
      <section className="home-hero-section">
        <div className="home-hero-content">
          <div className="home-hero-brand-row">
            <span className="home-hero-accent-line" />
            <span className="home-hero-brand">ARTE DIGITAL FLORIPA</span>
          </div>

          <h1 className="home-hero-headline">
            A memoria artistica de Florianopolis em um novo espaco digital.
          </h1>

          <p className="home-hero-subtitle">
            Obras, artistas e lugares que fazem parte da historia cultural da
            cidade reunidos em uma plataforma acessivel e interativa.
          </p>
          
          <div className="home-hero-actions">
            <Link to="/artistas" className="home-cta-btn">
              <span>Explorar acervo</span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="13 6 19 12 13 18" />
              </svg>
            </Link>
            <Link
              to="/museu-virtual"
              className="home-cta-btn home-cta-btn-inverse"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <polygon points="10,8.5 16,12 10,15.5" fill="currentColor" />
              </svg>
              <span>Museu Virtual</span>
            </Link>
          </div>

        </div>
      </section>

      {/* BLOCO 2: Status da coleção */}
      <section className="home-stats-section">
        <div className="home-stats-grid">
          <div className="home-stat-item">
            <span className="home-stat-value">{artworks.length || 128}</span>
            <span className="home-stat-label">obras digitalizadas</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-value">{artists.length || 42}</span>
            <span className="home-stat-label">artistas</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-value">8</span>
            <span className="home-stat-label">locais</span>
          </div>
          <div className="home-stat-item">
            <span className="home-stat-value">12</span>
            <span className="home-stat-label">experiencias virtuais</span>
          </div>
        </div>
      </section>

      {/* BLOCO 3: Explore o acervo */}
      <section className="home-explore-section">
        <div className="home-explore-container">
          <div>
            <div className="home-explore-eyebrow">
              <span className="home-hero-accent-line" />
              <span>EXPLORE O ACERVO</span>
            </div>

            <h2 className="home-explore-title">Descubra por onde comecar</h2>

            <p className="home-explore-desc">
              Navegue pelas obras, artistas, tecnicas e locais que constroem a
              identidade visual de Florianopolis.
            </p>

            <div className="home-explore-tabs">
              <Link to="/artistas" className="home-explore-tab active">
                Obras
              </Link>
              <Link to="/artistas" className="home-explore-tab">
                Artistas
              </Link>
              <Link to="/artistas" className="home-explore-tab">
                Tecnicas
              </Link>
              <Link to="/lugares" className="home-explore-tab">
                Locais
              </Link>
            </div>
          </div>

          <div className="home-explore-collage">
            {loadingArtworks ? (
              <p className="page-status">Carregando obras...</p>
            ) : (
              exploreArtworks.map((work) => (
                <ArtworkCard key={work.id} artwork={work} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. VIRTUAL MUSEUM BANNER */}
      <section className="home-museum-banner">
        <div className="home-museum-container">
          <div className="home-museum-eyebrow">
            <span className="home-hero-accent-line" />
            <span>ENTRE NO</span>
          </div>

          <h2 className="home-museum-title">Museu Virtual</h2>

          <p className="home-museum-desc">
            Explore as galerias e viva uma experiencia imersiva em 360 graus
            pelas obras do acervo.
          </p>

          <Link to="/museu-virtual" className="home-cta-btn">
            Entrar no museu virtual
          </Link>
        </div>
      </section>

      {/* 5. FEATURED ARTISTS (#EDEAE6 - Featured | Compact | Featured) */}
      <section className="home-featured-artists">
        <div className="home-featured-header">
          <h2 className="home-featured-title">Artistas em destaque</h2>
          <p className="home-featured-subtitle">
            Veja quais sao os artistas mais acessados na nossa plataforma
          </p>
        </div>

        {loadingArtists ? (
          <p className="page-status">Carregando artistas...</p>
        ) : (
          <div className="container">
            {featuredArtists.map((artist, index) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                variant={{ type: "home", compact: index === 1 }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
