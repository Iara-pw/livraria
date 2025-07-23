import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ mensagem: "Por favor, forneça e-mail e senha." });
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET || "seu_segredo_jwt_padrao",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      mensagem: "Login bem-sucedido!",
      token,
      usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res
      .status(500)
      .json({ mensagem: "Erro interno do servidor ao tentar fazer login." });
  }
});

export default router;
