import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useArtwork } from "../hooks/useArtworks";
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
    artwork.description ||
    artwork.descricao ||
    artist?.bio ||
    artist?.biografia ||
    "Sem resumo cadastrado para esta obra.";

  return (
    <div className="artwork-detail-page">
            {/* BLOCO 1: Palco da Obra direto na página */}
      <section className="artwork-stage-section">
        <div className="artwork-stage-frame">
          <img
            src={
              artwork.remote_url ||
              "https://placehold.co/900x700/16191E/FFFFFF?text=Obra+Indisponivel"
            }
            alt={title}
            className="artwork-stage-image"
          />
        </div>
      </section>

      {/* BLOCO 2: Detalhes da obra */}
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
            {relatedArtworks.map((relWork, index) => {
              // Ciclo de 11 obras em grid de 12 colunas:
              // Linha 1 (pos 0..5): 6 compactos (6 x span 2 = 12 cols)
              // Linha 2 (pos 6..10): 1 compacto (2) + 2 largos (3+3) + 2 compactos (2+2) = 12 cols
              const pos = index % 11;
              const isWide = pos === 7 || pos === 8;
              const variant = isWide ? "explore-featured" : "explore-compact";
              const isRowEnd =
                (pos === 5 || pos === 10) &&
                index < relatedArtworks.length - 1;

              return (
                <div key={relWork.id} className="artwork-explore-item-group">
                  <ArtworkCard
                    artwork={{
                      ...relWork,
                      artist: artistName,
                      variant,
                    }}
                  />
                  {isRowEnd && <hr className="artwork-explore-row-divider" />}
                </div>
              );
            })}
          </div>
        )}

        <hr className="artwork-explore-divider" />
      </section>
    </div>
  );
}