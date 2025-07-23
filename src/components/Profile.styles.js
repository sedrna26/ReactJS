import styled from 'styled-components';

export const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
`;

export const ProfileCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ProfileHeader = styled.div`
  background-color: #f7f7f7;
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    margin: 0;
    color: #333;
  }
`;

export const ProfileAvatar = styled.span`
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  font-size: 2.5rem;
  line-height: 80px; /* Centra verticalmente el texto */
  margin-bottom: 1rem;
`;

export const ProfileBody = styled.div`
  padding: 2rem;
`;

export const ProfileInfoItem = styled.div`
  margin-bottom: 1.5rem;

  strong {
    display: block;
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 0.25rem;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    color: #333;
  }
`;

export const UserRole = styled.p`
  background-color: #e7f3ff;
  color: #007bff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
`;