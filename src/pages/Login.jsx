import styled from "styled-components";

const Wrapper = styled.main`
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
`;

const Login = () => {
  return (
    <Wrapper>
      <h2>Entrar</h2>
      <form>
        <label>Email:</label>
        <input type="email" required />
        <label>Senha:</label>
        <input type="password" required />
        <button type="submit">Entrar</button>
      </form>
    </Wrapper>
  );
};

export default Login;
