'use client';

import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#000',
          border: '1px solid #e5e7eb',
          padding: '16px',
          borderRadius: '8px',
        },
        success: {
          style: {
            borderColor: '#10b981',
          },
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        },
        error: {
          style: {
            borderColor: '#ef4444',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
