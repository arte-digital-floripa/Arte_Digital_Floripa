import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// paginas

import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import EsqueciSenha from "./pages/EsqueciSenha/EsqueciSenha";
import NovaObra from "./pages/NovaObra/NovaObra";
import Layout from "./Layout";
import NovoUsuario from "./pages/NovoUsuario/NovoUsuario";
import RecuperarSenha from "./pages/recuperarSenha/RecuperarSenha";

// proteção de rotas

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Obras from "../../landing-page/src/pages/Obras/Obras";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<NovaObra />} />
              <Route path="/obras/:id" element={<Obras />} />
            </Route>
            <Route path="/novo-usuario" element={<NovoUsuario />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/completar-cadastro" element={<Cadastro />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />}/>
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
