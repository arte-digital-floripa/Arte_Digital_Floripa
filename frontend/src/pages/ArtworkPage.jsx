import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useArtwork } from "../hooks/useArtworks";
import ArtworkStage from "../components/sections/artwork-detail/ArtworkStage";
import ArtworkCard from "../components/cards/ArtworkCard/ArtworkCard";

export default function ArtworkPage() {
  const { id } = useParams();
  const { artwork, artist, relatedArtworks, loading, error } = useArtwork(id);
  const [showCuratorial, setShowCuratorial] = useState(false);

  if (loading) {
    return <p className="page-status">Carregando detalhes da obra...</p>;
  }

  if (error || !artwork) {
    return <p className="page-status">Obra não encontrada.</p>;
  }

  const title = artwork.title || artwork.titulo || "Sem título";
  const year =
    artwork.date || artwork.data_criacao || artwork.year || "Data desconhecida";
  const technique =
    artwork.medium ||
    artwork.tecnica ||
    artwork.technique ||
    "Técnica não informada";
  const width = artwork.largura || artwork.width;
  const height = artwork.altura || artwork.height;
  const dimensions =
    width && height ? `${width}x${height} cm` : "Dimensões não informadas";

  const artistName = artist?.name || artist?.nome || "Artista do Acervo";
  const summaryText =
    artwork.descricao ||
    artist?.bio ||
    artist?.biografia ||
    "Sem resumo cadastrado para esta obra.";

  return (
    <div className="artwork-detail-page">
      {/* BLOCO 1: Componente ArtworkStage*/}
      <ArtworkStage artwork={artwork} />

      {/* BLOCO 2: ArtworkDetails */}
      <section className="artwork-info-section">
        <div className="artwork-info-container">
          <div className="artwork-info-details">
            <h1 className="artwork-title">{title}</h1>
            <p className="artwork-year">{year}</p>

            <h2 className="artwork-artist-name">
              {artist?.id ? (
                <Link
                  to={`/artistas/${artist.id}`}
                  className="artwork-artist-link"
                >
                  {artistName}
                </Link>
              ) : (
                artistName
              )}
            </h2>

            <p className="artwork-meta-text">Técnica: {technique}</p>
            <p className="artwork-meta-text">Dimensões: {dimensions}</p>

            <p className="artwork-summary">Resumo: {summaryText}</p>
          </div>

          <div className="artwork-actions-column">
            <Link
              to={`/museu-virtual?obra=${artwork.id}`}
              className="artwork-action-btn"
            >
              Ver galeria virtual do artista
            </Link>

            <button
              type="button"
              onClick={() => setShowCuratorial((prev) => !prev)}
              className="artwork-action-btn"
            >
              Ficha Curatorial
            </button>

            {artwork.audio_url ? (
              <div className="artwork-audio-card">
                <p className="artwork-audio-label">Audio guide:</p>
                <audio
                  controls
                  src={artwork.audio_url}
                  className="artwork-audio-player"
                >
                  Seu navegador não suporta áudio.
                </audio>
              </div>
            ) : (
              <button
                type="button"
                onClick={() =>
                  alert("Guia de áudio em produção para esta obra.")
                }
                className="artwork-action-btn"
              >
                Audio guide
              </button>
            )}

            {showCuratorial && (
              <div className="artwork-curatorial-card">
                <p className="artwork-curatorial-item">
                  <strong>ID no Acervo:</strong> {artwork.id}
                </p>
                <p className="artwork-curatorial-item">
                  <strong>Artista:</strong> {artistName}
                </p>
                <p className="artwork-curatorial-item">
                  <strong>Técnica:</strong> {technique}
                </p>
                <p className="artwork-curatorial-item">
                  <strong>Dimensões:</strong> {dimensions}
                </p>
                <p>
                  <strong>Data:</strong> {year}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BLOCO 3: Explore Mais */}
      <section className="artwork-explore-section">
        <div className="artwork-explore-header">
          <h2 className="artwork-explore-title">Explore Mais</h2>
        </div>

        <hr className="artwork-explore-divider" />

        {relatedArtworks.length === 0 ? (
          <p className="page-status">
            Não há outras obras cadastradas para este artista.
          </p>
        ) : (
          <div className="artwork-explore-grid">
            {relatedArtworks.map((relWork) => {
              const variant =
                relWork.largura &&
                relWork.altura &&
                relWork.largura > relWork.altura
                  ? "paisagem"
                  : "retrato";

              return (
                <ArtworkCard
                  key={relWork.id}
                  artwork={{
                    ...relWork,
                    artist: artistName,
                    variant,
                  }}
                />
              );
            })}
          </div>
        )}

        <hr className="artwork-explore-divider" />
      </section>
    </div>
  );
}