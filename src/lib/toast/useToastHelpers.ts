import { useToast } from './context';

export function useToastHelper() {
  const { addToast, removeToast } = useToast();

  return {
    success: (message: string, duration?: number) => addToast(message, 'success', duration),
    error: (message: string, duration?: number) => addToast(message, 'error', duration),
    info: (message: string, duration?: number) => addToast(message, 'info', duration),
    warning: (message: string, duration?: number) => addToast(message, 'warning', duration),
    loading: (message: string) => addToast(message, 'loading', 0),
    dismiss: (id: string) => removeToast(id),
  };
}
