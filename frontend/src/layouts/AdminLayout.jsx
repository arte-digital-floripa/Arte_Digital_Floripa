import { Outlet } from "react-router-dom";

// componentes

import Navbar from "../components/AdminNavbar/Navbar";

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
    </div>
  );
}

export default Layout;
