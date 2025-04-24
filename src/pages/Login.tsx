import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LoginForm = styled.form`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/messenger');
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login; 