import { useState } from "react";
import "./EsqueciSenha.css";
import { toast } from "react-toastify";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  async function handleEnviar(e) {
    e.preventDefault();

    const payload = { email: email };

    try {
      const response = await api.post("/auth/recuperar-senha", payload);

      toast.success("Um email foi enviado com as instruções.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar:", error.response?.data);
      toast.error("Erro ao solicitar link de recuperação.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="esqueci-container">
          <h1 id="titulo">Esqueceu a senha?</h1>
          <p id="sub_titulo" className="">
            Insira seu email e enviaremos um link para redefinir sua senha
          </p>
          <form onSubmit={handleEnviar} className="w-100">
            <div className="mb-3">
              <input
                onChange={handleEmail}
                value={email}
                type="email"
                className="form-control"
                id="email_es"
                placeholder="Email"
              />
            </div>
            <button id="enviar_btn" type="submit" className="btn">
              Enviar link de recuperação
            </button>
          </form>
          <Link to="/login" className="back-link">
            Voltar para o Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default EsqueciSenha;
