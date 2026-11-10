import { useParams, Link } from "react-router-dom";
import { useArtist } from "../hooks/useArtists";
import ArtworkCard from "../components/cards/ArtworkCard/ArtworkCard";

export default function ArtistDetailPage() {
  const { id } = useParams();
  const { artist, artworks, loading, error } = useArtist(id);

  if (loading) {
    return <p className="page-status">Carregando detalhes do artista...</p>;
  }

  if (error || !artist) {
    return <p className="page-status">Artista não encontrado.</p>;
  }

  const hasValidPhoto =
    artist.photo_url &&
    !artist.photo_url.toLowerCase().includes("ui-avatars.com");
  const artistPortrait =
    (hasValidPhoto ? artist.photo_url : null) ||
    artist.image ||
    artworks?.[0]?.remote_url ||
    "/img/hero-artists.png";

  const cleanName = (artist.name || "Artista do Acervo").split("(")[0].trim();
  const cleanBio =
    artist.bio && artist.bio.trim().toLowerCase() !== "mock bio"
      ? artist.bio
      : "Artista integrante do acervo cultural e histórico exposto na plataforma Arte Digital Floripa.";

  const timelineWorks = artworks.slice(0, 5);

  return (
    <div className="artist-detail-page">
      {/* BLOCO 1: Hero do Artista */}
      <section className="artist-profile-hero">
        <div className="artist-profile-content">
          <div>
            <div className="artist-profile-top-rule" />
            <h1 className="artist-profile-name">{cleanName}</h1>
            <div className="artist-profile-lifespan-row">
              <span className="artist-profile-lifespan">
                {artist.lifespan || "Acervo Histórico"}
              </span>
              <span className="artist-profile-name-accent" />
            </div>
            <p className="artist-profile-bio">{cleanBio}</p>
          </div>
          <div className="artist-metrics-bar">
            <div className="artist-metric-item">
              <span className="artist-metric-value">{artworks.length}</span>
              <span className="artist-metric-label">Obras Cadastradas</span>
            </div>
            <div className="artist-metric-item">
              <span className="artist-metric-value">1</span>
              <span className="artist-metric-label">Exposições Virtuais</span>
            </div>
            <div className="artist-metric-item">
              <span className="artist-metric-value">3</span>
              <span className="artist-metric-label">Murais Públicos</span>
            </div>
          </div>
        </div>
        <div className="artist-profile-portrait-wrapper">
          {artistPortrait && (
            <img
              src={artistPortrait}
              alt={cleanName}
              className="artist-profile-portrait"
            />
          )}
        </div>
      </section>

      {/* BLOCO 2: Linha do Tempo (Faixa preta com até 5 obras) */}
      {timelineWorks.length > 0 && (
        <section className="artist-timeline-section">
          <div className="artist-timeline-container">
            <hr className="artist-timeline-rule" />
            <h2 className="artist-timeline-title">
              Linha do Tempo e Principais Obras
            </h2>
            <div className="artist-timeline-row">
              {timelineWorks.map((obra) => (
                <Link
                  key={obra.id}
                  to={`/obras/${obra.id}`}
                  className="artist-timeline-item"
                >
                  <div className="artist-timeline-thumb-wrapper">
                    <img
                      src={obra.remote_url}
                      alt={obra.title}
                      className="artist-timeline-thumb"
                    />
                  </div>
                  <span className="artist-timeline-caption">
                    {obra.date ? `${obra.date} ` : ""}&ldquo;{obra.title}&rdquo;
                  </span>
                </Link>
              ))}
            </div>
            <hr className="artist-timeline-rule" />
          </div>
        </section>
      )}

      {/* BLOCO 3: Galeria Completa de Obras do Artista */}
      <section className="artist-gallery-section">
        <div className="artist-gallery-grid">
          {artworks.map((obra) => {
            const variant =
              obra.largura && obra.altura && obra.largura > obra.altura
                ? "paisagem"
                : "retrato";
            return (
              <ArtworkCard
                key={obra.id}
                artwork={{
                  ...obra,
                  artist: cleanName,
                  variant,
                }}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
