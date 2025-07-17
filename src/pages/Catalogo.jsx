import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

// Lista de livros com imagens
const livrosFake = [
  {
    id: "1",
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    preco: 19.9,
    imagem: "/imagens/OPequenoPrincipe.jpg",
  },
  {
    id: "2",
    titulo: "A Revolução dos Bichos",
    autor: "George Orwell",
    preco: 24.9,
    imagem: "/imagens/ARevolucaoBichos.jpg",
  },
  {
    id: "3",
    titulo: "Orgulho e Preconceito",
    autor: "Jane Austen",
    preco: 34.9,
    imagem: "/imagens/orgulho_e_preconceito.webp",
  },
  {
    id: "4",
    titulo: "É Assim Que Acaba",
    autor: "Colleen Hoover",
    preco: 37.0,
    imagem: "/imagens/EAssimQueAcaba.jpg",
  },
  {
    id: "5",
    titulo: "A Garota do Lago",
    autor: "Charlie Donlea",
    preco: 15.0,
    imagem: "/imagens/AGarotaLago.jpg",
  },
  {
    id: "6",
    titulo: "Deixada para Trás",
    autor: "Charlie Donlea",
    preco: 28.0,
    imagem: "/imagens/DeixadaParaTras.jpg",
  },
  {
    id: "7",
    titulo: "Todas as Suas (Im)Perfeições",
    autor: "Colleen Hoover",
    preco: 38.0,
    imagem: "/imagens/TodasImperfeicoes.jpg",
  },
  {
    id: "8",
    titulo: "A Empregada",
    autor: "Freida McFadden",
    preco: 31.2,
    imagem: "/imagens/AEmpregada.jpg",
  },
  {
    id: "9",
    titulo: "A Seleção",
    autor: "Kiera Cass",
    preco: 36.0,
    imagem: "/imagens/ASelecao.jpg",
  },
  {
    id: "10",
    titulo: "A Biblioteca da Meia-Noite",
    autor: "Matt Haig",
    preco: 36.0,
    imagem: "/imagens/BibliotecaMeiaNoite.jpg",
  },
];

// Componente principal
const Catalogo = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [livros, setLivros] = useState(() => {
    const livrosSalvos = localStorage.getItem("livros");
    return livrosSalvos ? JSON.parse(livrosSalvos) : livrosFake;
  });

  const [novoLivro, setNovoLivro] = useState({
    titulo: "",
    autor: "",
    preco: "",
    imagem: "",
  });

  const handleCadastro = () => {
    const novoId = livros.length + 1;

    const novo = {
      id: novoId.toString(),
      titulo: novoLivro.titulo,
      autor: novoLivro.autor,
      preco: parseFloat(novoLivro.preco),
      imagem: novoLivro.imagem || "/imagens/capa-padrao.jpg",
    };

    const novaLista = [...livros, novo];
    setLivros(novaLista);
    localStorage.setItem("livros", JSON.stringify(novaLista));

    setNovoLivro({
      titulo: "",
      autor: "",
      preco: "",
      imagem: "",
    });

    setMostrarModal(false);
  };

  return (
    <CatalogoWrapper>
      <h2>Catálogo</h2>

      <ButtonsContainer>
        <BotaoPadrao onClick={() => setMostrarModal(true)}>
          Cadastrar Livro
        </BotaoPadrao>
      </ButtonsContainer>

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
            <div>
              <button onClick={handleCadastro}>Salvar</button>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      <Grid>
        {livros.map((livro) => (
          <Card key={livro.id}>
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
  max-width: 400px;

  h3 {
    margin-top: 0;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  button {
    padding: 0.5rem 1rem;
    background: #99d6f2;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 1rem;
  }
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
