import "./Hero.css";

function Hero() {
  return (
    <>
      <div className=" px-4 py-5 text-center" id="hero_container">
        <h1 id="titulo_hero" className="fw-bold text-black">
          Acervo Digital da <br />
          Fundação Franklin <br />
          Cascaes
        </h1>
        <div className="col-lg-12 mx-auto" id="descricao_container">
          <p className="text-secondary" id="descricao_hero">
            Explore a coleção de obras do artista catarinese, patrimônio
            cultural de Florianópolis.
          </p>
        </div>
      </div>
    </>
  );
}

export default Hero;
