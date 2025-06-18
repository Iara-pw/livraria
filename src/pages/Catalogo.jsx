import styled from "styled-components";
import { Link } from "react-router-dom";

const CatalogoWrapper = styled.main`
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: #fff;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
`;

const livrosFake = [
  { id: "1", titulo: "A Arte da Leitura", autor: "Maria Borges", preco: 39.9 },
  { id: "2", titulo: "Entre Páginas", autor: "João Rocha", preco: 29.9 },
  // Adicione mais livros aqui
];

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
