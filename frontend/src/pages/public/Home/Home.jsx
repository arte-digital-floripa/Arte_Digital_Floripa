import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

// Componentes

import Hero from "./components/Hero/Hero";
import ObrasContainer from "./components/ObrasContainer/ObrasContainer";

function Home() {
  const location = useLocation();

  useEffect(() => {
    const msg = location.state?.msg;

    if (msg) {
      toast.success(msg, {
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
  }, [location.state]);

  return (
    <>
      {/* hero */}
      <Hero />
      {/* Obras */}
      <ObrasContainer />
      {/* Footer */}
    </>
  );
}

export default Home;
