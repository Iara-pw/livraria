import { useParams } from "react-router-dom";
import styled from "styled-components";
import useCarrinho from "../context/useCarrinho";
import { useState } from "react";

// Importe as imagens dos livros (somente os que têm capa local)
import OPequenoPrincipe from "../assets/OPequenoPrincipe.jpg";
import ARevolucaoBichos from "../assets/ARevolucaoBichos.jpg";
import orgulho_e_preconceito from "../assets/orgulho_e_preconceito.webp";

const livros = [
  {
    id: "1",
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    preco: 29.9,
    descricao: "Uma fábula poética sobre amizade, solidão e amor.",
    capa: OPequenoPrincipe,
  },
  {
    id: "2",
    titulo: "A Revolução dos Bichos",
    autor: "George Orwell",
    preco: 24.9,
    descricao: "Uma crítica satírica ao totalitarismo contada por animais.",
    capa: ARevolucaoBichos,
  },
  {
    id: "3",
    titulo: "Orgulho e Preconceito",
    autor: "Jane Austen",
    preco: 34.9,
    descricao: "Romance clássico que explora relações e julgamentos sociais.",
    capa: orgulho_e_preconceito,
  },
  {
    id: "4",
    titulo: "Caminhos da Imaginação",
    autor: "Lucas Fernandes",
    preco: 44.9,
    descricao: "Uma jornada fantástica por mundos interiores e criativos.",
  },
  {
    id: "5",
    titulo: "O Som do Silêncio",
    autor: "Carolina Mendes",
    preco: 25.0,
    descricao: "Um romance sensível sobre introspecção, música e memória.",
  },
  {
    id: "6",
    titulo: "Segredos da Montanha",
    autor: "Rafael Lima",
    preco: 42.5,
    descricao: "Mistério e aventura em um refúgio cercado por neblina.",
  },
  {
    id: "7",
    titulo: "Inspiração Infinita",
    autor: "Beatriz Duarte",
    preco: 38.7,
    descricao: "Crônicas e ensaios sobre arte, criatividade e imaginação.",
  },
  {
    id: "8",
    titulo: "O Tempo das Flores",
    autor: "Marina Costa",
    preco: 31.2,
    descricao: "Poesias que celebram as estações, os ciclos e os recomeços.",
  },
  {
    id: "9",
    titulo: "Luz na Nevoa",
    autor: "Daniel Oliveira",
    preco: 36.0,
    descricao: "Suspense emocional em uma cidade onde nada é o que parece.",
  },
  {
    id: "10",
    titulo: "A Biblioteca do Fim do Mundo",
    autor: "Fernanda Reis",
    preco: 49.9,
    descricao: "Uma fantasia sobre livros que guardam segredos do universo.",
  },
];

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

const Produto = () => {
  const { id } = useParams();
  const livro = livros.find((livro) => livro.id === id);
  const { adicionarAoCarrinho } = useCarrinho();
  const [mensagem, setMensagem] = useState(false);

  if (!livro) {
    return (
      <Wrapper>
        <p>Livro não encontrado 😢</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Card>
        {livro.capa && <Capa src={livro.capa} alt={livro.titulo} />}
        <Titulo>{livro.titulo}</Titulo>
        <Autor>{livro.autor}</Autor>
        <Descricao>{livro.descricao || "Descrição indisponível."}</Descricao>
        <Preco>R$ {livro.preco.toFixed(2)}</Preco>
        <Botao
          onClick={() => {
            adicionarAoCarrinho(livro); // adiciona ao carrinho
            setMensagem(true); // ativa a mensagem

            // apaga a mensagem após 2 segundos
            setTimeout(() => {
              setMensagem(false);
            }, 2000);
          }}
        >
          Adicionar ao carrinho
          {mensagem && (
            <p
              style={{
                color: "#2c7",
                marginBottom: "1rem",
                fontWeight: "bold",
              }}
            >
              ✔ Livro adicionado com sucesso!
            </p>
          )}
        </Botao>
      </Card>
    </Wrapper>
  );
};

export default Produto;
