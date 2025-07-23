import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export const Header = styled.header`
    background-color: #282c34;
    color: white;
    padding: 1rem 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; /* Permite que los elementos se envuelvan */
`;

export const Logo = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 1.8em;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
        color: #61dafb;
    }

    @media (max-width: 768px) {
        width: 100%;
        text-align: center;
        justify-content: center;
        margin-bottom: 10px;
    }
`;

export const Nav = styled.nav`
    display: flex;
    gap: 20px;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 10px;
    }
`;

export const NavItem = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 5px 0;
    position: relative;
    transition: color 0.3s ease;

    &:hover {
        color: #61dafb;
    }

    &.active {
        color: #61dafb;
        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -5px;
            width: 100%;
            height: 2px;
            background-color: #61dafb;
        }
    }
`;

export const CartLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;
    transition: color 0.3s ease;

    &:hover {
        color: #61dafb;
    }

    &.active {
        color: #61dafb;
    }
`;

export const CartCount = styled.span`
    background-color: #61dafb;
    color: #282c34;
    font-size: 0.8em;
    font-weight: bold;
    border-radius: 50%;
    padding: 2px 7px;
    margin-left: 5px;
    min-width: 20px;
    text-align: center;
`;

export const MainContent = styled.main`
    flex: 1; /* Permite que el contenido principal ocupe el espacio restante */
    padding: 20px;
`;

export const Footer = styled.footer`
    background-color: #282c34;
    color: white;
    text-align: center;
    padding: 1rem 20px;
    margin-top: auto; /* Empuja el footer hacia abajo */
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
`;

export const UserActions = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
        margin-top: 10px;
        flex-wrap: wrap;
    }
`;

export const AuthButton = styled(Link)`
    background-color: #007bff;
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

export const LogoutButton = styled.button`
    background-color: #dc3545;
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #c82333;
    }
`;

export const UserGreeting = styled(Link)`
    color: white;
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: color 0.3s ease;

    &:hover {
        color: #61dafb;
    }

    @media (max-width: 768px) {
        order: -1; /* Mueve el saludo al principio en móviles */
        width: 100%;
        justify-content: center;
        margin-bottom: 10px;
    }
`;