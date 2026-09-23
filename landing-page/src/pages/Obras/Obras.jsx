import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Obras.css";
import mockObras from "../../data/mockObras";

function Obras() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [obra, setObra] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Busca a obra localmente usando o ID da rota
    const obraEncontrada = mockObras.find((item) => item.id === Number(id));
    setObra(obraEncontrada || null);
    setCarregando(false);
  }, [id]);

  if (carregando) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!obra) {
    return (
      <div className="container py-5 text-center">
        <h1 className="fw-bold">Obra não encontrada</h1>
        <button className="btn btn-dark mt-3" onClick={() => navigate("/")}>
          Voltar para o Acervo
        </button>
      </div>
    );
  }

  // formatação da data
  let anoFinal = "";
  if (obra.ano) {
    let anoSplit = obra.ano.split("T");
    let data = anoSplit[0];
    let anoSolto = data.split("-");
    anoFinal = anoSolto[2] + "/" + anoSolto[1] + "/" + anoSolto[0];
  }

  return (
    <>
      <div id="main-container" className="d-flex flex-column animate-fadeIn">
        <div className="container-fluid d-flex justify-content-start my-3">
          <button className="btn btn-back-custom" onClick={() => navigate(-1)}>
            <img src="/img/voltar.png" id="voltar" alt="Voltar" />
          </button>
        </div>
        
        <div className="detail-hero-section d-flex align-items-center justify-content-center">
          {obra.foto && (
            <img src={obra.foto} alt={obra.titulo} id="imagem" className="shadow-lg" />
          )}
        </div>

        <div id="info_container" className="px-md-5 py-4">
          <div id="categorias" className="d-flex flex-row gap-2 mb-3">
            <span className="badge-categoria">
              {obra.categoria}
            </span>
          </div>

          <div id="autor_container" className="mb-4">
            <h1 id="titulo" className="fw-bold">{obra.titulo}</h1>
            <p id="autor" className="text-secondary">{obra.autor}</p>
          </div>

          <div id="info_tecnica" className="row gap-3 gap-md-4 align-items-center mb-4">
            <div id="ano" className="col-12 col-md py-3 px-4 shadow-sm text-center">
              <span className="info-label">Ano de Criação</span>
              <span className="info-value d-block mt-1">{anoFinal}</span>
            </div>
            <div id="tecnica" className="col-12 col-md py-3 px-4 shadow-sm text-center">
              <span className="info-label">Técnica Utilizada</span>
              <span className="info-value d-block mt-1">{obra.tecnica}</span>
            </div>
          </div>

          <div id="descricao_container" className="mt-4 p-4 rounded-4 shadow-sm bg-white border border-light">
            <h5 className="fw-bold pb-2 border-b border-light">Descrição da Obra</h5>
            <p id="descricao" className="text-muted mt-3">{obra.descricao}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Obras;
