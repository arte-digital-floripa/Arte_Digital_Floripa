import { useParams, Link } from "react-router-dom";
import { useArtist } from "../hooks/useArtists";

export default function ArtistDetailPage() {
  // Pega o ID da URL
  const { id } = useParams();
  
  // Busca o artista pelo ID no banco
  const { artist, artworks, loading, error } = useArtist(id);

  if (loading) return <p>Carregando detalhes do artista...</p>;

  if (error || !artist) return <p>Artista não encontrado.</p>;

  return (
    <div className="section-container"> 
    {/* 1. Detalhes do Artista */}

    <header className="artist-profile-header">
        <h1>{artist.name}</h1>
        <p>{artist.bio}</p>
      </header>
      {/* 2. Galeria de Obras do Artista */}
      <section className="artist-artworks-section">
        <h2>Obras Catalogadas ({artworks.length})</h2>
        <div className="artworks-grid">
          {artworks.map((obra) => (
            <Link key={obra.id} to={`/obras/${obra.id}`}>
              {/* Já com as dimensões prontas para quando o card visual for plugado */}
              <img 
                src={obra.remote_url} 
                alt={obra.title}
                style={{ 
                  aspectRatio: `${obra.largura} / ${obra.altura}`,
                  width: "100%",
                  objectFit: "cover"
                }} 
              />
              <h3>{obra.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}