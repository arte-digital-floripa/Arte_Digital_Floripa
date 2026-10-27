import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CleanLayout from "../layouts/CleanLayout";
import HomePage from "../pages/HomePage";
import ArtistsPage from "../pages/ArtistsPage";
import ArtistDetailPage from "../pages/ArtistDetailPage";
import ArtworkDetailPage from "../pages/ArtworkDetailPage";
import VirtualMuseumPage from "../pages/VirtualMuseumPage";
import PlacesPage from "../pages/PlacesPage";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/artistas" element={<ArtistsPage />} />
        <Route path="/artistas/:id" element={<ArtistDetailPage />} />
        <Route path="/obras/:id" element={<ArtworkDetailPage />} />
        <Route path="/lugares" element={<PlacesPage />} />
        <Route path="/sobre" element={<AboutPage />} />
      </Route>
      <Route element={<CleanLayout />}>
        <Route path="/museu-virtual" element={<VirtualMuseumPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
