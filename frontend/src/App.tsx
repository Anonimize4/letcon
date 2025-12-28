// Cybersecurity Training Platform - Frontend Entry Point
// This file will contain the main React application component

import Header from './components/navigation/Header';

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
    <div className="min-h-screen bg-htb-background">
      {/* Header with empty list */}
      <Header />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md mx-auto bg-htb-background rounded-xl shadow-lg overflow-hidden border border-htb-selectionBackground">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-htb-blue font-semibold">
              LETHCON
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-htb-foreground">
              Welcome!
            </h1>
            <p className="mt-2 text-htb-brightBlack">
              Your cybersecurity training platform is now running successfully.
              This is a welcome message to confirm the interface is working.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
