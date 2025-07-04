import styled from "styled-components";
import { Link } from "react-router-dom";

const CatalogoWrapper = styled.main`
  min-height: 100vh;
  padding: 6rem 2rem 3rem;
  background-color: #f4faff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem 1rem;
  border: 1px solid #bcdff0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-4px);
  }

  h3 {
    font-size: 1.1rem;
    color: #1e1e1e;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.25rem 0;
    color: #333;
  }

  a {
    margin-top: 1rem;
    text-decoration: none;
  }

  button {
    background-color: #99d6f2;
    color: #1e1e1e;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #b3eafc;
    }
  }
`;

const livrosFake = [
  {
    id: "1",
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    preco: 19.9,
    descricao: "Uma fábula poética sobre amizade, solidão e amor.",
  },
  {
    id: "2",
    titulo: "A Revolução dos Bichos",
    autor: "George Orwell",
    preco: 24.9,
    descricao: "Uma crítica satírica ao totalitarismo contada por animais.",
  },
  {
    id: "3",
    titulo: "Orgulho e Preconceito",
    autor: "Jane Austen",
    preco: 34.9,
    descricao: "Romance clássico que explora relações e julgamentos sociais.",
  },
  {
    id: "4",
    titulo: "Caminhos da Imaginação",
    autor: "Lucas Fernandes",
    preco: 44.9,
  },
  {
    id: "5",
    titulo: "O Som do Silêncio",
    autor: "Carolina Mendes",
    preco: 25.0,
  },
  {
    id: "6",
    titulo: "Segredos da Montanha",
    autor: "Rafael Lima",
    preco: 42.5,
  },
  {
    id: "7",
    titulo: "Inspiração Infinita",
    autor: "Beatriz Duarte",
    preco: 38.7,
  },
  { id: "8", titulo: "O Tempo das Flores", autor: "Marina Costa", preco: 31.2 },
  { id: "9", titulo: "Luz na Nevoa", autor: "Daniel Oliveira", preco: 36.0 },
  {
    id: "10",
    titulo: "A Biblioteca do Fim do Mundo",
    autor: "Fernanda Reis",
    preco: 49.9,
  },
];

// Adicione mais livros aqui

const Catalogo = () => {
  return (
    <CatalogoWrapper>
      <h2>Catálogo</h2>
      <Grid>
        {livrosFake.map((livro) => (
          <Card key={livro.id}>
            <h3>{livro.titulo}</h3>
            <p>{livro.autor}</p>
            <p>R$ {livro.preco.toFixed(2)}</p>
            <Link to={`/produto/${livro.id}`}>
              <button>Ver mais</button>
            </Link>
          </Card>
        ))}
      </Grid>
    </CatalogoWrapper>
  );
};

export default Catalogo;
