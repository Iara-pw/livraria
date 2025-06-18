import { useState } from "react";
import CarrinhoContext from "./CarrinhoContext";

const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  // Adicione aqui funções para manipular o carrinho, se necessário

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export default CarrinhoProvider;
