import { useState } from "react";
import { useArtists } from "../hooks/useArtists";
import { useFilter } from "../hooks/useFilter";
import ArtistCard from "../components/cards/ArtistCard/ArtistCard";
import SearchInput from "../components/common/SearchInput/SearchInput";
import FilterTag from "../components/common/FilterTag/FilterTag";

const ARTIST_THEMES = [
  "Todos",
  "Contemporâneo",
  "Manezinho",
  "Pintura",
  "Escultura",
  "Fotografia",
];

export default function ArtistsPage() {
  const { artists, loading, error } = useArtists();
  const {
    searchTerm,
    setSearchTerm,
    filteredItems: searchedArtists,
  } = useFilter(artists, "name");

  const [activeTheme, setActiveTheme] = useState("Todos");

  // Filtra pelo tema clicado na faixa preta
  const filteredArtists = searchedArtists.filter((artist) => {
    if (activeTheme === "Todos") return true;
    const target = activeTheme.toLowerCase();
    const artistCategory = (artist.category || "").toLowerCase();
    const artworkCategories = Array.isArray(artist.artworks)
      ? artist.artworks.map((w) => (w.category || "").toLowerCase()).join(" ")
      : "";
    const fallbackText = `${artist.name || ""} ${artist.bio || ""}`.toLowerCase();

    return (
      artistCategory.includes(target) ||
      artworkCategories.includes(target) ||
      fallbackText.includes(target.slice(0, 5))
    );
  });

  const scrollToGrid = () => {
    document
      .getElementById("acervo-artistas")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToFilterTags = () => {
    document
      .getElementById("filtros-artistas")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleThemeSelect = (theme) => {
    setActiveTheme(theme);
    scrollToFilterTags();
  };

  return (
    <div className="artists-page">
      {/* BLOCO 1: Hero Mestres da Arte Florianopolitana */}
      <section className="artists-hero-section">
        <div className="artists-hero-content">
          <span className="artists-hero-eyebrow">ARTE DIGITAL FLORIPA</span>

          <h1 className="artists-hero-headline">
            Mestres da Arte Florianopolitana.
          </h1>

          <p className="artists-hero-subtitle">
            Uma imersão tridimensional no patrimônio artístico. Navegue por
            exposições temáticas e aprecie obras em alta resolução.
          </p>

          <button
            type="button"
            onClick={scrollToGrid}
            className="home-cta-btn"
          >
            Explore o acervo
          </button>
        </div>
      </section>

      {/* BLOCO 2: Faixa "Escolha um tema ou faça uma busca" */}
      <section id="acervo-artistas" className="artists-search-band">
        <h2 className="artists-search-label">
          Escolha um tema ou faça uma busca
        </h2>

        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar"
          onSubmit={(e) => {
            e.preventDefault();
            scrollToGrid();
          }}
        />
      </section>

      {/* BLOCO 3: Faixa Preta de Temas */}
      <section id="filtros-artistas" className="artists-theme-band">
        <div className="artists-theme-container">
          {ARTIST_THEMES.map((theme) => (
            <FilterTag
              key={theme}
              label={theme}
              active={activeTheme === theme}
              onClick={() => handleThemeSelect(theme)}
            />
          ))}
        </div>
      </section>

      {/* BLOCO 4: Mosaico de Cards de Artistas */}
      <section className="artists-grid-section">
        {loading && (
          <p className="page-status">Carregando artistas do acervo...</p>
        )}

        {error && (
          <p className="page-status">
            Ocorreu um erro ao carregar os artistas. Verifique a conexão com a
            API.
          </p>
        )}

        {!loading && !error && filteredArtists.length === 0 && (
          <p className="page-status">
            Nenhum artista encontrado para a busca selecionada.
          </p>
        )}

        {!loading && !error && filteredArtists.length > 0 && (
          <div className="artists-cards-mosaic">
            {filteredArtists.map((artist, index) => {
              // Ciclo de 10 cards que se repete infinitamente:
              // Linha 1 (pos 0, 1, 2): Featured, Compact, Featured
              // Linha 2 (pos 3, 4, 5): Compact, Featured, Featured
              // Linha 3 (pos 6, 7, 8, 9): 4 Compacts
              const pos = index % 10;
              const isFeatured =
                pos === 0 || pos === 2 || pos === 4 || pos === 5;

              return (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  variant={{ type: "artist", compact: !isFeatured }}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}