import { useState, Fragment } from "react";
import "./ObrasContainer.css";
import mockObras from "../../../../data/mockObras";
import Card from "../../../../components/Card/Card.jsx";

function ObrasContainer() {
  const [tituloInput, setTituloInput] = useState("");
  const [filtro, setFiltro] = useState({
    categoria: "todos",
    titulo: "",
  });

  function handleCategoria(e) {
    setFiltro((filtroAnterior) => ({
      ...filtroAnterior,
      categoria: e.target.value,
    }));
  }

  function handleProcurar(e) {
    e.preventDefault();
    setFiltro((filtroAnterior) => ({
      ...filtroAnterior,
      titulo: tituloInput,
    }));
  }

  function handleProcInput(e) {
    setTituloInput(e.target.value);
  }

  // Filtragem puramente local
  const obrasFiltradas = mockObras.filter((obra) => {
    const matchCategoria =
      filtro.categoria === "todos" ||
      obra.categoria.toLowerCase() === filtro.categoria.toLowerCase();
    const matchTitulo =
      !filtro.titulo ||
      obra.titulo.toLowerCase().includes(filtro.titulo.toLowerCase()) ||
      obra.autor.toLowerCase().includes(filtro.titulo.toLowerCase());
    return matchCategoria && matchTitulo;
  });

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center" id="search_container">
        <form className="d-flex justify-content-center align-items-center" role="search" onSubmit={handleProcurar}>
          <button
            id="botao_procurar"
            className="btn"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
          <input
            className="form-control"
            id="search_input"
            type="search"
            placeholder="Buscar obras ou autores..."
            aria-label="Search"
            onChange={handleProcInput}
            value={tituloInput}
          />
        </form>
      </div>

      <div id="obras_container">
        <div id="container_interno">
          <div id="botao_tipo" className="d-flex justify-content-center flex-wrap gap-3">
            {[
              { id: "radioTodos", value: "todos", label: "Todos" },
              { id: "radioPintura", value: "pintura", label: "Pintura" },
              { id: "radioEscultura", value: "escultura", label: "Escultura" },
              { id: "radioGravura", value: "gravura", label: "Gravura" },
              { id: "radioDesenho", value: "desenho", label: "Desenho" },
            ].map((cat) => (
              <Fragment key={cat.id}>
                <input
                  type="radio"
                  className="btn-check"
                  name="filtroObra"
                  id={cat.id}
                  value={cat.value}
                  checked={filtro.categoria === cat.value}
                  onChange={handleCategoria}
                />
                <label
                  className="btn filtro_botao"
                  htmlFor={cat.id}
                >
                  {cat.label}
                </label>
              </Fragment>
            ))}
          </div>

          <div
            id="obras_cards"
            className="d-flex flex-wrap p-4 gap-4 justify-content-center"
          >
            {obrasFiltradas.length > 0 ? (
              obrasFiltradas.map((obra) => (
                <Card
                  id={obra.id}
                  foto={obra.foto}
                  titulo={obra.titulo}
                  descricao={obra.descricao}
                  key={obra.id}
                />
              ))
            ) : (
              <div className="text-center py-5 w-100">
                <p className="text-muted fs-5">Nenhuma obra encontrada para essa busca.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ObrasContainer;
