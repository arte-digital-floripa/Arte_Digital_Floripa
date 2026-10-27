import { useState, useEffect } from "react";
import { getArtists } from "../services/artistsService";
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
