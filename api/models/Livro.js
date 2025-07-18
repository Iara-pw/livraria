// models/Livro.js
import mongoose from "mongoose";

const LivroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  preco: Number,
  imagem: String,
});

const Livro = mongoose.model("Livro", LivroSchema);

export default Livro;
