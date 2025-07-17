import express from "express";
import fs from "fs";
const router = express.Router();
const PRODUTOS_PATH = "./data/produtos.json";

router.get("/", (req, res) => {
  const produtos = JSON.parse(fs.readFileSync(PRODUTOS_PATH));
  res.json(produtos);
});

export default router;
