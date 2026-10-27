import { useArtists } from "../hooks/useArtists";
import ArtistCard from "../components/cards/ArtistCard/ArtistCard";

export default function ArtistsPage() {
  const { artists, loading, error } = useArtists();

  return (
    <div className="section-container" style={{ minHeight: "60vh"}}>
      <h1 className="section-title">Artistas do Acervo</h1>
      <p className="section-subtitle">Explore os artistas presentes em nosso acervo</p>

      {/* 1. Carregando */}
      {loading && <p>Carregando artistas do acervo...</p>}

      {/* 2. Erro */}
      {error && (
        <p style={{ color: "red" }}>
          Ocorreu um erro ao carregar os artistas. Verifique a conexão com o banco de dados.</p>
      )}

  
    {/* 3. Lista de artistas */}
    {!loading && !error && (
      <div style={{ display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "28px",
      }}
      >
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} variant="compact" />
      ))}
      </div>
    )}
    </div>
  )
} 
