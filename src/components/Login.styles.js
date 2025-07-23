import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 120px); /* Ajusta según el alto de tu header/footer */
    background: linear-gradient(to right, #ece9e6, #ffffff); /* Fondo suave */
    padding: 20px;
`;

export const LoginCard = styled.div`
    background-color: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); /* Sombra más pronunciada */
    width: 100%;
    max-width: 450px;
    text-align: center;
    animation: fadeIn 0.5s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const LoginHeader = styled.div`
    margin-bottom: 30px;

    h2 {
        color: #333;
        font-size: 2.2em;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    p {
        color: #777;
        font-size: 1.1em;
        margin: 0;
    }
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: left;
`;

export const FormGroup = styled.div`
    margin-bottom: 15px;

    label {
        display: block;
        margin-bottom: 8px;
        color: #555;
        font-weight: bold;
        font-size: 0.95em;
    }

    input {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1em;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;

        &:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
            outline: none;
        }
    }
`;

export const LoginButton = styled.button`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px 25px;
    border: none;
    border-radius: 8px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
    }

    &:disabled {
        background: #cccccc;
        cursor: not-allowed;
        box-shadow: none;
    }
`;

export const LoginFooter = styled.div`
    margin-top: 30px;
    font-size: 0.95em;
    color: #555;

    p {
        margin: 0;
    }
`;

export const RegisterLink = styled(Link)`
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s ease;

    &:hover {
        color: #0056b3;
        text-decoration: underline;
    }
`;

export const ErrorMessageDisplay = styled.div`
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    text-align: center;
    font-size: 0.9em;
`;