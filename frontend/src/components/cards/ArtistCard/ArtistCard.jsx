import { Link } from "react-router-dom";

export default function ArtistCard({ artist, variant }) {
  const { id, name, bio, photo_url, artworks } = artist || {};
  const { type, compact } = variant || {};

  const FALLBACK_ARTIST_IMG = "/img/hero-artists.png";

  // Remove nomes longos 
  const cleanName = (name || "Nome do Artista").split("(")[0].trim();

  // Usa obra do artista quando não há foto do artista 
  const hasValidPhoto =
    photo_url && !photo_url.toLowerCase().includes("ui-avatars.com");
  const firstArtworkImg =
    Array.isArray(artworks) && artworks.length > 0
      ? artworks[0]?.remote_url ||
        artworks[0]?.image_url ||
        artworks[0]?.thumbnail_url
      : null;
  const displayPhoto = hasValidPhoto
    ? photo_url
    : firstArtworkImg || FALLBACK_ARTIST_IMG;

  // Texto curatorial 
  const cleanBio =
    bio && bio.trim().toLowerCase() !== "mock bio"
      ? bio
      : "Artista integrante do acervo cultural e histórico exposto na plataforma.";

  // Texto de obras do card
  const worksText =
    Array.isArray(artworks) && artworks.length > 0
      ? `Obras: ${artworks
          .slice(0, 2)
          .map((w) => `“${w.title || w}”`)
          .join(" , ")}`
      : "Obras: Explorar acervo do artista";

  let summaryStyle;
  let cardStyle;

  if (type === "home") {
    if (compact) {
      cardStyle = "artist-card home-compact";
      summaryStyle = "artist-card-summary home-summary-compact";
    } else {
      cardStyle = "artist-card home-featured";
      summaryStyle = "artist-card-summary home-summary-featured";
    }
  } else {
    if (compact) {
      cardStyle = "artist-card artist-compact";
      summaryStyle = "artist-card-summary artist-summary-compact";
    } else {
      cardStyle = "artist-card artist-featured";
      summaryStyle = "artist-card-summary artist-summary-featured";
    }
  }

  return (
    <div className={cardStyle}>
      <Link to={`/artistas/${id || ""}`}>
        <div className="artist-card-wrapper">
          <img
            src={displayPhoto}
            alt={cleanName}
            className="artist-card-artwork"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_ARTIST_IMG;
            }}
          />
        </div>
        <div className="artist-card-content">
          <div className="artist-card-info">
            <h3 className="artist-card-name" title={cleanName}>
              {cleanName}
            </h3>
            <p className={summaryStyle}>Resumo: {cleanBio}</p>
          </div>
          <span className="artist-card-works">{worksText}</span>
        </div>
      </Link>
    </div>
  );
}