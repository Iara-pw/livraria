import { useParams } from "react-router-dom";
import styled from "styled-components";

const livrosFake = [
  {
    id: "1",
    titulo: "A Arte da Leitura",
    autor: "Maria Borges",
    descricao: "Descubra os segredos da leitura apaixonante.",
    preco: 39.9,
  },
  {
    id: "2",
    titulo: "Entre Páginas",
    autor: "João Rocha",
    descricao: "Uma jornada mágica através das palavras.",
    preco: 29.9,
  },
];

const Wrapper = styled.main`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Produto = () => {
  const { id } = useParams();
  const livro = livrosFake.find((l) => l.id === id);

  if (!livro) return <p style={{ padding: "2rem" }}>Livro não encontrado.</p>;

  return (
    <Wrapper>
      <h1>{livro.titulo}</h1>
      <p>
        <strong>Autor:</strong> {livro.autor}
      </p>
      <p>{livro.descricao}</p>
      <h3>R$ {livro.preco.toFixed(2)}</h3>
      <button>Adicionar ao Carrinho</button>
    </Wrapper>
  );
};

export default Produto;
