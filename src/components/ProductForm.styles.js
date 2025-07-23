import styled, { keyframes } from 'styled-components';

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
`;

export const ProductFormContainer = styled.div`
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 600px;
    position: relative;
    animation: ${slideIn} 0.3s ease-out;
    max-height: 90vh; /* Para scroll si el contenido es largo */
    overflow-y: auto; /* Habilita scroll vertical */
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.8em;
    cursor: pointer;
    color: #888;
    transition: color 0.2s ease;

    &:hover {
        color: #333;
    }
`;

export const FormTitle = styled.h2`
    color: #333;
    margin-bottom: 25px;
    text-align: center;
    font-size: 1.8em;
`;

export const FormGroup = styled.div`
    margin-bottom: 20px;

    label {
        display: block;
        margin-bottom: 8px;
        color: #555;
        font-weight: bold;
        font-size: 0.95em;
    }

    input[type='text'],
    input[type='number'],
    input[type='url'],
    textarea,
    select {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1em;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        box-sizing: border-box; /* Asegura que padding y border no aumenten el ancho */

        &:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
            outline: none;
        }
    }

    textarea {
        resize: vertical; /* Permite redimensionar verticalmente */
        min-height: 80px;
    }
`;

export const FormActions = styled.div`
    display: flex;
    justify-content: flex-end; /* Alinea los botones a la derecha */
    gap: 15px;
    margin-top: 30px;

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const FormButton = styled.button`
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
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

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        opacity: 0.8;
    }
`;

export const SaveButton = styled(FormButton)`
    background-color: #28a745; /* Verde para guardar */
    color: white;

    &:hover {
        background-color: #218838;
    }
`;

export const CancelButton = styled(FormButton)`
    background-color: #dc3545; /* Rojo para cancelar */
    color: white;

    &:hover {
        background-color: #c82333;
    }
`;

export const ErrorMessage = styled.div`
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    text-align: center;
    font-size: 0.9em;
`;