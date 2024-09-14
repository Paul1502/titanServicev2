import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #000;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
  }
  /* Weitere globale Stile */
`;

export default GlobalStyle;
