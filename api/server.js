// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import produtosRouter from "./routes/produtos.js";
import usuariosRouter from "./routes/usuarios.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🛜 Conectado ao MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ Erro na conexão com o banco:", err);
  });

// Rotas
app.use("/produtos", produtosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/auth", authRouter);

// Rota raiz (teste rápido)
app.get("/", (req, res) => {
  res.send("📘 API da Livraria está viva!");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
