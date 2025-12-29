import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { Maximize2, Minimize2, Copy, Terminal as TerminalIcon } from 'lucide-react';

interface DockerTerminalProps {
  containerId?: string;
  onCommand?: (command: string) => void;
  className?: string;
  height?: string;
}

const DockerTerminal: React.FC<DockerTerminalProps> = ({
  containerId,
  onCommand,
  className = '',
  height = '400px'
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState('~');

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize terminal
    const terminal = new Terminal({
      theme: {
        background: '#1a2332',
        foreground: '#a4b1cd',
        cursor: '#9fef00',
        black: '#000000',
        red: '#ff3e3e',
        green: '#9fef00',
        yellow: '#ffaf00',
        blue: '#004cff',
        magenta: '#9f00ff',
        cyan: '#2ee7b6',
        white: '#ffffff',
        brightBlack: '#666666',
        brightRed: '#ff8484',
        brightGreen: '#c5f467',
        brightYellow: '#ffcc5c',
        brightBlue: '#5cb2ff',
        brightMagenta: '#c16cfa',
        brightCyan: '#5cecc6',
        brightWhite: '#ffffff'
      },
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      fontSize: 14,
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 1000,
      tabStopWidth: 4
    });

    // Add addons
    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();
    
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(webLinksAddon);

    // Store references
    terminalInstanceRef.current = terminal;
    fitAddonRef.current = fitAddon;

    // Mount terminal
    terminal.open(terminalRef.current);
    fitAddon.fit();

    // Welcome message
    terminal.writeln('\x1b[32mWelcome to the Cybersecurity Training Terminal\x1b[0m');
    terminal.writeln('\x1b[36mContainer: ' + (containerId || 'training-env-01') + '\x1b[0m');
    terminal.writeln('\x1b[33mType "help" for available commands\x1b[0m');
    terminal.writeln('');
    terminal.write('\x1b[32muser@htb:' + currentDirectory + '$ \x1b[0m');

    // Handle data input
    let currentInput = '';
    terminal.onData((data) => {
      if (data === '\r') {
        // Enter key pressed
        terminal.writeln('');
        
        // Handle command
        if (currentInput.trim()) {
          handleCommand(currentInput.trim());
        }
        
        // Reset prompt
        currentInput = '';
        terminal.write('\x1b[32muser@htb:' + currentDirectory + '$ \x1b[0m');
      } else if (data === '\u007f') {
        // Backspace
        if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          terminal.write('\b \b');
        }
      } else if (data === '\u0003') {
        // Ctrl+C
        terminal.writeln('^C');
        currentInput = '';
        terminal.write('\x1b[32muser@htb:' + currentDirectory + '$ \x1b[0m');
      } else {
        // Regular character
        currentInput += data;
        terminal.write(data);
      }
    });

    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      terminal.writeln('\x1b[32m✓ Connected to training environment\x1b[0m');
    }, 1000);

    // Handle resize
    const handleResize = () => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.dispose();
    };
  }, [containerId, currentDirectory]);

  const handleCommand = (command: string) => {
    const terminal = terminalInstanceRef.current;
    if (!terminal) return;

    // Notify parent component
    onCommand?.(command);

    // Simulate command responses
    const parts = command.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        terminal.writeln('\x1b[36mAvailable commands:\x1b[0m');
        terminal.writeln('  \x1b[32mls\x1b[0m           - List directory contents');
        terminal.writeln('  \x1b[32mcd <dir>\x1b[0m     - Change directory');
        terminal.writeln('  \x1b[32mpwd\x1b[0m          - Print working directory');
        terminal.writeln('  \x1b[32mcat <file>\x1b[0m   - Display file contents');
        terminal.writeln('  \x1b[32mwhoami\x1b[0m       - Display current user');
        terminal.writeln('  \x1b[32mifconfig\x1b[0m     - Show network interfaces');
        terminal.writeln('  \x1b[32mnetstat\x1b[0m      - Show network connections');
        terminal.writeln('  \x1b[32mps aux\x1b[0m       - Show running processes');
        terminal.writeln('  \x1b[32mclear\x1b[0m        - Clear terminal screen');
        break;

      case 'ls':
        terminal.writeln('\x1b[32mflag.txt\x1b[0m    \x1b[36mindex.html\x1b[0m    \x1b[34mconfig.php\x1b[0m');
        terminal.writeln('\x1b[35mdatabase.sql\x1b[0m  \x1b[33mreadme.md\x1b[0m     \x1b[37mlogs/\x1b[0m');
        break;

      case 'pwd':
        terminal.writeln('\x1b[32m/home/user/challenges/web-1\x1b[0m');
        break;

      case 'cd':
        if (args[0] === '..') {
          setCurrentDirectory(prev => {
            if (prev.includes('/') && prev !== '/') {
              const parts = prev.split('/');
              parts.pop();
              const newDir = parts.join('/') || '~';
              return newDir;
            }
            return '~';
          });
          terminal.writeln('\x1b[32mChanged to parent directory\x1b[0m');
        } else if (args[0]) {
          setCurrentDirectory(prev => prev === '~' ? args[0] : `${prev}/${args[0]}`);
          terminal.writeln(`\x1b[32mChanged to ${args[0]}\x1b[0m`);
        }
        break;

      case 'cat':
        if (args[0] === 'flag.txt') {
          terminal.writeln('\x1b[31mHTB{fake_flag_for_demo_purposes}\x1b[0m');
        } else if (args[0]) {
          terminal.writeln(`\x1b[33mcat: ${args[0]}: No such file or directory\x1b[0m`);
        } else {
          terminal.writeln('\x1b[33mcat: missing file operand\x1b[0m');
        }
        break;

      case 'whoami':
        terminal.writeln('\x1b[32muser\x1b[0m');
        break;

      case 'ifconfig':
        terminal.writeln('\x1b[36meth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\x1b[0m');
        terminal.writeln('        \x1b[32minet 10.10.10.5\x1b[0m  netmask 255.255.255.0  broadcast 10.10.10.255');
        terminal.writeln('        \x1b[32minet6 fe80::a00:27ff:fe4e:66a1\x1b[0m  prefixlen 64  scopeid 0x20<link>');
        break;

      case 'clear':
        terminal.clear();
        break;

      default:
        terminal.writeln(`\x1b[31m${cmd}: command not found\x1b[0m`);
        break;
    }
  };

  const copyTerminalContent = () => {
    const terminal = terminalInstanceRef.current;
    if (!terminal) return;

    // Get terminal content as text
    const buffer = terminal.buffer.active;
    let content = '';
    for (let i = 0; i < buffer.length; i++) {
      const line = buffer.getLine(i);
      if (line) {
        content += line.translateToString(true) + '\n';
      }
    }
    
    navigator.clipboard.writeText(content).then(() => {
      // Could show a toast notification here
    });
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
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
            Terminal - {containerId || 'training-env-01'}
          </span>
          {isConnected && (
            <span className="w-2 h-2 bg-htb-green rounded-full animate-pulse" />
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={copyTerminalContent}
            className="p-1 hover:bg-htb-background rounded transition-colors duration-200"
            title="Copy content"
          >
            <Copy className="w-4 h-4 text-htb-foreground" />
          </button>
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
        <div ref={terminalRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default DockerTerminal;
