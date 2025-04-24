import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
  encrypted: boolean;
}

interface SocketContextType {
  socket: Socket | null;
  messages: Message[];
  sendMessage: (to: string, content: string) => void;
  encryptMessage: (content: string) => Promise<string>;
  decryptMessage: (encryptedContent: string) => Promise<string>;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const newSocket = io('http://localhost:3001', {
        auth: {
          token: localStorage.getItem('token'),
        },
      });

      newSocket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      newSocket.on('message', (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  const sendMessage = async (to: string, content: string) => {
    if (!socket || !user) return;

    try {
      const encryptedContent = await encryptMessage(content);
      socket.emit('message', {
        from: user.id,
        to,
        content: encryptedContent,
        encrypted: true,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const encryptMessage = async (content: string): Promise<string> => {
    // This would use Web Crypto API in a real app
    return content;
  };

  const decryptMessage = async (encryptedContent: string): Promise<string> => {
    // This would use Web Crypto API in a real app
    return encryptedContent;
  };

  return (
    <SocketContext.Provider value={{ socket, messages, sendMessage, encryptMessage, decryptMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}; 