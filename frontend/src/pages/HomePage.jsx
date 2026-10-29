import ArtistCard from "../components/cards/ArtistCard/ArtistCard";
import ArtworkCard from "../components/cards/ArtworkCard/ArtworkCard";

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
      remote_url: "/img/artwork-mock-img.png",
      date: "26/10/98",
      medium: "oleo",
      largura: "3",
      altura: "4",
      artists: "grilo"
    }
  ]

  return (
    <div style={{ minHeight: 2000 + "px", paddingLeft: 100 + "px" }}>
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
      <br /><br /><br /><br /><br />
      <div className="container">
        <ArtworkCard artwork={artworkMockData[0]} />
      </div>
    </div>
  );
}
