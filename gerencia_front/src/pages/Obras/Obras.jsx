import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Obras.css";
import api from "../../services/api";

function Obras() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [obra, setObra] = useState({
    titulo: "",
    arquivo: null,
    categoria: "",
    tecnica: "mock",
    autor: "",
    ano: "",
    descricao: "",
  });

  useEffect(() => {
    async function fetchObra() {
      try {
        setCarregando(true);
        const response = await api.get(`/obras/listar/${id}`);

        setObra({
          titulo: response.data.obra.titulo,
          arquivo: response.data.obra.midia3d?.[0]?.nome_arquivo || "",
          categoria: response.data.obra.categoria,
          tecnica: "mock",
          autor: response.data.obra.autor_acervo?.[0]?.autor.nome_publico || "",
          ano: response.data.obra.data_criacao,
          descricao: response.data.obra.descricao,
        });
      } catch (error) {
        toast.error("Erro ao buscar a obra", {
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
    fetchObra();
  }, [id]);

  // formatação da data

  let anoSplit = obra.ano.split("T");
  let data = anoSplit[0];
  let anoSolto = data.split("-");
  let anoFinal = anoSolto[2] + "/" + anoSolto[1] + "/" + anoSolto[0];

  if (!obra) {
    return <h1>Obra não encontrada</h1>;
  }

  return (
    <>
      <div id="main-container" className=" d-flex flex-column">
        <div className="container-fluid d-flex justify-content-start">
          <button className="btn" onClick={() => navigate(-1)}>
            <img src="/img/voltar.png" id="voltar" />
          </button>
        </div>
        {obra.arquivo && (
          <img src={obra.arquivo} alt={obra.titulo} id="imagem" />
        )}
        <div id="info_container" className="px-5">
          <div
            id="categorias"
            className="container-fluid d-flex flex-row gap-2"
          >
            <button type="button" className="btn">
              {obra.categoria}
            </button>
          </div>
          <div
            id="autor_container"
            className="container-fluid d-flex flex-column"
          >
            <p id="titulo">{obra.titulo}</p>
            <p id="autor">{obra.autor}</p>
          </div>
          <div
            id="info_tecnica"
            className="container-fluid row gap-4 align-items-center mb-4"
          >
            <div id="ano" className="col-5 py-3 px-5">
              <div className="row">Ano</div>
              <div className="row">{anoFinal}</div>
            </div>
            <div id="tecnica" className="col-5 py-3 px-5">
              <div className="row">Técnica</div>
              <div className="row">{obra.tecnica}</div>
            </div>
          </div>
          <div id="descricao_container">
            <h5 className="fw-bold">Descrição</h5>
            <p id="descricao">{obra.descricao}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Obras;
