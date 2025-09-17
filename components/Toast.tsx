
import React from 'react';
import { ToastMessage } from '../contexts/ToastContext';

interface ToastProps {
  message: ToastMessage;
  onDismiss: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(message.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [message.id, onDismiss]);

  const baseClasses = "flex items-center w-full max-w-xs p-4 space-x-4 text-gray-200 divide-x divide-gray-700 rounded-lg shadow space-x right-5 top-5";
  const typeClasses = {
    success: "bg-green-800/90 backdrop-blur-sm",
    error: "bg-red-800/90 backdrop-blur-sm",
  };

  const SuccessIcon = () => (
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-200 bg-green-900 rounded-lg">
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
      </svg>
    </div>
  );

   const ErrorIcon = () => (
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-200 bg-red-900 rounded-lg">
       <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
    </div>
  );

  return (
    <div className={`${baseClasses} ${typeClasses[message.type]}`} role="alert">
      {message.type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
      <div className="pl-4 text-sm font-normal">{message.text}</div>
      <button onClick={() => onDismiss(message.id)} className="pl-4 -mr-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400 hover:text-white"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
  );
};

export default Toast;
