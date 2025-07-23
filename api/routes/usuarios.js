import express from "express";
import Usuario from "../models/usuario.js";

const router = express.Router();

// Rota de cadastro de usuário
router.post("/", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se o email já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res
        .status(409)
        .json({ mensagem: "Este e-mail já está cadastrado." });
    }

    const novoUsuario = new Usuario({ nome, email, senha });
    await novoUsuario.save();

    res
      .status(201)
      .json({
        mensagem: "Usuário cadastrado com sucesso!",
        usuario: {
          id: novoUsuario._id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
        },
      });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res
      .status(500)
      .json({ mensagem: "Erro interno do servidor ao cadastrar usuário." });
  }
});

export default router;
