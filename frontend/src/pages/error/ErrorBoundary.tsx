import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // console.error('Error caught by ErrorBoundary:', error);
    // console.error('Error info:', errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      // Custom error fallback UI
      return (
        <div className="min-h-screen bg-htb-background flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 mb-4">
                <svg className="h-12 w-12 text-htb-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-htb-bright-white mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-htb-foreground mb-6">
                We encountered an unexpected error. Please try again or reload the page.
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {this.state.error && this.state.errorInfo && (
              <div className="mb-6 text-left">
                <details className="bg-htb-selection-background/10 rounded-lg p-4 border border-htb-selection-background">
                  <summary className="text-htb-bright-white font-medium cursor-pointer">
                    Error Details
                  </summary>
                  <div className="mt-4 space-y-2">
                    <p className="text-htb-red text-sm font-mono">
                      {this.state.error.toString()}
                    </p>
                    <pre className="text-xs text-htb-foreground overflow-auto max-h-32 p-2 bg-black/20 rounded">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </details>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReload}
                className="bg-htb-blue hover:bg-htb-bright-blue text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                Reload Page
              </button>
              <Link
                to="/"
                className="bg-htb-selection-background/10 hover:bg-htb-selection-background/20 text-htb-bright-white font-bold py-3 px-6 rounded-lg transition-all duration-300 border border-htb-selection-background"
              >
                Go Home
              </Link>
            </div>

            {/* Help Text */}
            <p className="mt-8 text-sm text-htb-foreground">
              If this problem persists, please contact our{' '}
              <a href="/resources/support" className="text-htb-blue hover:text-htb-bright-blue transition-colors">
                support team
              </a>
              .
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
