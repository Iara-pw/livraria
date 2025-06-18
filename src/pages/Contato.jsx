import styled from "styled-components";

const Wrapper = styled.main`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Contato = () => {
  return (
    <Wrapper>
      <h2>Fale Conosco</h2>
      <form>
        <label>Nome:</label>
        <input type="text" required />
        <label>Email:</label>
        <input type="email" required />
        <label>Mensagem:</label>
        <textarea rows="5" required />
        <button type="submit">Enviar</button>
      </form>
    </Wrapper>
  );
};

export default Contato;
