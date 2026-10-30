import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_URL?.trim();
const baseURL = rawBaseUrl
  ? rawBaseUrl.replace(/\/+$/, "").endsWith("/api")
    ? rawBaseUrl.replace(/\/+$/, "")
    : `${rawBaseUrl.replace(/\/+$/, "")}/api`
  : "/api";

const api = axios.create({
  baseURL,
});

export default api;