import { useState } from "react";
import "./NovoUsuario.css";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NovoUsuario() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  async function handleEnviar(e) {
    e.preventDefault();

    const payload = { email: email };

    try {
      const response = await api.post("/usuarios/cadastro", payload);

      toast.success("Novo usuário cadastrado com sucesso.", {
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
      toast.error("Erro ao cadastrar novo usuario.", {
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
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 id="titulo">Cadastrar Usuário</h1>
        <p id="sub_titulo" className="">
          Insira seu email e enviaremos um link para completar seu cadastro.
        </p>
        <form onSubmit={handleEnviar}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email_es"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <button id="enviar_btn" type="submit" className="btn">
            Cadastrar Email
          </button>
        </form>
      </div>
    </>
  );
}

export default NovoUsuario;
