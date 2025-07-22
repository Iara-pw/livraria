import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api";
import useCarrinho from "../context/useCarrinho";
import { useState, useEffect } from "react";

const Produto = () => {
  const { id } = useParams();
  const { adicionarAoCarrinho } = useCarrinho();
  const [livro, setLivro] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLivro = async () => {
      setLoading(true);
      setMensagem("");

      if (!id) {
        setMensagem("Nenhum ID de livro fornecido na URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/produtos/${id}`);
        setLivro(response.data);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) {
            setMensagem("Livro não encontrado.");
          } else if (err.response.status === 400) {
            setMensagem("ID de livro inválido.");
          } else {
            setMensagem("Erro ao carregar livro.");
          }
        } else if (err.request) {
          setMensagem("Servidor indisponível. Verifique sua conexão.");
        } else {
          setMensagem("Erro inesperado ao buscar o livro.");
        }
        setLivro(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLivro();
  }, [id]);

  if (loading) {
    return (
      <Wrapper>
        <p>Carregando detalhes do livro...</p>
      </Wrapper>
    );
  }

  if (!livro) {
    return (
      <Wrapper>
        <Mensagem>{mensagem || "Livro não encontrado."}</Mensagem>
      </Wrapper>
    );
  }

  const handleAdicionar = () => {
    adicionarAoCarrinho(livro);
    setMensagem("✔ Livro adicionado com sucesso!");

    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <Wrapper>
      <Card>
        {livro.imagem && <Capa src={livro.imagem} alt={livro.titulo} />}
        <Titulo>{livro.titulo}</Titulo>
        <Autor>{livro.autor}</Autor>
        <Descricao>{livro.descricao || "Descrição indisponível."}</Descricao>
        <Preco>R$ {livro.preco ? livro.preco.toFixed(2) : "0.00"}</Preco>
        <Botao onClick={handleAdicionar}>Adicionar ao carrinho</Botao>

        {mensagem && (
          <Mensagem destaque={mensagem.startsWith("✔")}>
            {mensagem}
            {mensagem.startsWith("✔") && (
              <div style={{ marginTop: "0.8rem" }}>
                <BotaoSecundario onClick={() => navigate("/catalogo")}>
                  🔙 Voltar ao Catálogo
                </BotaoSecundario>
                <BotaoSecundario onClick={() => navigate("/carrinho")}>
                  🛒 Ir para o Carrinho
                </BotaoSecundario>
              </div>
            )}
          </Mensagem>
        )}
      </Card>
    </Wrapper>
  );
};

export default Produto;

// Estilos
const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 2rem 3rem;
  text-align: center;
`;

const Card = styled.div`
  background: #ffffff;
  max-width: 700px;
  width: 100%;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #bcdff0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const Capa = styled.img`
  width: 180px;
  height: 260px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Titulo = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const Autor = styled.p`
  font-size: 1rem;
  margin-bottom: 0.8rem;
  color: #555;
`;

const Descricao = styled.p`
  font-size: 1rem;
  margin-bottom: 1.2rem;
`;

const Preco = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const Botao = styled.button`
  background-color: #99d6f2;
  color: #1e1e1e;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #b3eafc;
  }
`;

const BotaoSecundario = styled.button`
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: none;
  border-radius: 5px;
  margin-right: 1rem;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;

const Mensagem = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  color: ${({ destaque }) => (destaque ? "#2c7" : "#d9534f")};
  background-color: ${({ destaque }) => (destaque ? "#e7fff3" : "#ffe7e7")};
`;
