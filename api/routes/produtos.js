// routes/produtos.js
import express from "express";
import Livro from "../models/Livro.js";

const router = express.Router();

// GET - listar todos os livros
router.get("/", async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar livros" });
  }
});

// POST - cadastrar novo livro
router.post("/", async (req, res) => {
  try {
    const novoLivro = new Livro(req.body);
    await novoLivro.save();
    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao cadastrar livro" });
  }
});

export default router;
