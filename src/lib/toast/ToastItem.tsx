import React, { useEffect } from 'react';
import { Toast } from './types';

const ToastItem: React.FC<{ toast: Toast; onDismiss: () => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (toast.type !== 'loading' && toast.duration) {
      const timer = setTimeout(onDismiss, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      case 'loading': return '⌛';
      default: return null;
    }
  };

  const getColor = () => {
    switch (toast.type) {
      case 'success': return 'bg-green-500 text-white';
      case 'error': return 'bg-red-500 text-white';
      case 'warning': return 'bg-yellow-500 text-black';
      case 'info': return 'bg-blue-500 text-white';
      case 'loading': return 'bg-gray-500 text-white';
      default: return 'bg-gray-800 text-white';
    }
  };

  return (
    <div className={`p-4 rounded-md shadow-lg flex items-center ${getColor()}`}>
      <span className="mr-2">{getIcon()}</span>
      <span>{toast.message}</span>
      <button 
        onClick={onDismiss} 
        className="ml-4 text-sm font-bold"
        aria-label="Close toast"
      >
        ×
      </button>
    </div>
  );
};

export default ToastItem;
