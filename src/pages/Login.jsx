import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../context/useAuth";

const Wrapper = styled.main`
  min-height: 100vh;
  padding: 5rem 2rem;
  background-color: #f4faff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Formulario = styled.form`
  background: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Campo = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #bcdff0;
  border-radius: 8px;
  font-size: 1rem;
`;

const Botao = styled.button`
  background-color: #99d6f2;
  color: #1e1e1e;
  border: none;
  padding: 0.9rem 1.4rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #b3eafc;
  }
`;

const Titulo = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #1e1e1e;
  text-align: center;
`;

const Mensagem = styled.p`
  font-size: 0.95rem;
  color: #555;
  text-align: center;
`;

const Login = () => {
<<<<<<< HEAD
=======
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

>>>>>>> master
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (
      usuarioSalvo &&
      usuarioSalvo.email === email &&
      usuarioSalvo.senha === senha
    ) {
      login(); // ativa login no contexto
<<<<<<< HEAD
      alert(`Bem-vinda de volta, ${usuarioSalvo.nome} 💙`);
      navigate("/"); // redireciona para a página principal
    } else {
      alert("E-mail ou senha inválidos. Tente novamente 😥");
=======
      setMensagem(`Bem-vinde de volta, ${usuarioSalvo.nome} 💙`);
      setTipoMensagem("sucesso");

      setTimeout(() => {
        setMensagem("");
        navigate("/");
      }, 2000);
    } else {
      setMensagem("E-mail ou senha inválidos. Tente novamente 😥");
      setTipoMensagem("erro");

      setTimeout(() => {
        setMensagem("");
      }, 3000);
>>>>>>> master
    }
  };

  return (
    <Wrapper>
<<<<<<< HEAD
=======
      {mensagem && (
        <div
          style={{
            background: tipoMensagem === "erro" ? "#fee2e2" : "#d1fae5",
            color: tipoMensagem === "erro" ? "#991b1b" : "#065f46",
            padding: "1rem 1.5rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: "450px",
            width: "100%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {mensagem}
        </div>
      )}

>>>>>>> master
      <Formulario onSubmit={handleLogin}>
        <Titulo>Login</Titulo>

        <Campo
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Campo
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <Botao type="submit">Entrar</Botao>

        <Mensagem>
          Ainda não tem conta?{" "}
          <Link to="/cadastro" style={{ color: "#3c82f6", fontWeight: "bold" }}>
            Crie seu cadastro 💙
          </Link>
        </Mensagem>
      </Formulario>
    </Wrapper>
  );
};

export default Login;
