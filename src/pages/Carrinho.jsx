import { useCarrinho } from "../context/CarrinhoContext";

const Carrinho = () => {
  const { carrinho } = useCarrinho();
  console.log("Carrinho atual:", carrinho);

  return (
    <div>
      <h2>Seu Carrinho</h2>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio 🛒</p>
      ) : (
        carrinho.map((livro, index) => (
          <div key={index}>
            <p>{livro.titulo}</p>
            <p>R$ {livro.preco.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Carrinho;
