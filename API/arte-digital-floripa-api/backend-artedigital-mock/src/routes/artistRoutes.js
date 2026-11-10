import { Router } from "express";
import prisma from "../libs/prisma.js";

const router = Router();

// rota para buscar todos os artistas /api/artists/

router.get("/", async (req, res) => {
  try {
    const artists = await prisma.artists.findMany({
      include: { artworks: true },
    });
    res.status(200).json(artists);
  } catch (error) {
    console.error("Erro ao buscar artistas: ", error);
    res.status(500).json({ error: "Erro ao buscar artistas" });
  }
});

// rota para buscar um artista em especifico /api/artistas/<id>

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.artists.findUnique({
      where: { id: id },
      include: { artworks: true },
    });

    // verifica se o artista existe

    if (!result) {
      return res.status(404).json({
        error: "Artista não encontrado",
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar artista: ", error);
    res.status(500).json({ error: "Erro ao busca artista" });
  }
});

router.get("/:id/artworks", async (req, res) => {
  const { id } = req.params;
  try {

    // procura no banco todas as obras com o mesmo id de artista

    const result = await prisma.artworks.findMany({
      where: { artist_id: id },
    });

    // retorna o resultado da "query"

    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar obras do artista: ", error);
    res.status(500).json({ error: "Erro ao buscar obras do artista" });
  }
});

export default router;
