import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../context/useAuth"; // Assumindo que você tem um contexto de autenticação
import api from "../api"; // Importe a instância do Axios para a API

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

// Você pode reutilizar o Modal do seu componente de Cadastro ou criar um separado
const Modal = styled.div`
  position: fixed;
  top: 20%; /* Ajuste conforme necessário */
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border: 2px solid #a3e5bd;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #1e1e1e;
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
`;

const Login = () => {
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth(); // Se o seu useAuth realmente lida com o estado de login
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // Tornar a função assíncrona
    e.preventDefault();

    if (!email || !senha) {
      setMensagem("Por favor, preencha todos os campos.");
      setTipoMensagem("erro");
      return;
    }

    try {
      // Faz a requisição para a sua API de login no backend
      // Certifique-se de que a URL corresponde à sua rota de login (ex: /auth/login)
      const resposta = await api.post("/auth/login", { email, senha });

      if (resposta.status === 200) {
        setMensagem("Login realizado com sucesso! Bem-vindo(a) de volta ✨");
        setTipoMensagem("sucesso");

        // Aqui você pode armazenar o token e/ou dados do usuário, se a API retornar
        // Por exemplo: localStorage.setItem('token', resposta.data.token);
        // E chamar sua função de login do contexto para atualizar o estado global
        login(resposta.data.usuario, resposta.data.token); // Adapte para o que seu useAuth espera

        setTimeout(() => {
          navigate("/"); // Redireciona para a página principal ou dashboard
        }, 2000);
      }
    } catch (erro) {
      console.error("Erro ao tentar fazer login:", erro);
      setMensagem(
        erro.response?.data?.mensagem ||
          "Erro ao fazer login. Verifique suas credenciais."
      );
      setTipoMensagem("erro");
    } finally {
      // Opcional: Limpar a mensagem após um tempo se for um modal temporário
      setTimeout(() => {
        setMensagem("");
      }, 3000);
    }
  };

  return (
    <Wrapper>
      {/* Usando o Modal estilizado para exibir mensagens */}
      {mensagem && (
        <Modal
          style={{
            background: tipoMensagem === "erro" ? "#fee2e2" : "#d1fae5",
            color: tipoMensagem === "erro" ? "#991b1b" : "#065f46",
            borderColor: tipoMensagem === "erro" ? "#fecaca" : "#a3e5bd",
          }}
        >
          {mensagem}
        </Modal>
      )}

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
