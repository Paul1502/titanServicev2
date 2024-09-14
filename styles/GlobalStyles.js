import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #000000;
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
