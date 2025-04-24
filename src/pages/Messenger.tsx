import React from 'react';
import styled from 'styled-components';

const MessengerContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Messenger: React.FC = () => {
  return (
    <MessengerContainer>
      Messenger Page
    </MessengerContainer>
  );
};

export default Messenger; 