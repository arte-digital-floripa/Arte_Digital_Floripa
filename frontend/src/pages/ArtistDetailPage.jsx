import { useParams, Link } from "react-router-dom";
import { useArtist } from "../hooks/useArtists";
import ArtworkCard from "../components/cards/ArtworkCard/ArtworkCard";

export default function ArtistDetailPage() {
  // Pega o ID da URL
  const { id } = useParams(); 
  // Busca o artista pelo ID no banco
  const { artist, artworks, loading, error } = useArtist(id);


  if (loading) return <p>Carregando detalhes do artista...</p>;

  if (error || !artist) return <p>Artista não encontrado.</p>;
  const artistPortrait = artist.image || artworks?.[0]?.remote_url || "";
  const timelineWorks = artworks.slice(0, 5);
  
  return (
    <div className="artist-detail-page">
      {/* BLOCO 1: Hero do Artista (Textos + Métricas na esquerda | Retrato na direita) */}
      <section className="artist-profile-hero">
        <div className="artist-profile-content">
          <div>
            <div className="artist-profile-top-rule" />
            <h1 className="artist-profile-name">{artist.name}</h1>
            <div className="artist-profile-lifespan-row">
              <span className="artist-profile-lifespan">Acervo Histórico</span>
              <span className="artist-profile-name-accent" />
            </div>
            <p className="artist-profile-bio">{artist.bio}</p>
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
              alt={artist.name}
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
      {/* BLOCO 3: Galeria Completa usando o ArtworkCard do Léo */}
      <section className="artist-gallery-section">
        <h2 className="artist-gallery-title">
        </h2>
        <div className="artist-gallery-grid">
          {artworks.map((obra) => (
            <ArtworkCard
              key={obra.id}
              artwork={obra}
              artistName={artist.name}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

