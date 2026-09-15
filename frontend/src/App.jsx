import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Paginas Publicas
import Home from "./pages/public/Home/Home";
import Obras from "./pages/public/Obras/Obras";
import Login from "./pages/public/Login/Login";
import Cadastro from "./pages/public/Cadastro/Cadastro";
import EsqueciSenha from "./pages/public/EsqueciSenha/EsqueciSenha";
import RecuperarSenha from "./pages/public/recuperarSenha/RecuperarSenha";

// Paginas Administrativas
import NovaObra from "./pages/admin/NovaObra/NovaObra";
import NovoUsuario from "./pages/admin/NovoUsuario/NovoUsuario";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rotas Publicas */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/obras/:id" element={<Obras />} />
            <Route path="/login" element={<Login />} />
            <Route path="/completar-cadastro" element={<Cadastro />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          </Route>

          {/* Rotas Administrativas (Protegidas) */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<NovaObra />} />
              <Route path="nova-obra" element={<NovaObra />} />
              <Route path="novo-usuario" element={<NovoUsuario />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
