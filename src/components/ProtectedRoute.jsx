import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isAuthenticated, hasRole, loading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return <LoadingSpinner message="Verificando autenticación..." />;
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="access-denied">
        <div style={{ textAlign: 'center', padding: '40px', color: '#e74c3c' }}>
          <h2>⛔ Acceso Denegado</h2>
          <p>No tienes permisos para acceder a esta página.</p>
          <p>Rol requerido: <strong>{requiredRole}</strong></p>
          <p>Tu rol actual: <strong>{user?.role}</strong></p>
        </div>
      </div>
    );
  }

  // Si todo está bien, mostrar el componente hijo
  return children;
};

export default ProtectedRoute;