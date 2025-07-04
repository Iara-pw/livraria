import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CarrinhoProvider } from "./context/CarrinhoContext";
// importe aqui

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CarrinhoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CarrinhoProvider>
  </React.StrictMode>
);
