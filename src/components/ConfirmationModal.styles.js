
import styled, { keyframes } from 'styled-components';

// Keyframes para la animación de entrada del modal
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideIn = keyframes`
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 400px;
    width: 90%;
    animation: ${slideIn} 0.3s ease-out;
    position: relative;
`;

export const ModalMessage = styled.p`
    font-size: 1.1em;
    color: #333;
    margin-bottom: 25px;
    line-height: 1.5;
`;

export const ModalButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 10px;
    }
`;

export const ModalButton = styled.button`
    padding: 12px 25px;
    border-radius: 8px;
    border: none;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const ConfirmButton = styled(ModalButton)`
    background-color: #e74c3c; /* Rojo para confirmar acción destructiva */
    color: white;

    &:hover {
        background-color: #c0392b;
    }
`;

export const CancelButton = styled(ModalButton)`
    background-color: #ccc; /* Gris para cancelar */
    color: #333;

    &:hover {
        background-color: #b3b3b3;
    }
`;