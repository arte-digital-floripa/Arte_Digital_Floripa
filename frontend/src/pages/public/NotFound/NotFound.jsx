import { useState, useEffect } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div class="custom-bg text-dark">
        <div class="d-flex align-items-center justify-content-center min-vh-100 px-2">
          <div class="text-center">
            <h1 class="display-1 fw-bold">404</h1>
            <p class="fs-2 fw-medium mt-4">Opa! pagina não encontrada.</p>
            <p class="mt-4 mb-5">
                A pagina que voce está procurando não existe ou não foi encontrada...
            </p>
            <Link
              to="/"
              class="btn btn-light fw-semibold rounded-pill px-4 py-2 custom-btn"
            >
              Volte para o inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
