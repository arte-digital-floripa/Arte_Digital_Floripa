import { Link } from "react-router-dom";
import "./Card.css";

function Card({ id, titulo, descricao, foto }) {
  // Limita a descrição no card para não quebrar o layout se for muito longa
  const descricaoCurta = descricao && descricao.length > 90
    ? `${descricao.substring(0, 90)}...`
    : descricao;

  return (
    <div className="card-custom shadow-sm border border-light">
      <div className="card-image-wrapper">
        <img src={foto} className="card-image" alt={titulo} />
      </div>
      <div className="card-content">
        <h5 className="card-title-custom">{titulo}</h5>
        <p className="card-desc-custom text-muted">{descricaoCurta}</p>
        <Link to={`/obras/${id}`} className="card-btn-custom">
          Ver detalhes 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right ms-2" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Card;
