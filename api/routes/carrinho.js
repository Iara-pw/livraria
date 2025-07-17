import express from "express";
import fs from "fs";
const router = express.Router();
const CARRINHO_PATH = "./data/carrinhos.json";

router.get("/", (req, res) => {
  const carrinho = JSON.parse(fs.readFileSync(CARRINHO_PATH));
  res.json(carrinho);
});

router.post("/", (req, res) => {
  const item = req.body;
  const carrinho = JSON.parse(fs.readFileSync(CARRINHO_PATH));
  carrinho.push(item);
  fs.writeFileSync(CARRINHO_PATH, JSON.stringify(carrinho, null, 2));
  res.status(201).json({ mensagem: "Item adicionado ao carrinho" });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let carrinho = JSON.parse(fs.readFileSync(CARRINHO_PATH));
  carrinho = carrinho.filter((item) => item.id !== id);
  fs.writeFileSync(CARRINHO_PATH, JSON.stringify(carrinho, null, 2));
  res.status(200).json({ mensagem: "Item removido" });
});

export default router;
