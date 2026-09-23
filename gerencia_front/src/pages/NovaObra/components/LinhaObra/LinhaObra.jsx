import { useEffect, useState } from "react";
import "./LinhaObra.css";
import { Link } from "react-router-dom";
import api from "../../../../services/api";
import { toast } from "react-toastify";

function LinhaObra({
  id,
  nome,
  artista,
  ano,
  categoria,
  nomeArquivo,
  arquivoBytes,
}) {
  // formatar ano
  let anoFinal = "N/A";
  if (ano) {
    let anoSplit = ano.split("T");
    let data = anoSplit[0];
    let anoSolto = data.split("-");
    anoFinal = anoSolto[2] + "/" + anoSolto[1] + "/" + anoSolto[0];
  }

  // states

  const [imagemUrl, setImagemUrl] = useState("");

  // handlers

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const response = await api.delete(`/obras/deletar/${id}`);
      window.location.reload();
    } catch (error) {
      toast.error("Erro ao deletar obra.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Erro ao deletar obra:", error);
    }
  }

  useEffect(() => {
    if (arquivoBytes && arquivoBytes.length > 0 && arquivoBytes[0] !== 0) {
      const bytesBrutos = new Uint8Array(arquivoBytes);
      const blob = new Blob([bytesBrutos], { type: "image/png" });
      const urlTemp = URL.createObjectURL(blob);

      setImagemUrl(urlTemp);
    }
  }, [arquivoBytes]);

  return (
    <tr>
      <td>
        {imagemUrl ? (
          <img id="linha_thumb" src={imagemUrl} alt={nomeArquivo} />
        ) : (
          <span className="text-muted">Sem Foto</span>
        )}
      </td>
      <td id="linha_nome">{nome}</td>
      <td id="linha_artista">{artista}</td>
      <td id="linha_ano">{anoFinal}</td>
      <td id="linha_categoria">{categoria}</td>
      <td className="align-middle">
        <div id="acoes_container" className="d-flex justify-content-center ">
          <Link to={`/obras/${id}`} className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
            </svg>
          </Link>
          <button className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="btn"
            data-bs-toggle="modal"
            data-bs-target={`#deleteModal-${id}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </button>
        </div>
        {/* Delete Modal */}
        <div
          className="modal fade"
          id={`deleteModal-${id}`}
          tabIndex="-1"
          aria-labelledby={`deleteModal-${id}`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={`deleteModalLabel-${id}`}>
                  Confirmar deletar obra
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Deseja realmente excluir a obra: <strong>{nome}</strong>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Voltar
                </button>
                <button
                  onClick={handleDelete}
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Sim tenho certeza
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default LinhaObra;
