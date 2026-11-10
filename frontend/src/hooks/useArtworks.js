import { useState, useEffect } from "react";
import { getArtworks, getArtworkById } from "../services/artworksService";
import { getArtistById, getArtistArtworks } from "../services/artistsService";
import { toast } from "react-toastify";

export function useArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArtworks() {
      try {
        setLoading(true);
        const data = await getArtworks();
        setArtworks(data);
      } catch (err) {
        console.error("Erro ao buscar obras de arte:", err);
        setError(err);
        toast.error("Não foi possível carregar as obras do acervo.");
      } finally {
        setLoading(false);
      }
    }

    fetchArtworks();
  }, []);

  return { artworks, loading, error };

}

  export function useArtwork(id) {
    const [artwork, setArtwork] = useState(null);
    const [artist, setArtist] = useState(null);
    const [relatedArtworks, setRelatedArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      if (!id) return;
      
      async function fetchSingleArtwork() {
        try {
          setLoading(true);

          // 1. Busca obra principal 
          const artworkData = await getArtworkById(id);
          setArtwork(artworkData);

          // 2. Busca o artista e suas outras obras 
          if (artworkData?.artist_id) {
            try {
              const [artistData, artistWorks] = await Promise.all([
                getArtistById(artworkData.artist_id),
                getArtistArtworks(artworkData.artist_id),
              ]);
        

            setArtist(artistData);

            // Filtra a lista para não repetir a obra no "Explore mais"
            const otherWorks = (artistWorks || []).filter((w) => w.id !== id);
            setRelatedArtworks(otherWorks);
          }catch (errRel) {
            console.warn("Não foi possível carregar obras relacionadas:", errRel);
            }
          }
        } catch (err) {
          console.error(`Erro ao buscar obra ${id}:`, err);
          setError(err);
          toast.error("Não foi possível carregar a obra do acervo.");
        } finally {
          setLoading(false);
        }
      }
      
      fetchSingleArtwork();
    }, [id]);
    
    return { artwork, artist, relatedArtworks, loading, error };
  }

