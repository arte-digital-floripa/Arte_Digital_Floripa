import { useParams, Link } from "react-router-dom";
import { useArtwork } from "../hooks/useArtworks";

export default function ArtworkPage() {
  // Pega o ID da URL
  const { id } = useParams();

  // Busca a obra pelo ID no banco

  const { artwork, loading, error } = useArtwork(id);

  if (loading) {
    return (
      <div className="section-container" style={{ padding: "60px 20px" }}>
        <p>Carregando obras do acervo...</p>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="section-container" style={{ padding: "60px 20px", color: "red" }}>
        <h2>Obra não encontrada</h2>
        <Link to="/artistas" style={{ color: "var(--color-accent-primary)" }}>
        ← Voltar para a lista de artistas      
        </Link>
      </div>
    );
  }

  return (
    <div className="artwork-page-wrapper">
      {/* 1. O Palco da Obra (Fundo escuro igual ao Figma) */}
      <section className="artwork-stage-section">
        <div className="artwork-stage-frame">
          <img src={artwork.remote_url}
          alt={artwork.title}
          className="artwork-stage-image"
          />
        </div>
      </section>

      {/* 2. Detalhes da Obra */}
      <section className="artwork-details-section">
        <div className="section-container artwork-details-card">
          <h1 className="artwork-title-heading">{artwork.title}</h1>
          <span className="artwork-year-text">{artwork.date || "Sem data"}</span>

          <div className="artwork-technical-meta">
            {artwork.category && <p><strong>Categoria:</strong> {artwork.category}</p>}
            {artwork.medium && <p><strong>Técnica:</strong> {artwork.medium}</p>}
            {artwork.largura && artwork.altura && (
              <p><strong>Dimensões:</strong> {artwork.largura} × {artwork.altura} px</p>
            )}
          </div>

          {/* 3. Botões de Ação */}
          <div className="artwork-action-buttons">
            <Link to={artwork.artist_id ? `/artistas/${artwork.artist_id}` : "#"}
            className="btn btn-primary">Ver galeria do artista
            </Link>
            <button className="btn btn-outline">Ficha Curatorial</button>
            <button className="btn btn-dark">Audioguia</button>
          </div>
        </div>
      </section>
    </div>
  )
}