import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.main`
  padding: 6rem 2rem 3rem;
  min-height: 100vh;
  background-color: #f4faff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #bcdff0;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const Titulo = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1e1e1e;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    color: #333;
  }

  input,
  textarea {
    padding: 0.6rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
    margin-bottom: 1.2rem;
    resize: none;
  }

  button {
    background-color: #99d6f2;
    color: #1e1e1e;
    border: none;
    padding: 0.7rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #b3eafc;
    }
  }
`;

const Mensagem = styled.p`
  text-align: center;
  color: #2c7;
  margin-top: 1rem;
  font-weight: bold;
`;

const Contato = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contato enviado:", { nome, email, mensagem });
    setEnviado(true);

    setTimeout(() => {
      setEnviado(false);
      setNome("");
      setEmail("");
      setMensagem("");
    }, 3000);
  };

  return (
    <Wrapper>
      <Card>
        <Titulo>Fale com a gente 💌</Titulo>
        <Form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mensagem:</label>
          <textarea
            rows="4"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          />

          <button type="submit">Enviar mensagem</button>
        </Form>

        {enviado && <Mensagem>✔ Mensagem enviada com sucesso!</Mensagem>}
      </Card>
    </Wrapper>
  );
};

export default Contato;
