import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../services/api";
import "./RecuperarSenha.css";

function RecuperarSenha() {
  // setando estados para os campos

  const [searchParams] = useSearchParams();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const tempToken = searchParams.get("token");

  console.log(tempToken)

  const navigate = useNavigate();

  // Funções handle

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

    if (!tempToken) {
      toast.error("Token de recuperação não encontrado ou invalido, solicide novamente.", {
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

    if (!senha || !confirmarSenha) {
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
      const response = await api.post(`/auth/redefinir-senha/${tempToken}`, {
        senha: senha,
      });
      toast.success("Senha recuperada com sucesso!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error("Erro detalhado do backend:", error.response?.data);
      toast.error(error.response?.data?.mensagem || "Erro ao redefinir a senha.");
    }
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
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
        <h1 id="titulo">Recuperar Senha</h1>
        <p id="sub_titulo" className="">
          Preencha a nova senha abaixo
        </p>
        <form>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="senha"
              placeholder="Nova senha"
              onChange={handleSenha}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="confirmar_senha"
              placeholder="Confirmar nova senha"
              onChange={handleConfirmarSenha}
            />
          </div>
          <button
            onClick={handleEnviar}
            id="enviar_btn"
            type="submit"
            className="btn"
          >
            Confirmar
          </button>
        </form>
      </div>
    </>
  );
}

export default RecuperarSenha;
