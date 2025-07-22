// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import produtosRoutes from "./routes/produtos.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
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
app.use("/produtos", produtosRoutes);

// Rota raiz (teste rápido)
app.get("/", (req, res) => {
  res.send("📘 API da Livraria está viva!");
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
