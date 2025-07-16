import { useContext } from "react";
import CarrinhoContext from "./CarrinhoContext";

const useCarrinho = () => useContext(CarrinhoContext);
export default useCarrinho;
