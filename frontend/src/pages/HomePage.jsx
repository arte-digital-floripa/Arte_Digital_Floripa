import ArtistCard from "../components/cards/ArtistCard/ArtistCard";
import ArtworkCard from "../components/cards/ArtworkCard/ArtworkCard";
import ArtworkStage from "../components/sections/artwork-detail/ArtworkStage";
import Button from "../components/common/Button/Button";
import FilterTag from "../components/common/FilterTag/FilterTag";

export default function HomePage() {
  const artistMockData = [
    {
      artist: {
        id: "1",
        name: "Semy Braga artistas",
        bio: "Pintor muito conhecido em florianopolis por sua tecnica unica",
        photo_url: "/img/artist_mock_img.png",
        artworks: ["O minha querida", "Dois bandolins"],
      },
      variant: { type: "artist", compact: true },
    },
    {
      artist: {
        id: "2",
        name: "Semy Braga artistas",
        bio: "Pintor muito conhecido em florianopolis por sua tecnica unica",
        photo_url: "/img/artist_mock_img.png",
        artworks: ["O minha querida", "Dois bandolins"],
      },
      variant: { type: "artist", compact: false },
    },
    {
      artist: {
        id: "3",
        name: "Semy Braga home",
        bio: "Pintor muito conhecido em florianopolis por sua tecnica unica",
        photo_url: "/img/artist_mock_img.png",
        artworks: ["O minha querida", "Dois bandolins"],
      },
      variant: { type: "home", compact: false },
    },
    {
      artist: {
        id: "4",
        name: "Semy Braga home",
        bio: "Pintor muito conhecido em florianopolis por sua tecnica unica",
        photo_url: "/img/artist_mock_img.png",
        artworks: ["O minha querida", "Dois bandolins"],
      },
      variant: { type: "home", compact: true },
    },
  ];

  const artworkMockData = [
    {
      id: 0,
      title: "Homem olhando a grama",
      remote_url: "/img/artwork-retrato-mock.png",
      date: "26/10/98",
      medium: "oleo",
      largura: "3",
      altura: "4",
      artist: "Grilo",
      variant: "retrato",
    },
    {
      id: 1,
      title: "Grama olhando o homem",
      remote_url: "/img/artwork-paisagem-mock.png",
      date: "26/10/98",
      medium: "oleo",
      largura: "4",
      altura: "3",
      artist: "Homem",
      variant: "paisagem",
    },
  ];

  const artworkStageMockData = {
    id: 0,
    title: "A pedra do deserto",
    remote_url: "/img/artwork-stage-mock.png",
  };

  return (
    <div style={{ minHeight: 2000 + "px" }}>
      <ArtworkStage artwork={artworkStageMockData} />
      <h1>HomePage</h1>
      <div className="container">
        {artistMockData.map((artist) => (
          <ArtistCard
            artist={artist.artist}
            variant={artist.variant}
            key={artist.artist.id}
          />
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        {artworkMockData.map((artwork) => (
          <ArtworkCard artwork={artwork} key={artwork.id} />
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        {/* Botoes compactos - home, artists  */}
        <Button
          text={"Teste Primary"}
          variant="primary"
          className="btn-compact"
        />
        <Button
          text={"Teste Outline"}
          variant="outline"
          className="btn-compact"
        />
        <Button text={"Teste Dark"} variant="dark" className="btn-compact" />
        <Button
          text={"Teste Icon - pill"}
          variant="icon-pill"
          className="btn-compact"
        />
      </div>
      <br />
      <br />
      <div className="container">
        {/* botão largo - pagina de obra */}
        <Button text={"Teste Primary"} variant="primary" className="btn-wide" />
        <Button text={"Teste Outline"} variant="outline" className="btn-wide" />
        <Button text={"Teste Dark"} variant="dark" className="btn-compact" />
        <Button
          text={"Teste Icon - pill"}
          variant="icon-pill"
          className="btn-wide"
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <FilterTag label={"filtro 1"} active={false} />
        <FilterTag label={"filtro 2"} active={false} />
        <FilterTag label={"filtro 3"} active={true} />
        <FilterTag label={"filtro 4"} active={true} />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
