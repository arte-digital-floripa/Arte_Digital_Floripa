import api from "./api";

export async function getArtworks() {
  const response = await api.get("/artwork");
  return response.data;
}

export async function getArtworkById(id) {
  const response = await api.get(`/artwork/${id}`);
  return response.data;
}
