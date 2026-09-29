import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  return (
    <>
      <nav id="nav_container" className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <div className="d-flex align-items-center">
              <img
                src="/img/logo.png"
                alt="Logo da fundação cultural de Florianopolis Franklin Cascaes"
                className="logo"
              />
              <h1 className="titulo">Acervo Franklin Cascaes</h1>
            </div>
          </Link>
          <div className="justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item collapse navbar-collapse">
                {/* TODO (Etapa 02): Avaliar criar rota /obras (Opcao B) */}
                <Link id="btn_obras" className=" btn btn-dark" to="/">
                  Obras
                </Link>
              </li>
              <li className="nav-item">
                <img
                  src="/img/arte_digital_logo.png"
                  id="logo_arte_digital"
                  alt="logo arte digital unicesusc"
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
