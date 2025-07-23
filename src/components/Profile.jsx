import React from 'react';
import { useAuth } from './AuthContext';


import {
  ProfileContainer,
  ProfileCard,
  ProfileHeader,
  ProfileAvatar,
  ProfileBody,
  ProfileInfoItem,
  UserRole,
} from './Profile.styles';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <ProfileAvatar>
            {user.name?.charAt(0)?.toUpperCase()}
          </ProfileAvatar>
          <h2>Mi Perfil</h2>
        </ProfileHeader>
        <ProfileBody>
          <ProfileInfoItem>
            <strong>Nombre:</strong>
            <p>{user.name}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
            <strong>Email:</strong>
            <p>{user.email}</p>
          </ProfileInfoItem>
          <ProfileInfoItem>
            <strong>Rol:</strong>
            <UserRole>{user.role}</UserRole>
          </ProfileInfoItem>
        </ProfileBody>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;