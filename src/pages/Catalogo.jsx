import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "../api";

const Catalogo = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [busca, setBusca] = useState("");

  const [livros, setLivros] = useState([]);

  useEffect(() => {
    api
      .get("/produtos")
      .then((res) => setLivros(res.data))
      .catch((err) => console.error("Erro ao buscar livros:", err));
  }, []);

  const [novoLivro, setNovoLivro] = useState({
    titulo: "",
    autor: "",
    preco: "",
    imagem: "",
    descricao: "",
  });

  const handleCadastro = async () => {
    const novo = {
      titulo: novoLivro.titulo,
      autor: novoLivro.autor,
      // Converte para número. Se vazio ou inválido, define como 0 ou null, dependendo do que o backend espera
      preco: novoLivro.preco ? parseFloat(novoLivro.preco) : 0, // Ou null, se o backend aceitar
      imagem: novoLivro.imagem || "/imagens/capa-padrao.jpg",
      descricao: novoLivro.descricao,
    };

    // NOVO: Log para ver os dados que serão enviados
    console.log("Dados do novo livro a serem enviados:", novo);

    // NOVO: Adiciona validação básica antes de enviar
    if (!novo.titulo || !novo.autor || isNaN(novo.preco) || novo.preco <= 0) {
      alert(
        "Por favor, preencha o título, autor e um preço válido para o livro."
      );
      return; // Impede a requisição se os dados forem inválidos
    }

    try {
      const res = await api.post("/produtos", novo);
      console.log("Resposta da API ao cadastrar:", res.data); // NOVO: Log da resposta de sucesso
      setLivros((prev) => [...prev, { ...res.data }]);
      setNovoLivro({
        titulo: "",
        autor: "",
        preco: "",
        imagem: "",
        descricao: "",
      });
      setMostrarModal(false);
    } catch (error) {
      console.error("Erro ao cadastrar livro (frontend):", error); // Mais específico
      if (error.response) {
        // O servidor respondeu com um status de erro (ex: 400, 500)
        console.error("Dados do erro da API:", error.response.data);
        console.error("Status do erro da API:", error.response.status);
        alert(
          `Erro ao cadastrar: ${
            error.response.data.erro || "Erro desconhecido."
          }`
        );
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta (servidor offline?)
        console.error("Nenhuma resposta recebida do servidor.");
        alert(
          "Não foi possível conectar ao servidor. Verifique se o backend está rodando."
        );
      } else {
        // Algo aconteceu na configuração da requisição
        console.error(
          "Erro na configuração da requisição Axios:",
          error.message
        );
        alert("Ocorreu um erro inesperado ao tentar cadastrar o livro.");
      }
    }
  };

  const livrosFiltrados = livros.filter(
    (livro) =>
      livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      livro.autor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <CatalogoWrapper>
      <h2>Catálogo</h2>

      <ButtonsContainer>
        <BotaoPadrao onClick={() => setMostrarModal(true)}>
          Cadastrar Livro
        </BotaoPadrao>
      </ButtonsContainer>

      <InputBusca
        type="text"
        placeholder="Buscar por título ou autor..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {mostrarModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Cadastrar novo livro</h3>
            <input
              type="text"
              placeholder="Título"
              value={novoLivro.titulo}
              onChange={(e) =>
                setNovoLivro({ ...novoLivro, titulo: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Autor"
              value={novoLivro.autor}
              onChange={(e) =>
                setNovoLivro({ ...novoLivro, autor: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Preço"
              value={novoLivro.preco}
              onChange={(e) =>
                setNovoLivro({ ...novoLivro, preco: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="URL da imagem da capa"
              value={novoLivro.imagem}
              onChange={(e) =>
                setNovoLivro({ ...novoLivro, imagem: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Descrição"
              value={novoLivro.descricao}
              onChange={(e) =>
                setNovoLivro({ ...novoLivro, descricao: e.target.value })
              }
            />

            <div>
              <button onClick={handleCadastro}>Salvar</button>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      <Grid>
        {livrosFiltrados.length > 0 ? (
          livrosFiltrados.map((livro) => (
            <Card key={livro._id}>
              {livro.imagem && (
                <img
                  src={livro.imagem}
                  alt={`Capa do livro ${livro.titulo}`}
                  style={{
                    width: "120px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: "1rem",
                  }}
                />
              )}
              <h3>{livro.titulo}</h3>
              <p>{livro.autor}</p>
              <p>R$ {livro.preco.toFixed(2)}</p>
              <Link to={`/produto/${livro._id}`}>
                <button>Ver mais</button>
              </Link>
            </Card>
          ))
        ) : (
          <p>Nenhum livro encontrado.</p>
        )}
      </Grid>
    </CatalogoWrapper>
  );
};

export default Catalogo;

//
// ESTILOS
//

const CatalogoWrapper = styled.main`
  min-height: 100vh;
  padding: 6rem 2rem 3rem;
  background-color: #f4faff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem 1rem;
  border: 1px solid #bcdff0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-4px);
  }

  h3 {
    font-size: 1.1rem;
    color: #1e1e1e;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.25rem 0;
    color: #333;
  }

  a {
    margin-top: 1rem;
    text-decoration: none;
  }

  button {
    background-color: #99d6f2;
    color: #1e1e1e;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #b3eafc;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 100%;
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;
const BotaoPadrao = styled.button`
  background-color: #99d6f2;
  color: #1e1e1e;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b3eafc;
  }
`;
const InputBusca = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #bcdff0;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 350px;
`;
