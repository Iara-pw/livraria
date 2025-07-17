import express from "express";
import fs from "fs";
const router = express.Router();
const USERS_PATH = "./data/usuarios.json";

router.post("/", (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Campos obrigatórios" });
  }

  const lista = JSON.parse(fs.readFileSync(USERS_PATH));
  if (lista.find((u) => u.email === email)) {
    return res.status(409).json({ erro: "E-mail já cadastrado" });
  }

  lista.push({ nome, email, senha });
  fs.writeFileSync(USERS_PATH, JSON.stringify(lista, null, 2));
  res.status(201).json({ mensagem: "Usuário cadastrado" });
});

export default router;
