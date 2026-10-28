import ArtistCard from "../components/cards/ArtistCard/ArtistCard";

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

  return (
    <div style={{ height: 1000 + "px", paddingLeft: 100 + "px" }}>
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
    </div>
  );
}
