// Archivo: src/components/Profile.jsx

import React from 'react';
import { useAuth } from './AuthContext'; // Importamos el contexto para acceder a los datos del usuario
import './Profile.css'; // Crearemos este archivo para los estilos

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <span className="profile-avatar">
            {user.name?.charAt(0)?.toUpperCase()}
          </span>
          <h2>Mi Perfil</h2>
        </div>
        <div className="profile-body">
          <div className="profile-info-item">
            <strong>Nombre:</strong>
            <p>{user.name}</p>
          </div>
          <div className="profile-info-item">
            <strong>Email:</strong>
            <p>{user.email}</p>
          </div>
          <div className="profile-info-item">
            <strong>Rol:</strong>
            <p className="user-role">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;