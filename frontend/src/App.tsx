// Cybersecurity Training Platform - Frontend Entry Point
// This file will contain the main React application component

export interface AppConfig {
  title: string;
  version: string;
  environment: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const appConfig: AppConfig = {
  title: 'Cybersecurity Training Platform',
  version: '1.0.0',
  environment: 'development'
};

// Main App component placeholder
export const App = () => {
  return null;
};
