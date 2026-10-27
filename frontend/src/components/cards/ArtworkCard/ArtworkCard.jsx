export default function ArtworkCard({ artwork }) {
  return (
    <div>
      <h4>{artwork?.title || "Título da Obra"}</h4>
    </div>
  );
}
