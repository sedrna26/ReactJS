import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AdminDashboardContainer = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

export const AdminHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap; // Asegura que los elementos se envuelvan en pantallas pequeñas
    gap: 1rem; // Espacio entre elementos
`;

export const AdminTitle = styled.h2`
    color: #333;
    margin: 0;
    font-size: 1.8em;

    @media (max-width: 768px) {
        width: 100%; 
        text-align: center;
    }
`;

export const AddProductButton = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

export const Notification = styled.div`
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    text-align: center;
    animation: fadeIn 0.5s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const ProductTableContainer = styled.div`
    overflow-x: auto; 
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    margin-bottom: 2rem;
`;

export const ProductTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 600px; 

    th, td {
        border-bottom: 1px solid #eee;
        padding: 12px;
        text-align: left;
        vertical-align: middle;
    }

    th {
        background-color: #f8f9fa;
        color: #555;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.9em;
    }

    tr:last-child td {
        border-bottom: none;
    }

    tbody tr:hover {
        background-color: #f5f5f5;
    }
`;

export const ProductImageAdmin = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 10px;
    vertical-align: middle;
`;

export const ActionButton = styled.button`
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 8px;
    font-weight: bold;
    transition: background-color 0.2s ease, transform 0.1s ease;
    white-space: nowrap; // Evita que el texto del botón se rompa
    display: inline-flex;
    align-items: center;
    gap: 5px;

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        transform: translateY(-1px);
    }
`;

export const EditButton = styled(ActionButton)`
    background-color: #ffc107;
    color: #333;

    &:hover {
        background-color: #e0a800;
    }
`;

export const DeleteButton = styled(ActionButton)`
    background-color: #dc3545;
    color: white;

    &:hover {
        background-color: #c82333;
    }
`;

export const NoProductsMessage = styled.div`
    text-align: center;
    padding: 50px 20px;
    background: #fdfdfd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    color: #555;
    margin-bottom: 2rem;

    h3 {
        color: #777;
        margin-bottom: 10px;
    }

    p {
        font-size: 1.1em;
    }
`;

export const ErrorContainer = styled.div`
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
    text-align: center;
`;