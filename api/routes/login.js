import express from "express";
import fs from "fs";
const router = express.Router();
const USERS_PATH = "./data/usuarios.json";

router.post("/", (req, res) => {
  const { email, senha } = req.body;
  const usuarios = JSON.parse(fs.readFileSync(USERS_PATH));
  const user = usuarios.find((u) => u.email === email && u.senha === senha);

  if (!user) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  res.status(200).json({ mensagem: "Login bem-sucedido", nome: user.nome });
});

export default router;
