import { Router } from "express";
import prisma from '../libs/prisma.js';

const router = Router();

// rota para buscar todos as obras /api/artwork/

router.get("/", async (req, res) => {
  try {
    const result = await prisma.artworks.findMany();
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar obras: ", error);
    res.status(500).json({ error: "Erro ao buscar obras" });
  }
});

// rota para buscar uma obra em especifico /api/artwork/<id>

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.artworks.findUnique({
      where: { id: id },
    });

    // verifica se o artista existe

    if (!result) {
      return res.status(404).json({
        error: "Obra não encontrada",
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar artista: ", error);
    res.status(500).json({ error: "Erro ao busca obra" });
  }
});

export default router;