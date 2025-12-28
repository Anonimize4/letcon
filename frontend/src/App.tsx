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

// Main App component
export const App = () => {
  return (
    <div className="min-h-screen bg-htb-background flex items-center justify-center">
      <div className="max-w-md mx-auto bg-htb-black rounded-xl shadow-md overflow-hidden border border-htb-blue">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-htb-blue font-semibold">
            Cybersecurity Training Platform
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
    </div>
  );
};
