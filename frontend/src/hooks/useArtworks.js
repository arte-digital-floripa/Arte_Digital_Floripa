import { useState, useEffect } from "react";
import { getArtworks, getArtworkById } from "../services/artworksService";
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      if (!id) return;
      
      async function fetchSingleArtwork() {
        try {
          setLoading(true);
          const data = await getArtworkById(id);
          setArtwork(data);
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
    
    return { artwork, loading, error };
  }

