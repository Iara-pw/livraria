import styled from "styled-components";
import { Link } from "react-router-dom";
import OPequenoPrincipe from "../assets/OPequenoPrincipe.jpg";
import ARevolucaoBichos from "../assets/ARevolucaoBichos.jpg";
import orgulho_e_preconceito from "../assets/orgulho_e_preconceito.webp";

const HomeWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4faff;
  padding: 6rem 1rem 3rem;
`;

const Banner = styled.section`
  background-color: #cce7f6;
  border-radius: 12px;
  padding: 4rem 2rem;
  width: 100%;
  max-width: 900px;
  margin-bottom: 3rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Titulo = styled.h1`
  font-size: 2.5rem;
  color: #1e1e1e;
  margin-bottom: 1rem;
`;

const Subtitulo = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: #99d6f2;
  color: #1e1e1e;
  border: none;
  padding: 0.8rem 1.4rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #b3eafc;
  }
`;

const Destaques = styled.section`
  width: 100%;
  max-width: 1000px;
  text-align: center;
`;

const TituloSessao = styled.h2`
  font-size: 1.8rem;
  color: #1e1e1e;
  margin-bottom: 2rem;
`;

const GradeLivros = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const CardLivro = styled.div`
  background: #ffffff;
  width: 220px;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #bcdff0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s;
  min-height: 330px; /* ajustável */
  justify-content: space-between;
  height: 100%;

  h3 {
    font-size: 0.95rem;
    text-align: center;
    line-height: 1.2;
    height: 2.4rem;
    overflow: hidden;
  }

  p {
    margin: 0.2rem 0;
    font-size: 0.9rem;
  }

  button {
    margin-top: 0.8rem;
    background-color: #99d6f2;
    color: #1e1e1e;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

const livrosDestaque = [
  {
    id: "1",
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    preco: 29.9,
    capa: OPequenoPrincipe,
  },
  {
    id: "2",
    titulo: "A Revolução dos Bichos",
    autor: "George Orwell",
    preco: 24.9,
    capa: ARevolucaoBichos,
  },
  {
    id: "3",
    titulo: "Orgulho e Preconceito",
    autor: "Jane Austen",
    preco: 34.9,
    capa: orgulho_e_preconceito,
  },
];

const Home = () => {
  return (
    <HomeWrapper>
      <Banner>
        <Titulo>Bem-vindo à Livraria Alkmim, Baldez, Versiane 💙</Titulo>
        <Subtitulo>
          Onde cada página é um novo começo — escolha o seu próximo livro agora
          mesmo.
        </Subtitulo>
        <Link to="/catalogo">
          <Button>Explorar catálogo</Button>
        </Link>
      </Banner>

      <Destaques>
        <TituloSessao>Destaques da Semana</TituloSessao>
        <GradeLivros>
          {livrosDestaque.map((livro) => (
            <CardLivro key={livro.id}>
              <img
                src={livro.capa}
                alt={livro.titulo}
                style={{
                  width: "120px",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "0.8rem",
                }}
              />

              <h3>{livro.titulo}</h3>
              <p>{livro.autor}</p>
              <p>R$ {livro.preco.toFixed(2)}</p>
              <Link to={`/produto/${livro.id}`}>
                <button>Ver mais</button>
              </Link>
            </CardLivro>
          ))}
        </GradeLivros>
      </Destaques>
    </HomeWrapper>
  );
};

export default Home;
