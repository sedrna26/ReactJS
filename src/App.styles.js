import { createGlobalStyle } from 'styled-components';
import styled, { css, keyframes } from 'styled-components';


const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8f9fa;
    color: #333;
    line-height: 1.6;
  }

  #root {
    min-height: 100vh;
  }

  /* Estilos para botones globales */
  button {
    font-family: inherit;
    transition: all 0.2s ease;
  }

  button:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  /* Estilos para imágenes */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Estilos para scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

// Componentes estilizados para utilidades
export const TextCenter = styled.div`
  text-align: center;
`;

// Mixin para márgenes y paddings dinámicos
const spacing = (prop, unit) => css`
  ${prop}-top: ${unit * 0.25}rem;
  ${prop}-bottom: ${unit * 0.25}rem;
  ${prop}-left: ${unit * 0.25}rem;
  ${prop}-right: ${unit * 0.25}rem;
`;

export const Mt = styled.div`
  margin-top: ${({ value }) => value * 0.25}rem;
`;

export const Mb = styled.div`
  margin-bottom: ${({ value }) => value * 0.25}rem;
`;

export const P = styled.div`
  padding: ${({ value }) => value * 0.25}rem;
`;

// Componente estilizado para animación fade-in
export const FadeIn = styled.div`
  animation: ${fadeInAnimation} 0.5s ease-out;
`;