import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";

// css imports

import "../styles/components.css";
import "../styles/global.css";
import "../styles/tokens.css";
import "../styles/typography.css";

export default function MainLayout() {
  return (
    // classe black-main esta para fins visuais temporarios,
    // retirar quando o restante for feito
    <div className=" black-back main-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
