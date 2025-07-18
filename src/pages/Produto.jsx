// Produto.jsx
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../api"; // Certifique-se de que o caminho está correto
import useCarrinho from "../context/useCarrinho"; // Certifique-se de que o caminho está correto
import { useState, useEffect } from "react";

const Produto = () => {
  const { id } = useParams(); // Pega o 'id' da URL (ex: /produto/123 -> id = "123")
  const { adicionarAoCarrinho } = useCarrinho(); // Hook do seu contexto de carrinho
  const [livro, setLivro] = useState(null);
  const [mensagem, setMensagem] = useState(""); // Mensagens de sucesso ou erro para o usuário
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchLivro = async () => {
      setLoading(true); // Inicia o carregamento
      setMensagem(""); // Limpa mensagens anteriores

      if (!id) {
        setMensagem("Nenhum ID de livro fornecido na URL.");
        setLoading(false);
        return;
      }

      try {
        // A URL da requisição será: http://localhost:3001/produtos/ID_DO_LIVRO
        const response = await api.get(`/produtos/${id}`);
        setLivro(response.data);
        console.log("Dados do livro recebidos:", response.data); // Log para depuração
      } catch (err) {
        console.error("Erro ao buscar livro:", err);

        // Tratamento de erros mais robusto para o usuário
        if (err.response) {
          // Resposta do servidor (status de erro como 404, 400, 500)
          if (err.response.status === 404) {
            setMensagem("Livro não encontrado.");
          } else if (err.response.status === 400) {
            setMensagem("ID de livro inválido.");
          } else {
            setMensagem(
              `Erro ao carregar livro: ${
                err.response.statusText || "Erro no servidor"
              }`
            );
          }
        } else if (err.request) {
          // Requisição feita, mas sem resposta (servidor offline, rede)
          setMensagem(
            "Não foi possível conectar ao servidor. Verifique sua conexão ou se o servidor está online."
          );
        } else {
          // Erro na configuração da requisição
          setMensagem("Ocorreu um erro inesperado ao buscar o livro.");
        }
        setLivro(null); // Garante que o livro é nulo se houver erro
      } finally {
        setLoading(false); // Finaliza o carregamento, independentemente do sucesso/erro
      }
    };

    fetchLivro();
  }, [id]); // O efeito roda novamente se o ID da URL mudar

  if (loading) {
    return (
      <Wrapper>
        <p>Carregando detalhes do livro...</p>
      </Wrapper>
    );
  }

  // Se não houver livro (por exemplo, após um erro 404 ou 400)
  if (!livro) {
    return (
      <Wrapper>
        <p>{mensagem || "Livro não encontrado."}</p>
        {/* Você pode adicionar um botão para voltar ao catálogo aqui */}
        {/* <Link to="/catalogo"><button>Voltar ao Catálogo</button></Link> */}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Card>
        {livro.imagem && <Capa src={livro.imagem} alt={livro.titulo} />}
        <Titulo>{livro.titulo}</Titulo>
        <Autor>{livro.autor}</Autor>
        <Descricao>{livro.descricao || "Descrição indisponível."}</Descricao>
        <Preco>R$ {livro.preco ? livro.preco.toFixed(2) : "0.00"}</Preco>{" "}
        {/* Garante que preco.toFixed(2) só seja chamado se preco existir */}
        <Botao
          onClick={() => {
            adicionarAoCarrinho(livro);
            setMensagem("✔ Livro adicionado com sucesso!");
            setTimeout(() => setMensagem(""), 2000); // Limpa a mensagem após 2 segundos
          }}
        >
          Adicionar ao carrinho
        </Botao>
        {mensagem && (
          <p
            style={{
              color: mensagem.startsWith("✔") ? "#2c7" : "#d9534f",
              marginTop: "1rem",
            }}
          >
            {mensagem}
          </p>
        )}
      </Card>
    </Wrapper>
  );
};

export default Produto;

// Estilos (já estavam no seu código, sem alterações necessárias)
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
