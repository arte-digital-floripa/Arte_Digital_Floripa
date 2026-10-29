import { useArtists } from "../hooks/useArtists";
import ArtistCard from "../components/cards/ArtistCard/ArtistCard";
import { useFilter } from "../hooks/useFilter";

export default function ArtistsPage() {
  const { artists, loading, error } = useArtists();
  // Renomeia filteredItems para filteredArtists usando ":"
  const { searchTerm, setSearchTerm, filteredItems: filteredArtists } = useFilter(artists, "name");

  return (
    <div className="section-container" style={{ minHeight: "60vh" }}>
      <h1 className="section-title">Artistas do Acervo</h1>
      <p className="section-subtitle">Explore os artistas presentes em nosso acervo</p>

      {/* 1. Carregando */}
      {loading && <p>Carregando artistas do acervo...</p>}

      {/* 2. Erro */}
      {error && (
        <p style={{ color: "red" }}>
          Ocorreu um erro ao carregar os artistas. Verifique a conexão com o banco de dados.
        </p>
      )}

      {/* 3. Campo de busca em tempo real */}
      <div style={{ marginBottom: "32px", maxWidth: "480px" }}>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar artista por nome..."
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* 4. Lista de artistas filtrada */}
      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "28px",
          }}>

          {filteredArtists.length === 0 ? (
            <p>Nenhum artista encontrado para "{searchTerm}".</p>
          ) : (
            filteredArtists.map((artist) => (
              <ArtistCard 
              key={artist.id} 
              artist={artist} 
              variant={{ type: "artist", compact: true }} 
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}