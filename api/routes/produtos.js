import express from "express";
import Livro from "../models/Livro.js";

const router = express.Router();

// GET - listar todos os livros
router.get("/", async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (err) {
    console.error("Erro ao buscar livros:", err);
    res.status(500).json({ erro: "Erro ao buscar livros" });
  }
});

// POST - cadastrar novo livro
router.post("/", async (req, res) => {
  try {
    console.log("📦 Body recebido:", req.body);
    const novoLivro = new Livro(req.body);
    await novoLivro.save();
    res.status(201).json(novoLivro);
  } catch (err) {
    console.error("Erro ao cadastrar livro:", err);
    res.status(400).json({ erro: "Erro ao cadastrar livro" });
  }
});

// GET - buscar livro por ID
router.get("/:id", async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) {
      console.warn(`Livro com ID ${req.params.id} não encontrado.`);
      return res.status(404).json({ erro: "Livro não encontrado" });
    }
    res.json(livro);
  } catch (error) {
    console.error(`Erro ao buscar livro por ID ${req.params.id}:`, error);

    // Erro comum: Cast to ObjectId failed (ID inválido)
    if (error.name === "CastError") {
      return res.status(400).json({ erro: "ID de livro inválido" });
    }
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

export default router;
