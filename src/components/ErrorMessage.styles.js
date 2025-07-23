import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ErrorContainer = styled.div`
  background-color: #f8d7da; /* Rojo claro para fondo */
  color: #721c24; /* Rojo oscuro para texto */
  border: 1px solid #f5c6cb; /* Borde rojo */
  padding: 20px;
  margin: 20px auto;
  border-radius: 8px;
  text-align: center;
  font-size: 1.1em;
  max-width: 600px;
  animation: ${fadeIn} 0.5s ease-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Sombra suave */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const ErrorMessageText = styled.p`
  margin: 0;
  font-weight: bold;
`;

export const RetryButton = styled.button`
  background-color: #007bff; /* Azul para el botón de reintentar */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;