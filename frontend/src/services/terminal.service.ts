import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

export interface TerminalSession {
  sessionId: string;
  containerId: string;
  url: string;
  port: number;
  createdAt: string;
  lastActivity?: string;
}

export interface CreateTerminalRequest {
  containerId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class TerminalService {
  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Create a new terminal session for a container
   */
  async createTerminalSession(containerId: string): Promise<ApiResponse<TerminalSession>> {
    try {
      const response = await axios.post<ApiResponse<TerminalSession>>(
        `${API_BASE_URL}/terminal/sessions`,
        { containerId },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error creating terminal session:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create terminal session'
      };
    }
  }

  /**
   * Get terminal session details
   */
  async getTerminalSession(sessionId: string): Promise<ApiResponse<TerminalSession>> {
    try {
      const response = await axios.get<ApiResponse<TerminalSession>>(
        `${API_BASE_URL}/terminal/sessions/${sessionId}`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error getting terminal session:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get terminal session'
      };
    }
  }

  /**
   * Terminate a terminal session
   */
  async terminateTerminalSession(sessionId: string): Promise<ApiResponse<void>> {
    try {
      const response = await axios.delete<ApiResponse<void>>(
        `${API_BASE_URL}/terminal/sessions/${sessionId}`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error terminating terminal session:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to terminate terminal session'
      };
    }
  }

  /**
   * Get all terminal sessions for the current user
   */
  async getUserTerminalSessions(): Promise<ApiResponse<TerminalSession[]>> {
    try {
      const response = await axios.get<ApiResponse<TerminalSession[]>>(
        `${API_BASE_URL}/terminal/sessions`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error getting user terminal sessions:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get terminal sessions'
      };
    }
  }

  /**
   * Terminate all terminal sessions for the current user
   */
  async terminateAllUserSessions(): Promise<ApiResponse<void>> {
    try {
      const response = await axios.delete<ApiResponse<void>>(
        `${API_BASE_URL}/terminal/sessions`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error terminating all user sessions:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to terminate terminal sessions'
      };
    }
  }
}

export const terminalService = new TerminalService();
