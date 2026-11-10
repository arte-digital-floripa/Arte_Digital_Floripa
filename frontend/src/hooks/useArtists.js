import { useState, useEffect } from "react";
import { 
  getArtists, 
  getArtistById, 
  getArtistArtworks 
} from "../services/artistsService";
import { toast } from "react-toastify";

export function useArtists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchArtists() {
      try {
        setLoading(true);
        const data = await getArtists();
        setArtists(data);
      } catch (err) {
        console.error("Erro ao buscar artistas:", err);
        setError(err);
        toast.error("Não foi possível carregar os artistas.", err);
      } finally {
        setLoading(false);
      }
    }

    fetchArtists();
  }, []);

  return {artists, loading, error};
}

  export function useArtist(id) {
    const [artist, setArtist] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!id) return;
      // Se não houver ID na URL, não faz requisição

      async function fetchArtistDetails() {
        try {
          setLoading(true);

          // Promise.all dispara a busca em paralelo
          const [artistData, artworksData] = await Promise.all([
            getArtistById(id),
            getArtistArtworks(id)
          ]);

          setArtist(artistData);
          setArtworks(artworksData);
        } catch (err) {
          console.error(`Erro ao buscar artista ${id}:`, err);
          setError(err);
          toast.error("Não foi possível carregar os detalhes do artista.");
        } finally {
          setLoading(false);
        }
      }

      fetchArtistDetails();
    }, [id]);

    return { artist, artworks, loading, error };
  }
