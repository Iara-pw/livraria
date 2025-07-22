import { useState } from "react";
import CarrinhoContext from "./CarrinhoContext";

const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (livro) => {
    setCarrinho((prev) => [...prev, livro]);
  };

  const removerDoCarrinho = (index) => {
    setCarrinho((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <CarrinhoContext.Provider
      value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export default CarrinhoProvider;
