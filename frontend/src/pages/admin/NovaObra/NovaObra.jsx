import { useEffect, useState, useRef } from "react";
import "./NovaObra.css";
import LinhaObra from "./components/LinhaObra/LinhaObra.jsx";
import api from "../../../services/api.js";
import { toast } from "react-toastify";

function NovaObra() {
  // states
  const [me, setMe] = useState(null);
  const [obras, setObras] = useState([]);

  const [filtros, setFiltros] = useState({
    titulo: "",
    categoria: "",
    ano: "",
  });

  const [novaObra, setNovaObra] = useState({
    titulo: "",
    categoria: "",
    ano: "",
    descricao: "",
    nomeArquivo: "",
    arquivoBytes: [],
  });

  // referencias

  const inputImagemRef = useRef(null);

  // handlers para procurar obras

  function handleTitulo(e) {
    setFiltros((filtroAnterior) => ({
      ...filtroAnterior,
      titulo: e.target.value,
    }));
  }

  function handleCategoria(e) {
    if (e.target.value === "todos") {
      setFiltros((filtroAnterior) => ({
        ...filtroAnterior,
        categoria: "",
      }));
    } else {
      setFiltros((filtroAnterior) => ({
        ...filtroAnterior,
        categoria: e.target.value,
      }));
    }
  }

  function handleAno(e) {
    setFiltros((filtroAnterior) => ({
      ...filtroAnterior,
      ano: e.target.value,
    }));
  }

  function handleLimpar(e) {
    e.preventDefault();
    setFiltros({
      titulo: "",
      categoria: "",
      ano: "",
    });
  }

  // handlers cadastrar obras

  function handleTituloCadastro(e) {
    setNovaObra((anterior) => ({
      ...anterior,
      titulo: e.target.value,
    }));
  }

  function handleCategoriaCadastro(e) {
    setNovaObra((anterior) => ({
      ...anterior,
      categoria: e.target.value,
    }));
  }

  function handleAnoCadastro(e) {
    setNovaObra((anterior) => ({
      ...anterior,
      ano: e.target.value,
    }));
  }

  function handleDescricaoCadastro(e) {
    setNovaObra((anterior) => ({
      ...anterior,
      descricao: e.target.value,
    }));
  }

  function handleArquivo(e) {
    const arquivoSelecionado = e.target.files[0];

    if (arquivoSelecionado) {
      const leitor = new FileReader();

      leitor.onload = (evento) => {
        const bufferDeImagem = evento.target.result;
        const bytesUint8 = new Uint8Array(bufferDeImagem);
        const arrayDeBytes = Array.from(bytesUint8);

        setNovaObra((anterior) => ({
          ...anterior,
          nomeArquivo: arquivoSelecionado.name,
          arquivoBytes: arrayDeBytes,
        }));
      };
      leitor.readAsArrayBuffer(arquivoSelecionado);
    }
  }

  // resgatar dados do usuario logado ao montar o componente
  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await api.get("/auth/me");
        setMe(response.data.usuario);
      } catch (error) {
        console.error("Erro ao carregar usuário logado:", error);
        toast.error("Erro ao buscar informações do usuário logado. Por favor, faça login novamente.");
      }
    }
    fetchMe();
  }, []);

  // handler de salvar uma obra

  async function handleSalvarObra(e) {
    e.preventDefault();

    if (!me?.id_cadastro) {
      toast.error("Usuário logado não identificado. Por favor, faça login novamente.", {
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
      const payload = {
        titulo: novaObra.titulo,
        data: novaObra.ano ? `${novaObra.ano}-01-01` : "2026-06-07",
        descricao: novaObra.descricao,
        categoria: novaObra.categoria,
        midias3d: [
          {
            nome_arquivo: novaObra.nomeArquivo || "./img/1.png",
            arquivo:
              novaObra.arquivoBytes.length > 0 ? novaObra.arquivoBytes : [0],
          },
        ],
        usuariosIds: [me.id_cadastro],
        autoresIds: [1],
      };

      const response = await api.post("/obras/criar", payload);

      toast.success("Obra cadastrada com sucesso!");

      console.log(response.data);

      setNovaObra({
        titulo: "",
        categoria: "",
        ano: "",
        descricao: "",
        nomeArquivo: "",
      });

      if (inputImagemRef.current) inputImagemRef.current.value = "";

      setFiltros((ant) => ({ ...ant }));
    } catch (error) {
      console.error("Erro ao cadastrar:", error.response?.data);
      toast.error("Erro ao salvar a nova obra.", {
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



  // resgatar obras

  useEffect(() => {
    async function fetchObras() {
      try {
        const parametros = {};

        // verificando e montando os parametros da request

        if (filtros.titulo) parametros.titulo = filtros.titulo;
        if (filtros.categoria) parametros.categoria = filtros.categoria;
        if (filtros.ano) parametros.ano = filtros.ano;

        const response = await api.get(`/obras/listar`, {
          params: parametros,
        });

        setObras(response.data || []);
        console.log(response.data)
      } catch (error) {
        toast.error("Erro ao buscar obras.", {
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
    fetchObras();
  }, [filtros]);

  return (
    <>
      <main>
        <div id="container_obras_no" className="container mt-4">
          <div
            id="container_procura"
            className="d-flex justify-content-between"
          >
            {/* input - procurar */}
            <div>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  id="procurar_obra"
                  className="form-control"
                  type="search"
                  placeholder="Buscar obra..."
                  onChange={handleTitulo}
                  value={filtros.titulo}
                />
              </form>
            </div>

            {/* Input - categoria */}
            <div>
              <select
                onChange={handleCategoria}
                value={filtros.categoria}
                className="form-select"
                id="categoria_select"
              >
                <option value="todos">Categoria</option>
                <option value="pintura">Pintura</option>
                <option value="escultura">Escultura</option>
                <option value="gravura">Gravura</option>
                <option value="desenho">Desenho</option>
              </select>
            </div>

            {/* input - ano */}
            <div>
              <select
                className="form-select"
                id="ano_select"
                value={filtros.ano}
                onChange={handleAno}
              >
                <option defaultValue>Ano</option>
                <option value="1950">1950</option>
                <option value="1997">1997</option>
                <option value="2026">2026</option>
              </select>
            </div>

            {/* botão - limpar filtros */}
            <button
              id="limpar_filtros"
              onClick={handleLimpar}
              type="button"
              className="btn d-flex justify-content-center align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-repeat me-2"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                <path
                  fillRule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                />
              </svg>
              Limpar filtros
            </button>

            {/* botão - nova obra */}
            <button
              id="btn_nova_obra"
              type="button"
              className="btn btn-dark d-flex justify-content-center align-items-center"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="currentColor"
                className="bi bi-plus me-2"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              Nova obra
            </button>
          </div>

          {/* resultados */}
          <div id="container_resultado">
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">Imagem</th>
                  <th scope="col">Nome da Obra</th>
                  <th scope="col">Artista</th>
                  <th scope="col">Ano</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {obras.map((obra) => (
                  <LinhaObra
                    id={obra.id_obra}
                    nome={obra.titulo}
                    artista={obra.autor_acervo?.[0]?.autor.nome_publico}
                    ano={obra.data_criacao}
                    categoria={obra.categoria}
                    nomeArquivo={obra.midias3d?.[0]?.nome_arquivo}
                    arquivoBytes={obra.midias3d?.[0]?.arquivo?.data || obra.midias3d?.[0]?.arquivo}
                    key={obra.id_obra}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* <!-- offcanvas menu --> */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 id="titulo_no" className="offcanvasMenuLabel">
            Nova Obra
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <p id="sub_titulo_no" className="ms-3">
          Preencha os dados da obra
        </p>
        <div className="offcanvas-body d-flex flex-column">
          {/* input - file */}
          <div className="mb-5 d-flex flex-column">
            <label
              htmlFor="btn_modal_no"
              className="form-label titulo_item_no mb-4"
            >
              Imagem da Obra
            </label>
            <div className="input-group mb-3">
              <input
                type="file"
                id="img_no"
                className="form-control"
                onChange={handleArquivo}
                ref={inputImagemRef}
              />
            </div>
          </div>

          {/* input - nome */}
          <div className="mb-4">
            <label htmlFor="nome_no" className="form-label titulo_item_no">
              Nome da obra
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="nome_no"
                placeholder="Ex: Noite Estrelada"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={handleTituloCadastro}
                value={novaObra.titulo}
              />
            </div>
          </div>

          {/* input - categoria */}
          <div className="mb-4">
            <label htmlFor="categoria_no" className="form-label titulo_item_no">
              Categoria
            </label>
            <div className="input-group">
              <select
                onChange={handleCategoriaCadastro}
                value={novaObra.categoria}
                className="form-select"
                id="categoria_no"
              >
                <option value="">Selecione a categoria</option>
                <option value="pintura">Pintura</option>
                <option value="escultura">Escultura</option>
                <option value="gravura">Gravura</option>
                <option value="desenho">Desenho</option>
              </select>
            </div>
          </div>

          {/* input - Ano */}
          <div className="mb-4">
            <label htmlFor="ano_no" className="form-label titulo_item_no">
              Ano
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="ano_no"
                placeholder="Ex: 1997"
                aria-describedby="basic-addon3 basic-addon4"
                value={novaObra.ano}
                onChange={handleAnoCadastro}
              />
            </div>
          </div>

          {/* input - Descriçao */}
          <div className="mb-4">
            <label htmlFor="descricao_no" className="form-label titulo_item_no">
              Descrição
            </label>
            <div className="input-group">
              <textarea
                id="descricao_no"
                className="form-control"
                aria-label="With textarea"
                placeholder="Descrição da obra"
                onChange={handleDescricaoCadastro}
                value={novaObra.descricao}
              ></textarea>
            </div>
          </div>

          <div id="salvar_btn" className="mb-3 ms-auto">
            <button className="btn" onClick={handleSalvarObra}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NovaObra;
