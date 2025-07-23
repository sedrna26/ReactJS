import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CartContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

export const CartTitle = styled.h2`
    color: #333;
    margin-bottom: 20px;
    text-align: center;
`;

export const EmptyCartMessage = styled.div`
    text-align: center;
    padding: 40px;
    color: #666;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    p {
        margin: 10px 0;
        font-size: 1.1em;
    }
`;

export const ContinueShoppingButton = styled(Link)`
    display: inline-block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    margin-top: 20px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
`;

export const CartItemsContainer = styled.div`
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
    padding: 20px;
`;

export const CartItem = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 600px) {
        flex-direction: column;
        text-align: center;
        align-items: flex-start; // Alinea los elementos a la izquierda en móvil
    }
`;

export const CartItemLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 15px;
    flex-grow: 1; // Permite que el link ocupe espacio para la imagen y el nombre

    @media (max-width: 600px) {
        flex-direction: column;
        width: 100%; // Ocupa todo el ancho
        gap: 10px;
        align-items: center;
        margin-bottom: 10px;
    }
`;

export const CartItemImage = styled.img`
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0; // Evita que la imagen se encoja
`;

export const CartItemInfo = styled.div`
    flex-grow: 1;

    h3 {
        margin: 0 0 5px 0;
        color: #333;
        font-size: 1.1em;
    }

    p {
        margin: 0;
        color: #666;
        font-size: 0.9em;
    }

    @media (max-width: 600px) {
        h3, p {
            text-align: center;
        }
    }
`;

export const ItemPrice = styled.span`
    font-weight: bold;
    color: #007bff;
    white-space: nowrap; // Evita que el precio se rompa
    flex-shrink: 0; // Evita que el precio se encoja
    margin-left: auto; // Empuja el precio a la derecha
    
    @media (max-width: 600px) {
        margin-left: 0; // Elimina el margen en móvil
        width: 100%; // Ocupa todo el ancho
        text-align: center;
        margin-top: 5px;
    }
`;

export const QuantitySelector = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    flex-shrink: 0; // Evita que el selector se encoja

    @media (max-width: 600px) {
        width: 120px; // Ancho fijo para el selector en móvil
        margin: 10px auto; // Centra el selector
    }
`;

export const QuantityButton = styled.button`
    background-color: #f8f9fa;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1em;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #e2e6ea;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const QuantityDisplay = styled.span`
    padding: 8px 15px;
    font-weight: bold;
    min-width: 30px;
    text-align: center;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
`;

export const ItemTotal = styled.div`
    font-weight: bold;
    color: #333;
    min-width: 80px; // Asegura un ancho mínimo para el total
    text-align: right;
    flex-shrink: 0; // Evita que el total se encoja

    @media (max-width: 600px) {
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }
`;

export const RemoveButton = styled.button`
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease;
    flex-shrink: 0; // Evita que el botón se encoja
    margin-left: 10px; // Añade espacio a la izquierda

    &:hover {
        background-color: #c0392b;
    }

    @media (max-width: 600px) {
        width: 100%;
        margin-left: 0;
        margin-top: 15px;
    }
`;

export const CartTotalContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

export const TotalPrice = styled.h3`
    margin: 0 0 15px 0;
    color: #333;
    font-size: 1.5em;
`;

export const CartActions = styled.div`
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

export const CheckoutButton = styled.button`
    background-color: #27ae60;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 6px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #219a52;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        opacity: 0.8;
    }
`;