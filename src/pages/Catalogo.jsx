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

    imagem: "/imagens/OPequenoPrincipe.jpg",
  },
  {
    id: "2",
    titulo: "A Revolução dos Bichos",
    autor: "George Orwell",
    preco: 24.9,

    imagem: "/imagens/ARevolucaoBichos.jpg",
  },
  {
    id: "3",
    titulo: "Orgulho e Preconceito",
    autor: "Jane Austen",
    preco: 34.9,
    imagem: "/imagens/orgulho_e_preconceito.webp",
  },
  {
    id: "4",
    titulo: "É Assim Que Acaba",
    autor: "Colleen Hoover",
    preco: 37.0,
    imagem: "/imagens/EAssimQueAcaba.jpg",
  },
  {
    id: "5",
    titulo: "A Garota do Lago",
    autor: "Charlie Donlea",
    preco: 15.0,
    imagem: "/imagens/AGarotaLago.jpg",
  },
  {
    id: "6",
    titulo: "Deixada para Trás",
    autor: "Charlie Donlea",
    preco: 28.0,
    imagem: "/imagens/DeixadaParaTras.jpg",
  },
  {
    id: "7",
    titulo: "Todas as Suas (Im)Perfeições",
    autor: "Colleen Hoover",
    preco: 38.0,
    imagem: "/imagens/TodasImperfeicoes.jpg",
  },
  {
    id: "8",
    titulo: "A Empregada",
    autor: "Freida McFadden",
    preco: 31.2,
    imagem: "/imagens/AEmpregada.jpg",
  },
  {
    id: "9",
    titulo: "A Seleção",
    autor: "Kiera Cass",
    preco: 36.0,
    imagem: "/imagens/ASelecao.jpg",
  },
  {
    id: "10",
    titulo: "A Biblioteca da Meia-Noite",
    autor: "Matt Haig",
    preco: 36.0,
    imagem: "/imagens/BibliotecaMeiaNoite.jpg",
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
            <img
              src={livro.imagem}
              alt={`Capa do livro ${livro.titulo}`}
              style={{
                width: "120px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "6px",
                marginBottom: "1rem",
              }}
            />
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
