import { Link } from "react-router-dom";

const FALLBACK_ARTWORK_IMG =
  "https://placehold.co/600x450/F3F2EE/7E6664?text=Obra+de+Arte";

export default function ArtworkCard({
  artwork,
  artistName = "",
  className = "",
}) {
  const { id, title, remote_url, date, medium, largura, altura, artists } =
    artwork || {};

  const displayArtist = artistName || artists?.name || "";
  const subtitleDetails = [date, medium].filter(Boolean).join(" - ");

  const aspectStyle =
    largura && altura ? { aspectRatio: `${largura} / ${altura}` } : {};

  return (
    <Link
      to={`/obras/${id || ""}`}
      className={`artwork-card ${className}`.trim()}
    >
      <div className="artwork-card-image-wrapper" style={aspectStyle}>
        <img
          src={remote_url || FALLBACK_ARTWORK_IMG}
          alt={title || "Obra do acervo"}
          className="artwork-card-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_ARTWORK_IMG;
          }}
        />
      </div>

      <div className="artwork-card-info">
        <h4 className="artwork-card-title">{title || "Obra sem titulo"}</h4>
        {displayArtist && (
          <p className="artwork-card-artist">{displayArtist}</p>
        )}
        {subtitleDetails && (
          <span className="artwork-card-year">{subtitleDetails}</span>
        )}
      </div>
    </Link>
  );
}