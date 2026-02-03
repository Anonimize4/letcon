import { spawn, ChildProcess } from 'child_process';
import Docker from 'dockerode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface TerminalSession {
  id: string;
  containerId: string;
  userId: string;
  ttydProcess?: ChildProcess;
  port: number;
  url: string;
  createdAt: Date;
  lastActivity: Date;
}

export class TerminalService {
  private sessions: Map<string, TerminalSession> = new Map();
  private portRange = { start: 7800, end: 7900 };
  private usedPorts: Set<number> = new Set();

  constructor() {
    // Clean up inactive sessions every 5 minutes
    setInterval(() => this.cleanupInactiveSessions(), 5 * 60 * 1000);
  }

  /**
   * Create a new terminal session for a Docker container
   */
  async createTerminalSession(containerId: string, userId: string): Promise<TerminalSession> {
    const sessionId = this.generateSessionId();
    const port = this.getAvailablePort();
    
    // Verify container exists and is running
    const docker = new Docker();
    const container = docker.getContainer(containerId);
    const containerInfo = await container.inspect();
    
    if (!containerInfo.State.Running) {
      throw new Error(`Container ${containerId} is not running`);
    }

    // Start ttyd process for the container
    const ttydProcess = await this.startTtydProcess(containerId, port);
    
    const session: TerminalSession = {
      id: sessionId,
      containerId,
      userId,
      ttydProcess,
      port,
      url: `http://localhost:${port}`,
      createdAt: new Date(),
      lastActivity: new Date()
    };

    this.sessions.set(sessionId, session);
    this.usedPorts.add(port);

    return session;
  }

  /**
   * Get an existing terminal session
   */
  getTerminalSession(sessionId: string): TerminalSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Update session activity timestamp
   */
  updateSessionActivity(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.lastActivity = new Date();
    }
  }

  /**
   * Terminate a terminal session
   */
  async terminateTerminalSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return;
    }

    // Kill ttyd process
    if (session.ttydProcess) {
      session.ttydProcess.kill('SIGTERM');
      
      // Force kill after 5 seconds if still running
      setTimeout(() => {
        if (session.ttydProcess && !session.ttydProcess.killed) {
          session.ttydProcess.kill('SIGKILL');
        }
      }, 5000);
    }

    // Free up the port
    this.usedPorts.delete(session.port);
    
    // Remove session
    this.sessions.delete(sessionId);
  }

  /**
   * Get all sessions for a user
   */
  getUserSessions(userId: string): TerminalSession[] {
    return Array.from(this.sessions.values()).filter(session => session.userId === userId);
  }

  /**
   * Terminate all sessions for a user
   */
  async terminateUserSessions(userId: string): Promise<void> {
    const userSessions = this.getUserSessions(userId);
    await Promise.all(userSessions.map(session => this.terminateTerminalSession(session.id)));
  }

  /**
   * Start ttyd process for a container
   */
  private async startTtydProcess(containerId: string, port: number): Promise<ChildProcess> {
    return new Promise((resolve, reject) => {
      const ttydPath = this.getTtydPath();
      
      if (!fs.existsSync(ttydPath)) {
        reject(new Error(`ttyd not found at ${ttydPath}. Please ensure ttyd is installed.`));
        return;
      }

      // Start ttyd with container
      const args = [
        '--port', port.toString(),
        '--interface', '127.0.0.1', // Only bind to localhost for security
        '--writable', // Allow keyboard input
        '--max-clients', '1', // One client per session
        '--check-origin', // Check origin for security
        '--title', `Terminal - ${containerId}`,
        'docker', 'exec', '-it', containerId, '/bin/bash'
      ];

      const ttydProcess = spawn(ttydPath, args, {
        stdio: ['ignore', 'pipe', 'pipe'],
        env: {
          ...process.env,
          TERM: 'xterm-256color'
        }
      });

      let output = '';
      ttydProcess.stdout?.on('data', (data) => {
        output += data.toString();
        console.log(`ttyd stdout [${containerId}]:`, data.toString());
      });

      ttydProcess.stderr?.on('data', (data) => {
        output += data.toString();
        console.error(`ttyd stderr [${containerId}]:`, data.toString());
      });

      ttydProcess.on('error', (error) => {
        console.error(`ttyd process error [${containerId}]:`, error);
        reject(error);
      });

      ttydProcess.on('close', (code) => {
        console.log(`ttyd process exited [${containerId}] with code:`, code);
        if (code !== 0) {
          reject(new Error(`ttyd process exited with code ${code}: ${output}`));
        }
      });

      // Wait a moment to see if the process starts successfully
      setTimeout(() => {
        if (ttydProcess.pid && !ttydProcess.killed) {
          resolve(ttydProcess);
        } else {
          reject(new Error('ttyd process failed to start'));
        }
      }, 2000);
    });
  }

  /**
   * Get the path to ttyd executable
   */
  private getTtydPath(): string {
    // Try to find ttyd in node_modules
    const localTtyd = path.join(process.cwd(), 'node_modules', '.bin', 'ttyd');
    if (fs.existsSync(localTtyd)) {
      return localTtyd;
    }

    // Try global ttyd
    return 'ttyd';
  }

  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    return `term_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get an available port from the range
   */
  private getAvailablePort(): number {
    for (let port = this.portRange.start; port <= this.portRange.end; port++) {
      if (!this.usedPorts.has(port)) {
        return port;
      }
    }
    throw new Error('No available ports for terminal sessions');
  }

  /**
   * Clean up inactive sessions (older than 30 minutes)
   */
  private cleanupInactiveSessions(): void {
    const now = new Date();
    const inactiveThreshold = 30 * 60 * 1000; // 30 minutes

    for (const [sessionId, session] of this.sessions.entries()) {
      if (now.getTime() - session.lastActivity.getTime() > inactiveThreshold) {
        console.log(`Cleaning up inactive terminal session: ${sessionId}`);
        this.terminateTerminalSession(sessionId).catch(error => {
          console.error(`Error cleaning up session ${sessionId}:`, error);
        });
      }
    }
  }

  /**
   * Get session statistics
   */
  getStats(): {
    totalSessions: number;
    activeSessions: number;
    usedPorts: number;
  } {
    const now = new Date();
    const activeThreshold = 5 * 60 * 1000; // 5 minutes
    
    const activeSessions = Array.from(this.sessions.values()).filter(
      session => now.getTime() - session.lastActivity.getTime() < activeThreshold
    ).length;

    return {
      totalSessions: this.sessions.size,
      activeSessions,
      usedPorts: this.usedPorts.size
    };
  }
}

export const terminalService = new TerminalService();
