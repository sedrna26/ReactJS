import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';


import {
  LoginContainer,
  LoginCard,
  LoginHeader,
  LoginForm,
  FormGroup,
  LoginButton,
  LoginFooter,
  RegisterLink,

} from './Login.styles';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('El nombre es requerido');
      return false;
    }

    if (!formData.email.trim()) {
      toast.error('El email es requerido');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
        navigate('/login');
      } else {
        toast.error(result.error || 'Error al registrar. Intenta nuevamente.');
      }
    } catch (err) {
      toast.error('Error inesperado. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Helmet>
        <title>Registrarse - Mi Tienda Online</title>
        <meta name="description" content="Crea una cuenta en Mi Tienda Online para disfrutar de una mejor experiencia de compra y acceder a funciones exclusivas." />
        <link rel="canonical" href="http://www.mitiendaonline.com/register" />
      </Helmet>

      <LoginCard>
        <LoginHeader>
          <h2>🛒 Crear Cuenta</h2>
          <p>Únete a Mi Tienda Online</p>
        </LoginHeader>



        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Nombre completo:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre completo"

            />
          </FormGroup>

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
              placeholder="Mínimo 6 caracteres"

            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Repite tu contraseña"
            // className="form-input" // ¡Elimina esta clase!
            />
          </FormGroup>

          <LoginButton
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </LoginButton>
        </LoginForm>

        <LoginFooter>
          <p>
            ¿Ya tienes cuenta? <RegisterLink to="/login">Inicia sesión aquí</RegisterLink>
          </p>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
};

export default Register;