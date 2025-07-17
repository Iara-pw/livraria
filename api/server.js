// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import usuariosRoutes from "./routes/usuarios.js";
import loginRoutes from "./routes/login.js";
import produtosRoutes from "./routes/produtos.js";
import carrinhoRoutes from "./routes/carrinho.js";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "*" })); // 🌐 habilita CORS para todas as origens
app.use(bodyParser.json());

app.use("/usuarios", usuariosRoutes);
app.use("/login", loginRoutes);
app.use("/produtos", produtosRoutes);
app.use("/carrinho", carrinhoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send("API da Livraria está viva! 💙");
});
app.use("/favicon.ico", express.static("favicon.ico"));
