import { ChildProcess } from 'child_process';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { TerminalService } from './terminal.service';

// Mock DockerUtils and its instance methods used by TerminalService
jest.mock('../docker/dockerUtils', () => ({
  DockerUtils: {
    getInstance: jest.fn(() => ({
      getContainer: jest.fn(() => ({
        inspect: jest.fn().mockResolvedValue({ State: { Running: true } })
      }))
    }))
  }
}));

// Mock fs.existsSync so getTtydPath passes
jest.spyOn(fs, 'existsSync').mockImplementation((p: any) => {
  // Pretend local node_modules/.bin/ttyd exists
  if (typeof p === 'string' && p.includes('node_modules') && p.includes('.bin') && p.includes('ttyd')) {
    return true;
  }
  return false;
});

// Utility to create a fake ChildProcess-like object
function createFakeProcess(): ChildProcess {
  const listeners: Record<string, Function[]> = {};
  const anyObj: any = {
    pid: 1234,
    killed: false,
    stdout: { on: (event: string, cb: Function) => { (listeners[`stdout:${event}`] ||= []).push(cb); } },
    stderr: { on: (event: string, cb: Function) => { (listeners[`stderr:${event}`] ||= []).push(cb); } },
    on: (event: string, cb: Function) => { (listeners[event] ||= []).push(cb); },
    kill: jest.fn((signal?: NodeJS.Signals) => { anyObj.killed = true; (listeners['close']||[]).forEach(fn => fn(signal === 'SIGKILL' ? 137 : 0)); }),
    __emit: (event: string, ...args: any[]) => { (listeners[event]||[]).forEach(fn => fn(...args)); },
    __emitStdout: (data: string | Buffer) => { (listeners['stdout:data']||[]).forEach(fn => fn(data)); },
    __emitStderr: (data: string | Buffer) => { (listeners['stderr:data']||[]).forEach(fn => fn(data)); },
  };
  return anyObj as ChildProcess;
}

// Mock spawn to return a controllable fake process
const spawnMock = jest.spyOn(childProcess, 'spawn');

describe('TerminalService', () => {
  let service: TerminalService;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
    service = new TerminalService();
    spawnMock.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should create a terminal session with a unique id and available port', async () => {
    const fakeProc = createFakeProcess();
    spawnMock.mockReturnValue(fakeProc as unknown as childProcess.ChildProcess);

    const session = await service.createTerminalSession('container-1', 'user-1');

    expect(session.id).toMatch(/^term_\d+_[a-z0-9]{9}$/);
    expect(session.port).toBeGreaterThanOrEqual(7800);
    expect(session.port).toBeLessThanOrEqual(7900);
    expect(session.url).toBe(`http://localhost:${session.port}`);
    expect(session.containerId).toBe('container-1');
    expect(session.userId).toBe('user-1');
  });

  test('should reject if container is not running', async () => {
    // Override DockerUtils mock for this test to simulate not running
    const { DockerUtils } = jest.requireMock('../docker/dockerUtils');
    DockerUtils.getInstance.mockReturnValue({
      getContainer: () => ({ inspect: jest.fn().mockResolvedValue({ State: { Running: false } }) })
    });

    await expect(service.createTerminalSession('bad-container', 'user-1')).rejects.toThrow('is not running');
  });

  test('should reuse port tracking and free port on terminate', async () => {
    const fakeProc1 = createFakeProcess();
    spawnMock.mockReturnValueOnce(fakeProc1 as unknown as childProcess.ChildProcess);

    const session = await service.createTerminalSession('container-1', 'user-1');
    const usedPort = session.port;

    // Terminate and ensure port is freed
    await service.terminateTerminalSession(session.id);

    // Next session should be able to use the freed port again (since getAvailablePort returns first free)
    const fakeProc2 = createFakeProcess();
    spawnMock.mockReturnValueOnce(fakeProc2 as unknown as childProcess.ChildProcess);
    const session2 = await service.createTerminalSession('container-1', 'user-1');

    expect(session2.port).toBe(usedPort);
  });

  test('should update session activity timestamp', async () => {
    const fakeProc = createFakeProcess();
    spawnMock.mockReturnValue(fakeProc as unknown as childProcess.ChildProcess);

    const session = await service.createTerminalSession('container-1', 'user-1');

    const before = service.getTerminalSession(session.id)?.lastActivity.getTime() ?? 0;

    // Advance time and update activity
    jest.setSystemTime(new Date('2024-01-01T00:05:00Z'));
    service.updateSessionActivity(session.id);

    const after = service.getTerminalSession(session.id)?.lastActivity.getTime() ?? 0;
    expect(after).toBeGreaterThan(before);
  });

  test('should cleanup inactive sessions older than threshold', async () => {
    const fakeProc = createFakeProcess();
    spawnMock.mockReturnValue(fakeProc as unknown as childProcess.ChildProcess);

    const session = await service.createTerminalSession('container-1', 'user-1');

    // Make session appear old
    const s = service.getTerminalSession(session.id);
    expect(s).toBeDefined();
    if (s) {
      s.lastActivity = new Date('2023-12-31T23:00:00Z');
    }

    // Trigger internal cleanup timer callback by running timers
    jest.advanceTimersByTime(5 * 60 * 1000); // The service sets interval to 5 minutes

    // Allow any pending promises
    await Promise.resolve();

    expect(service.getTerminalSession(session.id)).toBeUndefined();
  });

  test('getStats should reflect total, active, and used ports correctly', async () => {
    const fakeProc = createFakeProcess();
    spawnMock.mockReturnValue(fakeProc as unknown as childProcess.ChildProcess);

    const session = await service.createTerminalSession('container-1', 'user-1');

    // Initially active
    let stats = service.getStats();
    expect(stats.totalSessions).toBe(1);
    expect(stats.usedPorts).toBe(1);
    expect(stats.activeSessions).toBe(1);

    // Make inactive beyond 5 minutes
    const s = service.getTerminalSession(session.id);
    if (s) {
      s.lastActivity = new Date('2023-12-31T23:00:00Z');
    }

    stats = service.getStats();
    expect(stats.activeSessions).toBe(0);
  });

  test('should fail to start when ttyd binary is missing', async () => {
    // Temporarily force existsSync to return false for local ttyd
    const existsSpy = jest.spyOn(fs, 'existsSync');
    existsSpy.mockImplementation((p: any) => false);

    await expect(service.createTerminalSession('container-1', 'user-1')).rejects.toThrow(/ttyd not found/);

    existsSpy.mockRestore();
  });
});
