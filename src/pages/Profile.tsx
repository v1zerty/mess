import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Profile: React.FC = () => {
  return (
    <ProfileContainer>
      Profile Page
    </ProfileContainer>
  );
};

export default Profile; 