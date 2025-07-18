// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // ou sua URL pública depois
});

export default api;
