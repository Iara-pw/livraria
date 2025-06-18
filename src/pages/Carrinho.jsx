import styled from "styled-components";

const Wrapper = styled.main`
  padding: 2rem;
`;

const Carrinho = () => {
  return (
    <Wrapper>
      <h2>Seu Carrinho</h2>
      <p>Você ainda não adicionou nenhum livro.</p>
    </Wrapper>
  );
};

export default Carrinho;
