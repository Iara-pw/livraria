import { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import api from "../api"; // <-- importando a API

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

const Modal = styled.div`
  position: fixed;
  top: 20%;
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

const Cadastro = () => {
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmar) {
      setMensagem("Por favor, preencha todos os campos 💙");
      setTipoMensagem("erro");
      return;
    }

    if (senha !== confirmar) {
      setMensagem("As senhas não coincidem 😥");
      setTipoMensagem("erro");
      return;
    }

    try {
      const resposta = await api.post("/usuarios", { nome, email, senha });

      if (resposta.status === 201 || resposta.status === 200) {
        setMensagem(
          "Cadastro realizado com sucesso! Agora é só fazer login ✨"
        );
        setTipoMensagem("sucesso");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (erro) {
      setMensagem(
        erro.response?.data?.mensagem ||
          "Erro ao cadastrar. Tente novamente mais tarde 😥"
      );
      setTipoMensagem("erro");
    }
  };

  return (
    <>
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

      <Wrapper>
        <Formulario onSubmit={handleCadastro}>
          <Titulo>Cadastro 💙</Titulo>

          <Campo
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Campo
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Campo
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <Campo
            type="password"
            placeholder="Confirmar senha"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
          />

          <Botao type="submit">Cadastrar</Botao>

          <Mensagem>
            Já tem uma conta?{" "}
            <Link to="/login" style={{ color: "#3c82f6", fontWeight: "bold" }}>
              Faça login
            </Link>
          </Mensagem>
        </Formulario>
      </Wrapper>
    </>
  );
};

export default Cadastro;
