import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error inesperado. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    setError('');
    
    const credentials = role === 'admin' 
      ? { email: 'admin@tienda.com', password: 'admin123' }
      : { email: 'user@tienda.com', password: 'user123' };
    
    try {
      const result = await login(credentials.email, credentials.password);
      if (result.success) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('Error en login demo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>🛒 Iniciar Sesión</h2>
          <p>Ingresa a tu cuenta de Mi Tienda Online</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Tu contraseña"
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
          
          <div className="demo-section">
            <button
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              className="demo-toggle"
            >
              {showDemo ? 'Ocultar' : 'Mostrar'} Cuentas Demo
            </button>
            
            {showDemo && (
              <div className="demo-accounts">
                <h4>Cuentas de prueba:</h4>
                <div className="demo-buttons">
                  <button
                    onClick={() => handleDemoLogin('admin')}
                    className="demo-button admin"
                    disabled={loading}
                  >
                    👑 Administrador
                    <small>admin@tienda.com / admin123</small>
                  </button>
                  <button
                    onClick={() => handleDemoLogin('user')}
                    className="demo-button user"
                    disabled={loading}
                  >
                    👤 Usuario
                    <small>user@tienda.com / user123</small>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;