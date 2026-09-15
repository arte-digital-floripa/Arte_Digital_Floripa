import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";
import "./Cadastro.css";

function Cadastro() {
  // setando estados para os campos

  const [searchParams] = useSearchParams();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    senha: "",
  });

  const tempToken = searchParams.get("token");
  console.log(tempToken)

  const navigate = useNavigate();

  // Funções handle

  function handleNome(e) {
    setNome(e.target.value);
    console.log(nome);
  }
  function handleSenha(e) {
    setSenha(e.target.value);
    console.log(senha);
  }
  function handleConfirmarSenha(e) {
    setConfirmarSenha(e.target.value);
    console.log(confirmarSenha);
  }

  // enviar

  async function handleEnviar(e) {
    e.preventDefault();

    if (!nome || !senha) {
      toast.error("Por favor preencha todos os campos.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error("As senhas não são iguais.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const response = await api.post(`/auth/completar-cadastro/${tempToken}`, {
        nome: nome,
        senha: senha,
      });
      console.log("Cadastro completado com sucesso:", response.data);
      toast.success("Cadastro concluído com sucesso!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate('/')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="cadastro-container">
          <h1 id="titulo">Completar Cadastro</h1>
          <p id="sub_titulo" className="">
            Preencha os dados abaixo
          </p>
          <form onSubmit={handleEnviar} className="w-100">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="nome"
                placeholder="Nome"
                onChange={handleNome}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="senha"
                placeholder="Senha"
                onChange={handleSenha}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="confirmar_senha"
                placeholder="Confirmar Senha"
                onChange={handleConfirmarSenha}
              />
            </div>
            <button
              id="enviar_btn"
              type="submit"
              className="btn"
            >
              Enviar
            </button>
          </form>
          <p id="login_p">
            Já tem uma conta?{" "}
            <Link id="login_link" to="/login">
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
