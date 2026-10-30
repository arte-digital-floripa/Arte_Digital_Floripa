import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <span className="not-found-code">404</span>
      <h1 className="not-found-title">Pagina nao encontrada</h1>
      <p className="not-found-desc">
        O endereco que voce tentou acessar nao existe ou foi movido dentro do
        acervo.
      </p>
      <Link to="/" className="btn btn-primary">
        Voltar para a Pagina Inicial
      </Link>
    </div>
  );
}