import ToastMessage from '@/components/common/ToastMessage';
import React, { createContext, useCallback, useState } from 'react';

type ToastContextType = {
  showToast: (message: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <ToastMessage message={toast} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  );
};
