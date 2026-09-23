import { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const navigate = useNavigate();

  // carregar dados de login do local storage

  useEffect(() => {
    const emailSalvo = localStorage.getItem("userEmail");
    if (emailSalvo) {
      setEmail(emailSalvo);
      setLembrar(true);
    }
  }, []);

  // handles

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handleSenha(e) {
    setSenha(e.target.value);
  }
  function handleLembrar(e) {
    setLembrar(e.target.checked);
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email: email,
        senha: senha,
      });

      const token = response.data.token;
      
      // implementação do lembrar

      if (lembrar) {
        localStorage.setItem("authToken", token);
        sessionStorage.removeItem("authToken");

        // salvar o email

        localStorage.setItem("userEmail", email);
      } else {
        sessionStorage.setItem("authToken", token);
        localStorage.removeItem("authToken");

        // retirar o email do local storage

        localStorage.removeItem("userEmail");
      }

      navigate("/", { state: { msg: "Login realizado com sucesso!" } });
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error("Senha ou E-mail incorretos", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        console.error("Erro de conexão:", error.message);
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div id="login_container" className="container-fluid text-center ">
          <h4 id="titulo" className="my-5">
            Faça seu login
          </h4>
          <div className="input-group mb-3 px-5">
            <input
              id="usuario_input"
              type="email"
              className="form-control"
              placeholder="E-mail ou Usuário"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleEmail}
              value={email}
            />
          </div>
          <div className="input-group mb-3 px-5">
            <input
              id="senha_input"
              type="password"
              className="form-control"
              placeholder="Senha"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleSenha}
              value={senha}
            />
          </div>

          <div className="container-fluid d-flex justify-content-between px-5">
            <div id="lembrar_container" className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="checkDefault"
                onChange={handleLembrar}
                checked={lembrar}
              />
              <label className="form-check-label" htmlFor="checkDefault">
                Lembrar de mim
              </label>
            </div>
            <p>
              <Link
                id="link_esqueci_senha"
                className=" link-dark link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                to="/esqueci-senha"
              >
                Esqueci minha senha
              </Link>
            </p>
          </div>
          <button
            onClick={handleLogin}
            id="entrar_btn"
            type="button"
            className="btn"
          >
            Entrar
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
