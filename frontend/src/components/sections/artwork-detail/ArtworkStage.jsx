const FALLBACK_STAGE_IMG =
  "https://placehold.co/900x700/16191E/FFFFFF?text=Obra+Indisponivel";

export default function ArtworkStage({ artwork }) {
  const { title, remote_url, largura, altura } = artwork || {};

  return (
    <section className="artwork-stage-section">
      <div className="artwork-stage-frame">
        <img
          src={remote_url || FALLBACK_STAGE_IMG}
          alt={title || "Obra em destaque"}
          className="artwork-stage-image"
        />
      </div>
    </section>
  );
}