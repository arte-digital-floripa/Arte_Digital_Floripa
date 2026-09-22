import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { ToastContainer } from "react-toastify";

// Paginas
// Teste

import Home from "./pages/Home/Home";
import Obras from "./pages/Obras/Obras";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rotas publicas */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/obras/:id" element={<Obras />} />
          </Route>

        </Routes>
      </BrowserRouter>
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
    </>
  );
}

export default App;
