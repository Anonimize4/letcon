// Cybersecurity Training Platform - Frontend Entry Point
// This file will contain the main React application component

export interface AppConfig {
  title: string;
  version: string;
  environment: string;
}

export const appConfig: AppConfig = {
  title: 'Cybersecurity Training Platform',
  version: '1.0.0',
  environment: 'development'
};

// Main App component placeholder
export const App = () => {
  console.log(`Starting ${appConfig.title} v${appConfig.version}`);
  return null;
};
