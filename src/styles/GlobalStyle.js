import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    width: 100%;
    font-family: 'Arial', sans-serif;
    background-color: #f4faff;
    color: #1e1e1e;
    display: flex;
    flex-direction: column;
    align-items: center; /* centraliza horizontalmente */
  }

  #root {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyle;
