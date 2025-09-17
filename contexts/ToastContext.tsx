
import React, { createContext, useState, useCallback, useContext } from 'react';
import Toast from '../components/Toast';

export interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  addToast: (text: string, type: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback((text: string, type: 'success' | 'error') => {
    const id = Date.now();
    setMessages((prevMessages) => [...prevMessages, { id, text, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-5 right-5 z-[100] space-y-2">
        {messages.map((message) => (
          <Toast key={message.id} message={message} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
