import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-image: url('/images/wallpaper.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #FFF;
  }
`;