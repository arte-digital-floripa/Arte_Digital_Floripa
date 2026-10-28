import { Link } from "react-router-dom";

export default function ArtistCard({ artist, variant }) {
  const { id, name, bio, photo_url, artworks } = artist || {};
  const { type, compact } = variant || {};

  // fallback da url de img

  const FALLBACK_ARTIST_IMG =
    "https://placehold.co/600x400/16191E/FFFFFF?text=Arte+Digital+Floripa";

  // texto de artworks do card

  const worksText =
    Array.isArray(artworks) && artworks.length > 0
      ? `${artworks.length} obra(s) catalogada(s)`
      : "Explorar obras do artista";

  let summaryStyle = "";
  let cardStyle = "";

  if (type == "home") {
    if (compact) {
      cardStyle = "artist-card home-compact";
      summaryStyle = "artist-card-summary home-summary-compact";
    } else {
      cardStyle = "artist-card home-featured";
      summaryStyle = "artist-card-summary home-summary-featured";
    }
  } else if (type == "artist") {
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
      <Link to={`/artist/${id || ""}`}>
        <div className="artist-card-wrapper">
          <img
            src={photo_url || FALLBACK_ARTIST_IMG}
            alt={name || "Retrato do artista"}
            className="artist-card-artwork"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_ARTIST_IMG;
            }}
          />
        </div>
        <div className="artist-card-content">
          <div>
            <h3 className="artist-card-name">{name || "Nome do Artista"}</h3>
            <p className={summaryStyle}>
              {bio ||
                "Biografia em catalogacao pelo acervo Arte Digital Floripa."}
            </p>
          </div>
          <span className={`artist-card-works`}>
            {worksText}
          </span>
        </div>
      </Link>
    </div>
  );
}
