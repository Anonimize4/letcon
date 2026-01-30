import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppRouter } from './routes';

export interface AppConfig {
  title: string;
  version: string;
  environment: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const appConfig: AppConfig = {
  title: 'LETHCON',
  version: '1.0.0',
  environment: 'development'
};

// Main App component
export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;

