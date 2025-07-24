import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import {
  LoginContainer,
  LoginCard,
  LoginHeader,
  LoginForm,
  FormGroup,
  LoginButton,
  LoginFooter,
  RegisterLink,
  ErrorMessageDisplay
} from './Login.styles';
import { FaLock } from 'react-icons/fa';

const TestAccountsContainer = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  text-align: center;
`;

const TestAccountButton = styled.button`
  background-color: ${props => props.$isAdmin ? '#dc3545' : '#28a745'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('El email es requerido.');
      return false;
    }
    if (!formData.password.trim()) {
      setError('La contraseña es requerida.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores anteriores

    if (!validateForm()) {
      return; // Detener si la validación falla
    }

    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast.success('¡Inicio de sesión exitoso!');
        navigate('/products'); // Redirige a /products después del login
      } else {
        setError(result.error || 'Credenciales inválidas. Intenta nuevamente.');
        toast.error(result.error || 'Credenciales inválidas. Intenta nuevamente.');
      }
    } catch (err) {
      setError('Error inesperado. Intenta nuevamente.');
      toast.error('Error inesperado. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleTestAccount = async (isAdmin) => {
    setLoading(true);
    const testCredentials = isAdmin
      ? { email: 'admin@tienda.com', password: 'admin123' }
      : { email: 'user@tienda.com', password: 'user123' };

    try {
      const result = await login(testCredentials.email, testCredentials.password);
      if (result.success) {
        toast.success(`¡Inicio de sesión exitoso como ${isAdmin ? 'Administrador' : 'Usuario'}!`);
        navigate('/products');
      }
    } catch (err) {
      toast.error('Error al iniciar sesión con cuenta de prueba');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Helmet>
        <title>Iniciar Sesión - Mi Tienda Online</title>
        <meta name="description" content="Inicia sesión en tu cuenta de Mi Tienda Online para acceder a tus pedidos y beneficios exclusivos." />
        <link rel="canonical" href="https://reactjs-hr.netlify.app/login" />
      </Helmet>

      <LoginCard>
        <LoginHeader>
          <h2><FaLock /> Iniciar Sesión</h2>
          <p>Bienvenido de nuevo</p>
        </LoginHeader>

        {error && <ErrorMessageDisplay>{error}</ErrorMessageDisplay>}

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              aria-label="Introduce tu email" // Etiqueta ARIA
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Tu contraseña"
              aria-label="Introduce tu contraseña" // Etiqueta ARIA
            />
          </FormGroup>

          <LoginButton
            type="submit"
            disabled={loading}
            aria-label={loading ? "Iniciando sesión..." : "Iniciar sesión"} // Etiqueta ARIA dinámica
          >
            {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </LoginButton>
        </LoginForm>

        <LoginFooter>
          <p>
            ¿No tienes cuenta? <RegisterLink to="/register">Regístrate aquí</RegisterLink>
          </p>
        </LoginFooter>

        <TestAccountsContainer>
          <p style={{ marginBottom: '1rem', color: '#666' }}>Cuentas de prueba:</p>
          <TestAccountButton
            onClick={() => handleTestAccount(true)}
            disabled={loading}
            $isAdmin={true}
            aria-label="Iniciar sesión como administrador"
          >
            Ingresar como Admin
          </TestAccountButton>
          <TestAccountButton
            onClick={() => handleTestAccount(false)}
            disabled={loading}
            $isAdmin={false}
            aria-label="Iniciar sesión como usuario"
          >
            Ingresar como Usuario
          </TestAccountButton>
        </TestAccountsContainer>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;