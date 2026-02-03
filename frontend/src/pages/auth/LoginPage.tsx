import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Check for success message from navigation state
  React.useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Call the login function from AuthContext
      const response = await login(formData.email, formData.password);
      
      // Set success message
      setSuccessMessage('Login successful! Redirecting...');
      
      // Redirect based on user role
      setTimeout(() => {
        const userRole = response.user.role.toUpperCase();
        
        switch (userRole) {
          case 'ADMIN':
            navigate('/admin');
            break;
          case 'CREATOR':
            navigate('/dashboard/creator');
            break;
          case 'INSTRUCTOR':
          case 'MODERATOR':
          case 'USER':
          default:
            navigate('/dashboard');
            break;
        }
      }, 1000);
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Invalid email or password. Please try again.';
      setErrorMessage(errorMsg);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-htb-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-htb-blue/20 to-htb-blue/10 border border-htb-blue/30 mb-4">
            <svg className="h-8 w-8 text-htb-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4 4m0 0l-4 4m4 0l-4 4m4 0l-4 4M3 21a8 8 0 0116 0v1.5a1.5 1.5 0 013 0h12a1.5 1.5 0 013 0v-1.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-htb-bright-white mb-2">
            Welcome Back
          </h1>
          <p className="text-htb-foreground mb-6">
            Sign in to your LETHCON account
          </p>
          <p className="text-sm text-htb-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-htb-blue hover:text-htb-bright-blue transition-colors">
              Create one here
            </Link>
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 rounded-lg bg-green-500/10 border border-green-500/30 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-htb-green" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-htb-green">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-htb-red" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-htb-red">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-htb-selection-background/10 rounded-xl p-6 border border-htb-selection-background">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-htb-bright-white mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border bg-htb-background text-htb-bright-white placeholder-htb-foreground focus:outline-none focus:ring-2 focus:ring-htb-blue focus:border-transparent transition-all border-htb-selection-background"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-htb-bright-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 pr-10 rounded-lg border bg-htb-background text-htb-bright-white placeholder-htb-foreground focus:outline-none focus:ring-2 focus:ring-htb-blue focus:border-transparent transition-all border-htb-selection-background"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-htb-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-htb-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-htb-blue focus:ring-htb-blue border-htb-selection-background rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-htb-foreground">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-htb-blue hover:text-htb-bright-blue transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-htb-blue hover:bg-htb-bright-blue text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-htb-foreground">
              Protected by enterprise-grade security
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
