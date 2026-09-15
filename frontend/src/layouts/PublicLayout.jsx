import { Outlet } from "react-router-dom";

// componentes

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function Layout() {
  return (
    <div className="layout-container">
      {/* Header */}
      <header>
        <Navbar />
      </header>

      <main className="conteudo mb-3">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
