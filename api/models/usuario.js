import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Por favor, insira um e-mail válido",
    ],
  },
  senha: {
    type: String,
    required: true,
    minlength: 6,
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para hash da senha antes de salvar
usuarioSchema.pre("save", async function (next) {
  if (this.isModified("senha")) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

// Método para comparar a senha fornecida com a senha hash
usuarioSchema.methods.compararSenha = async function (senhaFornecida) {
  return await bcrypt.compare(senhaFornecida, this.senha);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
