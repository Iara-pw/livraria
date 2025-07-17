import { useParams } from "react-router-dom";
import styled from "styled-components";
import useCarrinho from "../context/useCarrinho";
import { useState } from "react";

// Importe as imagens dos livros (somente os que têm capa local)
import OPequenoPrincipe from "../assets/OPequenoPrincipe.jpg";
import ARevolucaoBichos from "../assets/ARevolucaoBichos.jpg";
import orgulho_e_preconceito from "../assets/orgulho_e_preconceito.webp";
import EAssimQueAcaba from "/imagens/EAssimQueAcaba.jpg";
import AGarotaLago from "/imagens/AGarotaLago.jpg";
import BibliotecaMeiaNoite from "/imagens/BibliotecaMeiaNoite.jpg";
import ASelecao from "/imagens/ASelecao.jpg";
import AEmpregada from "/imagens/AEmpregada.jpg";
import DeixadaParaTras from "/imagens/DeixadaParaTras.jpg";
import TodasImperfeicoes from "/imagens/TodasImperfeicoes.jpg";

const livros = [
  {
    id: "1",
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    preco: 29.9,
    descricao:
      "'O Pequeno Príncipe', de Antoine de Saint-Exupéry, é uma obra poética e filosófica que narra a história de um piloto perdido no deserto que encontra um pequeno príncipe vindo de outro planeta. Através de encontros com diferentes personagens e suas histórias, o livro aborda temas como amizade, amor, inocência e a importância de ver o mundo com o coração, valorizando o essencial que é invisível aos olhos.",
    capa: OPequenoPrincipe,
  },
  {
    id: "2",
    titulo: "A Revolução dos Bichos",
    autor: "George Orwell",
    preco: 24.9,
    descricao:
      "'A Revolução dos Bichos', de George Orwell, é uma fábula política que usa animais de uma fazenda para representar a ascensão e a corrupção do poder. Os bichos se rebelam contra os humanos, buscando igualdade e liberdade, mas acabam enfrentando uma nova tirania entre eles mesmos. O livro é uma crítica contundente ao totalitarismo e à manipulação política.",
    capa: ARevolucaoBichos,
  },
  {
    id: "3",
    titulo: "Orgulho e Preconceito",
    autor: "Jane Austen",
    preco: 34.9,
    descricao:
      "'Orgulho e Preconceito', de Jane Austen, é um clássico da literatura inglesa que narra a história de Elizabeth Bennet, uma jovem inteligente e espirituosa, e seu relacionamento com o orgulhoso e reservado Sr. Darcy. O livro explora temas como as diferenças sociais, preconceitos pessoais e o valor do amor verdadeiro, tudo isso com humor, crítica social e personagens memoráveis.",
    capa: orgulho_e_preconceito,
  },
  {
    id: "4",
    titulo: "É Assim Que Acaba",
    autor: "Colleen Hoover",
    preco: 37.0,
    descricao:
      "'É Assim Que Acaba', de Colleen Hoover, é um romance intenso e emocional que conta a história de Lily Bloom, uma jovem determinada que se apaixona por um neurocirurgião carismático, Ryle Kincaid. À medida que o relacionamento avança, Lily começa a enfrentar situações difíceis que a fazem reviver traumas do passado e repensar o que realmente significa o amor. O livro aborda temas delicados como violência doméstica, resiliência e autoamor, convidando o leitor à empatia e à reflexão.",
    capa: EAssimQueAcaba,
  },
  {
    id: "5",
    titulo: "A Garota do Lago",
    autor: "Charlie Donlea",
    preco: 15.0,
    descricao:
      "'A Garota do Lago', de Charlie Donlea, é um thriller envolvente que acompanha a investigação do assassinato de uma jovem promissora encontrada morta à beira de um lago. A jornalista Kelsey Castle mergulha no caso e descobre segredos sombrios de uma cidade aparentemente tranquila, onde todos parecem ter algo a esconder. Com reviravoltas e suspense psicológico, o livro prende o leitor até a última página.",

    capa: AGarotaLago,
  },
  {
    id: "6",
    titulo: "Deixada para Trás",
    autor: "Charlie Donlea",
    preco: 28.0,
    descricao:
      "'Deixada para Trás', de Charlie Donlea, é um suspense policial que gira em torno do desaparecimento de duas estudantes, sendo que apenas uma delas retorna misteriosamente um ano depois, sem memória do que aconteceu. À medida que a trama se desenrola, segredos vêm à tona e a busca pela verdade revela uma rede de mentiras e traições. Com narrativa envolvente e reviravoltas surpreendentes, o livro explora os limites da memória, da amizade e da justiça.",
    capa: DeixadaParaTras,
  },
  {
    id: "7",
    titulo: "Todas as Suas (Im)Perfeições",
    autor: "Colleen Hoover",
    preco: 38.0,
    descricao:
      "'Todas as Suas (Im)Perfeições', de Colleen Hoover, é um romance profundo e comovente que acompanha o relacionamento de Quinn e Graham, desde o momento em que se conhecem até os desafios enfrentados no casamento. Alternando entre passado e presente, a história aborda temas delicados como infertilidade, amor imperfeito e resiliência emocional, mostrando que o verdadeiro amor resiste mesmo quando tudo parece perdido.",
    capa: TodasImperfeicoes,
  },
  {
    id: "8",
    titulo: "A Empregada",
    autor: "Freida McFadden",
    preco: 31.2,
    descricao:
      "'A Empregada' é um thriller psicológico escrito por Freida McFadden. A trama acompanha Millie, uma jovem em dificuldades que aceita trabalhar como empregada na casa de uma família rica. Logo, ela percebe que a esposa do patrão é instável e que há segredos sombrios naquela casa. Com reviravoltas e suspense, o livro prende o leitor do início ao fim.",
    capa: AEmpregada,
  },
  {
    id: "9",
    titulo: "A Seleção",
    autor: "Kiera Cass",
    preco: 36.0,
    descricao:
      "'A Seleção', escrito por Kiera Cass, é o primeiro livro de uma série distópica e romântica que se passa em um futuro onde a sociedade é dividida por castas. A história acompanha America Singer, uma jovem da casta Cinco que é selecionada para participar de uma competição entre 35 garotas para conquistar o coração do príncipe Maxon e se tornar a futura rainha de Illéa. Embora relutante no início — pois está apaixonada por outro rapaz — America acaba se envolvendo em um mundo de luxo, intrigas e decisões difíceis, enquanto descobre mais sobre si mesma, sobre o príncipe e sobre o sistema injusto em que vive.",
    capa: ASelecao,
  },
  {
    id: "10",
    titulo: "A Biblioteca da Meia-Noite",
    autor: "Matt Haig",
    preco: 36.0,
    descricao:
      "'A Biblioteca da Meia-Noite', de Matt Haig, é um romance filosófico e emocionante que acompanha Nora Seed, uma mulher deprimida que, entre a vida e a morte, entra em uma biblioteca mágica onde cada livro representa uma vida que ela poderia ter vivido. Lá, Nora tem a chance de experimentar diferentes versões de sua existência e refletir sobre arrependimentos, escolhas e o verdadeiro sentido da felicidade. A obra mistura fantasia, reflexão existencial e esperança, mostrando que mesmo pequenas decisões podem mudar tudo.",
    capa: BibliotecaMeiaNoite,
  },
];

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 2rem 3rem;
  text-align: center;
`;

const Card = styled.div`
  background: #ffffff;
  max-width: 700px;
  width: 100%;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #bcdff0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const Capa = styled.img`
  width: 180px;
  height: 260px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Titulo = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const Autor = styled.p`
  font-size: 1rem;
  margin-bottom: 0.8rem;
  color: #555;
`;

const Descricao = styled.p`
  font-size: 1rem;
  margin-bottom: 1.2rem;
`;

const Preco = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const Botao = styled.button`
  background-color: #99d6f2;
  color: #1e1e1e;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #b3eafc;
  }
`;

const Produto = () => {
  const { id } = useParams();
  const livro = livros.find((livro) => livro.id === id);
  const { adicionarAoCarrinho } = useCarrinho();
  const [mensagem, setMensagem] = useState(false);

  if (!livro) {
    return (
      <Wrapper>
        <p>Livro não encontrado 😢</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Card>
        {livro.capa && <Capa src={livro.capa} alt={livro.titulo} />}
        <Titulo>{livro.titulo}</Titulo>
        <Autor>{livro.autor}</Autor>
        <Descricao>{livro.descricao || "Descrição indisponível."}</Descricao>
        <Preco>R$ {livro.preco.toFixed(2)}</Preco>
        <Botao
          onClick={() => {
            adicionarAoCarrinho(livro); // adiciona ao carrinho
            setMensagem(true); // ativa a mensagem

            // apaga a mensagem após 2 segundos
            setTimeout(() => {
              setMensagem(false);
            }, 2000);
          }}
        >
          Adicionar ao carrinho
          {mensagem && (
            <p
              style={{
                color: "#2c7",
                marginBottom: "1rem",
                fontWeight: "bold",
              }}
            >
              ✔ Livro adicionado com sucesso!
            </p>
          )}
        </Botao>
      </Card>
    </Wrapper>
  );
};

export default Produto;
