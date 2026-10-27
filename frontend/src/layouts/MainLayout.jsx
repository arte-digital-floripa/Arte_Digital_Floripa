import { Outlet } from "react-router-dom";
import NavigationBar from "../components/layout/Header/Header";
import FooterGlobal from "../components/layout/Footer/Footer";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <NavigationBar />
      <main>
        <Outlet />
      </main>
      <FooterGlobal />
    </div>
  );
}
