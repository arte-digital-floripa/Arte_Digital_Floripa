import api from "./api";

export async function getArtists() {
  const response = await api.get("/artists");
  return response.data;
}

export async function getArtistById(id) {
  const response = await api.get(`/artists/${id}`);
  return response.data;
}

export async function getArtistArtworks(id) {
  const response = await api.get(`/artists/${id}/artworks`);
  return response.data;
}
