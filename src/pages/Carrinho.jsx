import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useCarrinho from "../context/useCarrinho";
import useAuth from "../context/useAuth";
import { useState } from "react";

const Wrapper = styled.main`
  padding: 6rem 2rem 3rem;
  background-color: #f4faff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Titulo = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1e1e1e;
`;

const Lista = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  gap: 1rem;
`;

const Item = styled.div`
  background: #ffffff;
  border: 1px solid #bcdff0;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const TituloLivro = styled.p`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.2rem;
`;

const Preco = styled.p`
  color: #333;
`;

const BotaoRemover = styled.button`
  background-color: #f88;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e66;
  }
`;

const Total = styled.h3`
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #1e1e1e;
`;

const BotaoFinalizar = styled.button`
  background-color: #99d6f2;
  color: #1e1e1e;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 6px;
  margin-top: 1rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #b3eafc;
  }
`;

const MensagemErro = styled.div`
  background-color: #ffe0e0;
  color: #c00;
  border: 1px solid #ffcccc;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  max-width: 600px;
  text-align: center;
  font-weight: bold;
`;

const Carrinho = () => {
  const [mensagemErro, setMensagemErro] = useState("");
  const { carrinho, removerDoCarrinho } = useCarrinho();
  const { autenticado } = useAuth();
  const navigate = useNavigate();

  const total = carrinho.reduce((acc, livro) => acc + livro.preco, 0);

  const finalizarCompra = () => {
    if (!autenticado) {
      setMensagemErro(
        "Você precisa estar logado para finalizar a compra. REDIRECIONANDO..."
      );
      setTimeout(() => {
        setMensagemErro("");
        navigate("/login");
      }, 3000);
      return;
    }

    alert("Compra finalizada com sucesso! ✨");
    // Aqui você pode limpar o carrinho, se quiser
  };

  return (
    <Wrapper>
      <Titulo>Seu Carrinho</Titulo>

      {mensagemErro && <MensagemErro>{mensagemErro}</MensagemErro>}

      {carrinho.length === 0 ? (
        <>
          <p>O carrinho está vazio 🛒</p>
          <BotaoFinalizar onClick={() => navigate("/catalogo")}>
            Voltar ao Catálogo
          </BotaoFinalizar>
        </>
      ) : (
        <>
          <Lista>
            {carrinho.map((livro, index) => (
              <Item key={index}>
                <Info>
                  <TituloLivro>{livro.titulo}</TituloLivro>
                  <Preco>R$ {livro.preco.toFixed(2)}</Preco>
                </Info>
                <BotaoRemover onClick={() => removerDoCarrinho(index)}>
                  Remover
                </BotaoRemover>
              </Item>
            ))}
          </Lista>

          <Total>Total: R$ {total.toFixed(2)}</Total>
          <BotaoFinalizar onClick={finalizarCompra}>
            Finalizar Compra
          </BotaoFinalizar>
        </>
      )}
    </Wrapper>
  );
};

export default Carrinho;
