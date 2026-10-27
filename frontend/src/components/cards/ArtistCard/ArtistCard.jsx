export default function ArtistCard({ artist, variant = "compact" }) {
  return (
    <div>
      <h3>{artist?.name || "Nome do Artista"}</h3>
    </div>
  );
}
