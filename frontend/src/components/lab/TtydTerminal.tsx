import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2, Terminal as TerminalIcon, Loader2 } from 'lucide-react';

interface TtydTerminalProps {
  containerId?: string;
  terminalUrl?: string;
  onCommand?: (command: string) => void;
  className?: string;
  height?: string;
}

const TtydTerminal: React.FC<TtydTerminalProps> = ({
  containerId,
  terminalUrl,
  onCommand,
  className = '',
  height = '400px'
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!terminalUrl) {
      setError('No terminal URL provided');
      setIsLoading(false);
      return;
    }

    const iframe = iframeRef.current;
    if (!iframe) return;

    // Handle iframe load
    const handleLoad = () => {
      setIsLoading(false);
      setIsConnected(true);
      setError(null);
    };

    // Handle iframe error
    const handleError = () => {
      setIsLoading(false);
      setIsConnected(false);
      setError('Failed to load terminal');
    };

    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);

    return () => {
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
    };
  }, [terminalUrl]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const reloadTerminal = () => {
    setIsLoading(true);
    setError(null);
    if (iframeRef.current) {
      iframeRef.current.src = terminalUrl || '';
    }
  };

  return (
    <div className={`bg-htb-background border border-gray-700 rounded-lg overflow-hidden ${className} ${
      isMaximized ? 'fixed inset-4 z-50' : ''
    }`}>
      {/* Terminal Header */}
      <div className="bg-htb-selection-background border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-htb-green" />
          <span className="text-sm font-medium text-htb-bright-white">
            Terminal - {containerId || 'Unknown Container'}
          </span>
          {isConnected && (
            <span className="w-2 h-2 bg-htb-green rounded-full animate-pulse" />
          )}
          {isLoading && (
            <Loader2 className="w-4 h-4 text-htb-foreground animate-spin" />
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {error && (
            <button
              onClick={reloadTerminal}
              className="p-1 hover:bg-htb-background rounded transition-colors duration-200"
              title="Reload terminal"
            >
              <Loader2 className="w-4 h-4 text-htb-foreground" />
            </button>
          )}
          <button
            onClick={toggleMaximize}
            className="p-1 hover:bg-htb-background rounded transition-colors duration-200"
            title={isMaximized ? "Minimize" : "Maximize"}
          >
            {isMaximized ? (
              <Minimize2 className="w-4 h-4 text-htb-foreground" />
            ) : (
              <Maximize2 className="w-4 h-4 text-htb-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="relative" style={{ height: isMaximized ? 'calc(100vh - 120px)' : height }}>
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-20">
            <div className="text-center">
              <TerminalIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-400 mb-2">Terminal Connection Error</p>
              <p className="text-gray-400 text-sm mb-4">{error}</p>
              <button
                onClick={reloadTerminal}
                className="px-4 py-2 bg-htb-green text-black rounded hover:bg-htb-green transition-colors duration-200"
              >
                Retry Connection
              </button>
            </div>
          </div>
        ) : isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-htb-background">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-htb-green animate-spin mx-auto mb-4" />
              <p className="text-htb-foreground">Connecting to terminal...</p>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={terminalUrl}
            className="w-full h-full border-0 bg-black"
            title={`Terminal - ${containerId}`}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default TtydTerminal;
