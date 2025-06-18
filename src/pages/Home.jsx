import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.main`
  padding: 2rem;
  text-align: center;
`;

const Home = () => {
  return (
    <Container>
      <h1>Bem-vinda à Livraria da Iara 📘</h1>
      <p>Descubra seu próximo livro favorito com a gente!</p>
      <Link to="/catalogo">
        <button>Ver Catálogo</button>
      </Link>
    </Container>
  );
};

export default Home;
